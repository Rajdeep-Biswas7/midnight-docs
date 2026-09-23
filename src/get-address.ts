import { resolveNetwork, getOrCreateWallet } from './network.js';
import { createKeystore, HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk';
import { Buffer } from 'buffer';

const { network, config } = resolveNetwork('preview');
const wallet = getOrCreateWallet(network);
const hd = HDWallet.fromSeed(Buffer.from(wallet.seed, 'hex'));
if (hd.type === 'seedOk') {
  const result = hd.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.NightExternal])
    .deriveKeysAt(0);
  if (result.type === 'keysDerived') {
    const keystore = createKeystore(result.keys[Roles.NightExternal], config.networkId);
    console.log('WALLET_ADDRESS:', keystore.getBech32Address().toString());
  }
}
