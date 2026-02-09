import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 340 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z M30 7 L56 22.32 L56 46.96 L30 62.28 L4 46.96 L4 22.32 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        transform="translate(0, 12) scale(0.5)"
      />
      <text
        x="45"
        y="30"
        fontFamily="Inter, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="currentColor"
        dominantBaseline="middle"
        letterSpacing="0.5"
      >
        BiasBuster
      </text>
      <text
        x="170"
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
