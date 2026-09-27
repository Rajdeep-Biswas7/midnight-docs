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
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] text-[#f5f5f5] border border-[#1f1f1f] text-[11px] font-mono font-medium shadow-xs">
        <Lock className="w-3 h-3 text-[#22c55e]" />
        <span className="font-bold">{label || 'PRIVATE WITNESS'}</span>
        {sublabel && <span className="text-[#8a8a8a]">({sublabel})</span>}
      </span>
    );
  }

  if (type === 'public') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 text-[11px] font-mono font-medium shadow-xs">
        <Globe className="w-3 h-3 text-[#22c55e]" />
        <span className="font-bold">{label || 'PUBLIC DISCLOSURE'}</span>
        {sublabel && <span className="text-[#22c55e]/80">({sublabel})</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] text-[#22c55e] border border-[#22c55e]/30 text-[11px] font-mono font-medium shadow-xs">
      <Shield className="w-3 h-3 text-[#22c55e]" />
      <span className="font-bold">{label || 'ZERO-KNOWLEDGE PROOF'}</span>
      {sublabel && <span className="text-[#8a8a8a]">({sublabel})</span>}
    </span>
  );
};