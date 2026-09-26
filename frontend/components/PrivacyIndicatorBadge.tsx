import React from 'react';
import { Lock, Globe, Shield } from 'lucide-react';

interface PrivacyIndicatorBadgeProps {
  type: 'private' | 'public' | 'proof';
  label?: string;
  sublabel?: string;
}

export const PrivacyIndicatorBadge: React.FC<PrivacyIndicatorBadgeProps> = ({
  type,
  label,
  sublabel,
}) => {
  if (type === 'private') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/25 text-[11px] font-mono font-medium shadow-sm">
        <Lock className="w-3 h-3 text-purple-400" />
        <span className="font-bold">{label || 'PRIVATE WITNESS'}</span>
        {sublabel && <span className="text-purple-400/80">({sublabel})</span>}
      </span>
    );
  }

  if (type === 'public') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-[11px] font-mono font-medium shadow-sm">
        <Globe className="w-3 h-3 text-emerald-400" />
        <span className="font-bold">{label || 'PUBLIC DISCLOSURE'}</span>
        {sublabel && <span className="text-emerald-400/80">({sublabel})</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-[11px] font-mono font-medium shadow-sm">
      <Shield className="w-3 h-3 text-cyan-400" />
      <span className="font-bold">{label || 'ZERO-KNOWLEDGE PROOF'}</span>
      {sublabel && <span className="text-cyan-400/80">({sublabel})</span>}
    </span>
  );
};