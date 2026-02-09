import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(0, 5)">
        <path
          d="M25,0 C-15,35 25,70 25,70 C25,70 65,35 25,0 Z"
          fill="#5B21B6"
          transform="scale(0.7)"
        />
        <circle cx="14" cy="14" r="2.1" fill="white" />
        <circle cx="21" cy="14" r="2.1" fill="white" />
      </g>
      <g transform="translate(50, 0)">
        <text
          x="0"
          y="30"
          fontFamily="Georgia, serif"
          fontSize="24"
          fontWeight="bold"
          fill="#B91C1C"
          dominantBaseline="middle"
        >
          BiasBuster
        </text>
        <text
          x="135"
          y="50"
          fontFamily="Inter, sans-serif"
          fontSize="8"
          fontWeight="300"
          fill="#B91C1C"
          textAnchor="middle"
          letterSpacing="1.5"
        >
          – UNBIASED HIRING STARTS HERE –
        </text>
      </g>
    </svg>
  );
}
