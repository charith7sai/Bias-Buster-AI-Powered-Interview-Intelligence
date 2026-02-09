import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 340 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 12 L30 20.66 L30 37.98 L15 46.64 L0 37.98 L0 20.66 Z M15 15.5 L28 23.16 L28 35.48 L15 43.14 L2 35.48 L2 23.16 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <text
        x="45"
        y="40"
        fontSize="36"
        fontWeight="bold"
        fill="currentColor"
        letterSpacing="0.5"
      >
        BiasBuster
      </text>
      <text
        x="170"
        y="52"
        fontSize="9"
        fontWeight="300"
        fill="currentColor"
        textAnchor="middle"
        letterSpacing="2"
      >
        UNBIASED HIRING STARTS HERE
      </text>
    </svg>
  );
}
