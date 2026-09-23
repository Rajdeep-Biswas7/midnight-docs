/**
 * PrivateAid Contract Utilities & Network Helpers
 * Midnight Builder Challenge Level 4
 */

export const CONTRACT_ADDRESSES = {
  preprod: '02c01991a0f8bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e89a3f21',
  preview: 'e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e',
  undeployed: '',
} as const;

export type SupportedNetwork = keyof typeof CONTRACT_ADDRESSES;

export interface DeployedContractConfig {
  network: SupportedNetwork;
  address: string;
  explorerUrl: string;
  indexerUrl: string;
}

export const getExplorerUrl = (address: string, network: SupportedNetwork = 'preprod'): string => {
  if (!address) return '';
  return `https://explorer.1am.xyz/contract/${address}?network=${network}`;
};

export const getAccountExplorerUrl = (address: string, network: SupportedNetwork = 'preprod'): string => {
  if (!address) return '';
  return `https://explorer.1am.xyz/address/${address}?network=${network}`;
};

export const formatAddress = (address: string | null | undefined, head = 8, tail = 6): string => {
  if (!address) return '';
  if (address.length <= head + tail) return address;
  return `${address.slice(0, head)}...${address.slice(-tail)}`;
};

export const formatTokenAmount = (microNight: bigint | number | string, decimals = 6): string => {
  try {
    const val = typeof microNight === 'bigint' ? microNight : BigInt(microNight);
    const divisor = BigInt(10 ** decimals);
    const integerPart = val / divisor;
    const fractionalPart = val % divisor;
    if (fractionalPart === 0n) return integerPart.toString();
    const fracStr = fractionalPart.toString().padStart(decimals, '0').replace(/0+$/, '');
    return `${integerPart}.${fracStr}`;
  } catch {
    return '0';
  }
};

export const validateContractAddress = (address: string): boolean => {
  if (!address) return false;
  return /^[0-9a-fA-F]{64}$/.test(address.trim());
};

export const isValidBech32Address = (address: string, network: SupportedNetwork = 'preprod'): boolean => {
  if (!address) return false;
  const prefix = network === 'preview' ? 'mn_addr_preview1' : 'mn_addr_preprod1';
  return address.startsWith(prefix);
};

export const getNetworkDisplayName = (network: SupportedNetwork): string => {
  switch (network) {
    case 'preprod':
      return 'Midnight Preprod Testnet';
    case 'preview':
      return 'Midnight Preview Testnet';
    default:
      return 'Local Undeployed Environment';
  }
};

