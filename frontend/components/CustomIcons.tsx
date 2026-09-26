import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Custom Zero-Knowledge Shield with pulsing circuit core
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
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="coreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <filter id="iconGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Outer Hexagon */}
    <polygon
      points="50,8 86,28 86,72 50,92 14,72 14,28"
      fill="#0c1222"
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
      stroke="#38bdf8"
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
      stroke="#10b981"
      strokeWidth="1.5"
      strokeDasharray="5 3"
      opacity="0.6"
      transform="rotate(35 50 50)"
    />
    {/* Central Iris Shield */}
    <path
      d="M50 26 L68 39 V61 L50 74 L32 61 V39 Z"
      fill="url(#brandGrad)"
      fillOpacity="0.25"
      stroke="url(#coreGlow)"
      strokeWidth="2.5"
    />
    {/* Core Zero-Knowledge Singularity */}
    <circle cx="50" cy="50" r="7" fill="#ffffff" filter="url(#iconGlow)" />
    <circle cx="50" cy="50" r="3.5" fill="#6366f1" />
    {/* Micro Nodes */}
    <circle cx="50" cy="8" r="3" fill="#10b981" />
    <circle cx="86" cy="28" r="3" fill="#6366f1" />
    <circle cx="86" cy="72" r="3" fill="#a855f7" />
    <circle cx="50" cy="92" r="3" fill="#38bdf8" />
    <circle cx="14" cy="72" r="3" fill="#10b981" />
    <circle cx="14" cy="28" r="3" fill="#6366f1" />
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
    <defs>
      <linearGradient id="lockGrad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <path
      d="M7 10V7A5 5 0 0 1 17 7V10"
      stroke="url(#lockGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="3"
      y="10"
      width="18"
      height="12"
      rx="3"
      fill="#0c1222"
      stroke="url(#lockGrad)"
      strokeWidth="2"
    />
    <circle cx="12" cy="15" r="2" fill="#38bdf8" />
    <path d="M12 17V19" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 14H7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 14H19" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
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
    <rect x="5" y="5" width="14" height="14" rx="2.5" fill="#0c1222" stroke="#6366f1" strokeWidth="1.75" />
    <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#6366f1" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
    {/* Traces */}
    <path d="M9 2V5M15 2V5M9 19V22M15 19V22M2 9H5M2 15H5M19 9H22M19 15H22" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
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
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#0c1222" stroke="#818cf8" strokeWidth="1.75" />
    <path d="M2 9H22" stroke="#4338ca" strokeWidth="1.5" />
    <rect x="14" y="11.5" width="6" height="5" rx="1.5" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1.25" />
    <circle cx="16.5" cy="14" r="1" fill="#38bdf8" />
    <circle cx="6" cy="6.5" r="1" fill="#10b981" />
    <circle cx="9" cy="6.5" r="1" fill="#6366f1" />
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
      stroke="#a855f7"
      strokeWidth="1.75"
    />
    <circle cx="12" cy="12" r="4" fill="#0c1222" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#10b981" />
    <path d="M3 3L21 21" stroke="#f43f5e" strokeWidth="1.75" strokeLinecap="round" opacity="0.8" />
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
    <path d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z" fill="#0c1222" stroke="#10b981" strokeWidth="1.75" strokeLinejoin="round" />
    <path d="M12 22V12M20 6.5L12 12M4 6.5L12 12" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
    <circle cx="12" cy="12" r="2" fill="#10b981" />
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
      fill="url(#sparkGrad)"
      stroke="#38bdf8"
      strokeWidth="1.25"
    />
    <defs>
      <linearGradient id="sparkGrad" x1="2" y1="2" x2="22" y2="22">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
  </svg>
);
