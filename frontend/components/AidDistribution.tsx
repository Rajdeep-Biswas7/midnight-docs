import React from 'react';
import { CircuitCall } from './CircuitCall';
import { AidVerificationFeed } from './AidVerificationFeed';
import type { CircuitCallState, NetworkType } from '../hooks/useMidnight';

export interface AidDistributionProps {
  onCallCircuit: (targetContractAddress?: string) => void;
  circuitState: CircuitCallState;
  contractAddress?: string;
  isConnected: boolean;
  activeNetwork: NetworkType;
}

export const AidDistribution: React.FC<AidDistributionProps> = ({
  onCallCircuit,
  circuitState,
  contractAddress,
  isConnected,
  activeNetwork,
}) => {
  return (
    <div className="space-y-6">
      {/* Circuit Call Component: Core Privacy Increment & Claim */}
      <CircuitCall
        circuitState={circuitState}
        isConnected={isConnected}
        onCallCircuit={onCallCircuit}
        activeNetwork={activeNetwork}
      />

      {/* Humanitarian Aid Verification Feed */}
      <AidVerificationFeed
        contractAddress={contractAddress}
        networkId={activeNetwork}
      />
    </div>
  );
};
export default AidDistribution;
