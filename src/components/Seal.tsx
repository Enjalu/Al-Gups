interface SealProps {
  size?: number;
  className?: string;
}

export default function Seal({ size = 48, className = "" }: SealProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-label="GUPS Alumni Association Seal">
      <circle cx="50" cy="50" r="48" fill="#2B5F3A" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#E8A020" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="36" fill="#234D33" />

      {/* Text around the ring */}
      <path id="topArc" d="M 14 50 A 36 36 0 0 1 86 50" fill="none" />
      <path id="bottomArc" d="M 86 50 A 36 36 0 0 1 14 50" fill="none" />

      <text fontSize="6.5" fill="#E8A020" fontFamily="Georgia, serif" letterSpacing="1.5">
        <textPath href="#topArc" startOffset="10%">ALUMNI ASSOCIATION · GUPS</textPath>
      </text>
      <text fontSize="6" fill="#E8A020" fontFamily="Georgia, serif" letterSpacing="1.5">
        <textPath href="#bottomArc" startOffset="8%">KOHALPUR-2, BANKE · NEPAL</textPath>
      </text>

      {/* Central emblem */}
      <text x="50" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill="#F2B840" fontFamily="Georgia, serif">GUPS</text>
      <text x="50" y="55" textAnchor="middle" fontSize="5.5" fill="#A8D4BC" fontFamily="Georgia, serif" letterSpacing="2">EST. 2057 B.S.</text>

      {/* Decorative stars */}
      <text x="50" y="68" textAnchor="middle" fontSize="7" fill="#E8A020">✦</text>

      {/* Gold dots at cardinal points on inner ring */}
      <circle cx="50" cy="14" r="2" fill="#E8A020" />
      <circle cx="86" cy="50" r="2" fill="#E8A020" />
      <circle cx="50" cy="86" r="2" fill="#E8A020" />
      <circle cx="14" cy="50" r="2" fill="#E8A020" />
    </svg>
  );
}
