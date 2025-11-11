import { SVGAttributes } from "react";

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      role="img"
      aria-label="Stake"
      viewBox="0 0 240 48"
      width="240"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Stake</title>

      <defs>
        <linearGradient id="stake-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="55%" stopColor="#1E90FF" />
          <stop offset="100%" stopColor="#6C5CE7" />
        </linearGradient>

        {/* subtle drop shadow */}
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b1220" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Optional monogram S inside circle on the left */}
      <g transform="translate(8,4)">
        <path
          d="M14 18c2-3 6-6 10-4 4 2 4 8 0 11-4 3-8 1-10-2"
          fill="none"
          stroke="url(#stake-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Wordmark */}
      <g transform="translate(40,34)" filter="url(#soft-shadow)">
        <text
          x="0"
          y="0"
          fontFamily="Inter, Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          fontWeight={700}
          fontSize={28}
          fill="url(#stake-gradient)"
          style={{ letterSpacing: "-1px" }}
        >
          stake
        </text>
      </g>
    </svg>
  );
}
