import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 210 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(0, 15)">
        <g transform="translate(7.2, 18.2) scale(0.4)">
          <path
            d="M54.5 22.5L36 33.5L17.5 22.5L17.5 0.5L36 -10.5L54.5 0.5L54.5 22.5Z"
            stroke="#374151"
            strokeWidth="3"
            fill="transparent"
          />
          <path
            d="M47 18.5L36 24.5L25 18.5L25 6.5L36 0.5L47 6.5L47 18.5Z"
            stroke="#374151"
            strokeWidth="3"
            fill="transparent"
          />
        </g>
      </g>
      <g transform="translate(40, 0)">
        <text
          x="0"
          y="30"
          fontFamily="sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="currentColor"
          dominantBaseline="middle"
        >
          iasBuster
        </text>
        <text
          x="75"
          y="50"
          fontFamily="sans-serif"
          fontSize="8"
          fontWeight="300"
          fill="currentColor"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          UNBIASED HIRING STARTS HERE
        </text>
      </g>
    </svg>
  );
}
