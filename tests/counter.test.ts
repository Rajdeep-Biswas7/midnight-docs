import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Contract, ledger } from '../blockchain/managed/contract/index.js';
import * as compactRuntime from '@midnight-ntwrk/compact-runtime';

describe('Midnight Counter Compact Contract Tests', () => {
  // Helper to initialize fresh contract state
  const setupContract = (secretValue: bigint) => {
    let witnessCallCount = 0;
    const witnesses = {
      secretIncrement: (context: any) => {
        witnessCallCount++;
        return [context.privateState, secretValue];
      },
    };

    const contract = new Contract(witnesses);

    // Initial constructor context
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
    // A. Valid secret increment (positive number)
    const { contract, constructorContext } = setupContract(42n);
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

    // B. Invalid secret increment: assert fails when secret is 0
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
      'Circuit must reject secret value <= 0 as enforced by assert()'
    );
  });

  it('2. State Transitions: initializes correctly and transitions ledger state sequentially', async () => {
    const incrementStep = 15n;
    const { contract, constructorContext } = setupContract(incrementStep);

    // Initial state check
    const { currentContractState } = contract.initialState(constructorContext);
    const initialLedger = ledger(currentContractState.data);

    assert.strictEqual(initialLedger.round, 0n, 'Initial round must be 0');
    assert.strictEqual(initialLedger.totalValue, 0n, 'Initial totalValue must be 0');

    // First transition: round 0 -> 1, totalValue 0 -> 15
    const context1 = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      currentContractState.data,
      {}
    );
    const exec1 = await contract.circuits.incrementWithSecret(context1);
    const stateAfter1 = new compactRuntime.ChargedState(exec1.context.currentQueryContext.state.state);
    const ledgerAfter1 = ledger(stateAfter1);

    assert.strictEqual(ledgerAfter1.round, 1n, 'Round should advance from 0 to 1');
    assert.strictEqual(ledgerAfter1.totalValue, 15n, 'TotalValue should advance from 0 to 15');

    // Second transition: round 1 -> 2, totalValue 15 -> 30
    const context2 = compactRuntime.createCircuitContext(
      compactRuntime.dummyContractAddress(),
      new Uint8Array(32).fill(1),
      stateAfter1,
      {}
    );
    const exec2 = await contract.circuits.incrementWithSecret(context2);
    const stateAfter2 = new compactRuntime.ChargedState(exec2.context.currentQueryContext.state.state);
    const ledgerAfter2 = ledger(stateAfter2);

    assert.strictEqual(ledgerAfter2.round, 2n, 'Round should advance from 1 to 2');
    assert.strictEqual(ledgerAfter2.totalValue, 30n, 'TotalValue should advance from 15 to 30');
  });

  it('3. Privacy Model: private witness inputs are never exposed on the public ledger', async () => {
    const secretIncrement = 999999n;
    const { contract, constructorContext, getWitnessCalls } = setupContract(secretIncrement);

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

    // Confirm witness was called privately by the client circuit runner
    assert.strictEqual(getWitnessCalls(), 1, 'Witness function should have been executed once locally');

    // Confirm on-chain public ledger contains ONLY round and totalValue
    assert.ok('round' in publicLedger, 'Public ledger exposes round');
    assert.ok('totalValue' in publicLedger, 'Public ledger exposes totalValue');
    assert.ok(!('secretIncrement' in publicLedger), 'Public ledger MUST NOT expose secretIncrement');

    // Verify ledger values do not leak the witness input as an independent field
    assert.strictEqual(publicLedger.round, 1n);
    assert.strictEqual(publicLedger.totalValue, 999999n);
  });
});
