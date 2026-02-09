import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 210 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(7.2, 18.2) scale(0.4)">
        <path d="M54.5,1.6L79.7,15.7v28.2L54.5,58L29.3,43.9V15.7L54.5,1.6z M54.5,10.6L36.6,20.8v18.5l17.9,10.1l17.9-10.1V20.8 L54.5,10.6z" fill="currentColor"/>
      </g>
      <text
        x="45"
        y="31"
        fontFamily="Inter, sans-serif"
        fontSize="28"
        fontWeight="bold"
        fill="currentColor"
        dominantBaseline="middle"
      >
        iasBuster
      </text>
      <text
        x="127"
        y="50"
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
