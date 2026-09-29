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
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-foreground border border-border text-[11px] font-mono font-medium shadow-xs">
        <Lock className="w-3 h-3 text-accent" />
        <span className="font-bold">{label || 'PRIVATE WITNESS'}</span>
        {sublabel && <span className="text-muted-foreground">({sublabel})</span>}
      </span>
    );
  }

  if (type === 'public') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/30 text-[11px] font-mono font-medium shadow-xs">
        <Globe className="w-3 h-3 text-accent" />
        <span className="font-bold">{label || 'PUBLIC DISCLOSURE'}</span>
        {sublabel && <span className="text-accent/80">({sublabel})</span>}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-accent border border-accent/30 text-[11px] font-mono font-medium shadow-xs">
      <Shield className="w-3 h-3 text-accent" />
      <span className="font-bold">{label || 'ZERO-KNOWLEDGE PROOF'}</span>
      {sublabel && <span className="text-muted-foreground">({sublabel})</span>}
    </span>
  );
};