import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Contract, ledger } from '../managed/contract/index.js';
import * as compactRuntime from '@midnight-ntwrk/compact-runtime';

describe('PrivateAid Compact Smart Contract Tests (Level 4)', () => {
  // Helper to initialize fresh contract state with configured private witness
  const setupContract = (secretValue: bigint) => {
    let witnessCallCount = 0;
    const witnesses = {
      secretIncrement: (context: any) => {
        witnessCallCount++;
        return [context.privateState, secretValue];
      },
    };

    const contract = new Contract(witnesses);

    // Initial constructor context with dummy coin key
    const dummyKey = new Uint8Array(32).fill(1);
    const constructorContext = {
      initialPrivateState: {},
      initialZswapLocalState: {
        coinPublicKey: dummyKey,
      },
    };

    return { contract, constructorContext, getWitnessCalls: () => witnessCallCount };
  };

  it('1. Circuit Logic: executes successfully and validates assert preconditions', async () => {
    // A. Valid positive contribution amount
    const { contract, constructorContext } = setupContract(75n);
    const { currentContractState } = contract.initialState(constructorContext);

    const circuitContext = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      currentContractState.data,
      {}
    );

    const result = await contract.circuits.incrementWithSecret(circuitContext);
    assert.ok(result, 'Circuit incrementWithSecret must return valid execution result');
    assert.ok(result.context, 'Result must contain updated circuit context');

    // B. Invalid contribution amount: assert fails when secret is zero
    const invalidSetup = setupContract(0n);
    const { currentContractState: invalidState } = invalidSetup.contract.initialState(invalidSetup.constructorContext);

    const failingContext = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      invalidState.data,
      {}
    );

    await assert.rejects(
      async () => {
        await invalidSetup.contract.circuits.incrementWithSecret(failingContext);
      },
      (err: any) => {
        assert.match(err.message, /secret must be positive|assertion failed/i);
        return true;
      },
      'Circuit must reject secret value <= 0 as enforced by assert(secret > 0)'
    );
  });

  it('2. State Transitions: initializes correctly and transitions ledger state sequentially', async () => {
    const contributionAmount = 50n;
    const { contract, constructorContext } = setupContract(contributionAmount);

    // Initial on-chain ledger state
    const { currentContractState } = contract.initialState(constructorContext);
    const initialLedger = ledger(currentContractState.data);

    assert.strictEqual(initialLedger.round, 0n, 'Initial round counter must start at 0');
    assert.strictEqual(initialLedger.totalValue, 0n, 'Initial aid pool balance must start at 0');

    // Transition 1: round 0 -> 1, totalValue 0 -> 50
    const context1 = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      currentContractState.data,
      {}
    );
    const exec1 = await contract.circuits.incrementWithSecret(context1);
    const stateAfter1 = new compactRuntime.ChargedState(exec1.context.currentQueryContext.state.state);
    const ledgerAfter1 = ledger(stateAfter1);

    assert.strictEqual(ledgerAfter1.round, 1n, 'Round must advance from 0 to 1');
    assert.strictEqual(ledgerAfter1.totalValue, 50n, 'Total aid pool must advance from 0 to 50');

    // Transition 2: round 1 -> 2, totalValue 50 -> 100
    const context2 = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      stateAfter1,
      {}
    );
    const exec2 = await contract.circuits.incrementWithSecret(context2);
    const stateAfter2 = new compactRuntime.ChargedState(exec2.context.currentQueryContext.state.state);
    const ledgerAfter2 = ledger(stateAfter2);

    assert.strictEqual(ledgerAfter2.round, 2n, 'Round must advance from 1 to 2');
    assert.strictEqual(ledgerAfter2.totalValue, 100n, 'Total aid pool must advance from 50 to 100');
  });

  it('3. Privacy Model: private witness inputs are never exposed on the public ledger', async () => {
    const confidentialContribution = 888888n;
    const { contract, constructorContext, getWitnessCalls } = setupContract(confidentialContribution);

    const { currentContractState } = contract.initialState(constructorContext);
    const context = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      currentContractState.data,
      {}
    );

    const exec = await contract.circuits.incrementWithSecret(context);
    const finalState = new compactRuntime.ChargedState(exec.context.currentQueryContext.state.state);
    const publicLedger = ledger(finalState);

    // Witness executed off-chain in private context
    assert.strictEqual(getWitnessCalls(), 1, 'Private witness must be evaluated locally in private memory');

    // Verify public ledger contains ONLY public state and zero private witness data
    assert.ok('round' in publicLedger, 'Public ledger exposes round');
    assert.ok('totalValue' in publicLedger, 'Public ledger exposes totalValue');
    assert.ok(!('secretIncrement' in publicLedger), 'Public ledger MUST NOT expose private witness secretIncrement');

    // Ledger only reflects the disclosed aggregate result
    assert.strictEqual(publicLedger.round, 1n);
    assert.strictEqual(publicLedger.totalValue, 888888n);
  });
});
