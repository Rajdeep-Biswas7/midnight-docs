import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Custom Zero-Knowledge Shield with pulsing circuit core (Terminal CLI style)
 */
export const ZkShieldBrandIcon: React.FC<IconProps> = ({ className = 'w-8 h-8', size }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <defs>
      <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#16a34a" />
      </linearGradient>
      <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
    </defs>
    {/* Outer Hexagon */}
    <polygon
      points="50,8 86,28 86,72 50,92 14,72 14,28"
      fill="#0a0a0a"
      stroke="url(#brandGrad)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Inner Rotating Orbit */}
    <ellipse
      cx="50"
      cy="50"
      rx="32"
      ry="14"
      stroke="#22c55e"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      opacity="0.7"
      transform="rotate(-30 50 50)"
    />
    <ellipse
      cx="50"
      cy="50"
      rx="32"
      ry="14"
      stroke="#8a8a8a"
      strokeWidth="1.5"
      strokeDasharray="5 3"
      opacity="0.6"
      transform="rotate(35 50 50)"
    />
    {/* Central Iris Shield */}
    <path
      d="M50 26 L68 39 V61 L50 74 L32 61 V39 Z"
      fill="#111111"
      stroke="url(#coreGlow)"
      strokeWidth="2.5"
    />
    {/* Core Zero-Knowledge Singularity */}
    <circle cx="50" cy="50" r="5" fill="#f5f5f5" />
    <circle cx="50" cy="50" r="2.5" fill="#22c55e" />
    {/* Micro Nodes */}
    <circle cx="50" cy="8" r="2.5" fill="#22c55e" />
    <circle cx="86" cy="28" r="2.5" fill="#8a8a8a" />
    <circle cx="86" cy="72" r="2.5" fill="#22c55e" />
    <circle cx="50" cy="92" r="2.5" fill="#8a8a8a" />
    <circle cx="14" cy="72" r="2.5" fill="#22c55e" />
    <circle cx="14" cy="28" r="2.5" fill="#8a8a8a" />
  </svg>
);

/**
 * Quantum Zero-Knowledge Padlock
 */
export const QuantumLockIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M7 10V7A5 5 0 0 1 17 7V10"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="3"
      y="10"
      width="18"
      height="12"
      rx="3"
      fill="#111111"
      stroke="#22c55e"
      strokeWidth="2"
    />
    <circle cx="12" cy="15" r="2" fill="#22c55e" />
    <path d="M12 17V19" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 14H7" stroke="#8a8a8a" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 14H19" stroke="#8a8a8a" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Micro-Circuit Processor with glowing traces
 */
export const CircuitCoreIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="5" y="5" width="14" height="14" rx="2.5" fill="#111111" stroke="#22c55e" strokeWidth="1.75" />
    <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#f5f5f5" />
    {/* Traces */}
    <path d="M9 2V5M15 2V5M9 19V22M15 19V22M2 9H5M2 15H5M19 9H22M19 15H22" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Cyber Hardware Wallet Vault
 */
export const CyberWalletIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#111111" stroke="#22c55e" strokeWidth="1.75" />
    <path d="M2 9H22" stroke="#1f1f1f" strokeWidth="1.5" />
    <rect x="14" y="11.5" width="6" height="5" rx="1.5" fill="#0a0a0a" stroke="#22c55e" strokeWidth="1.25" />
    <circle cx="16.5" cy="14" r="1" fill="#22c55e" />
    <circle cx="6" cy="6.5" r="1" fill="#22c55e" />
    <circle cx="9" cy="6.5" r="1" fill="#8a8a8a" />
  </svg>
);

/**
 * Confidential Private Witness (The Eye that stays confidential)
 */
export const WitnessEyeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M2 12C4.5 6.5 7.5 4 12 4C16.5 4 19.5 6.5 22 12C19.5 17.5 16.5 20 12 20C7.5 20 4.5 17.5 2 12Z"
      stroke="#22c55e"
      strokeWidth="1.75"
    />
    <circle cx="12" cy="12" r="4" fill="#0a0a0a" stroke="#22c55e" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#22c55e" />
    <path d="M3 3L21 21" stroke="#8a8a8a" strokeWidth="1.75" strokeLinecap="round" opacity="0.8" />
  </svg>
);

/**
 * On-Chain Public Ledger Block
 */
export const LedgerBlockIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z" fill="#111111" stroke="#22c55e" strokeWidth="1.75" strokeLinejoin="round" />
    <path d="M12 22V12M20 6.5L12 12M4 6.5L12 12" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
    <circle cx="12" cy="12" r="2" fill="#22c55e" />
  </svg>
);

/**
 * Radiant Energy Sparkle
 */
export const EnergySparkIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="1.25"
    />
  </svg>
);
