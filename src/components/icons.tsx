import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 420 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Hexagon Icon */}
      <g transform="translate(10, 0)">
        <path
          d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 7 L56 22.32 L56 46.96 L30 62.28 L4 46.96 L4 22.32 Z"
          fill="currentColor"
          transform="scale(0.7)"
        />
      </g>
      
      {/* Text: iasBuster */}
      <text
        x="55"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="currentColor"
        dominantBaseline="middle"
        letterSpacing="0.5"
      >
        iasBuster
      </text>

      {/* Tagline */}
      <text
        x="235"
        y="52"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="300"
        fill="currentColor"
        textAnchor="middle"
        letterSpacing="2"
        style={{ textTransform: 'uppercase' }}
      >
        UNBIASED HIRING STARTS HERE
      </text>
    </svg>
  );
}
