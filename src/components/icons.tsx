import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 45"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(0, 1.5) scale(0.6)">
        <path
          d="M36.5,5.1l17.3,10v20l-17.3,10l-17.3-10v-20L36.5,5.1z M36.5,13.1L23.2,20.8v15.4l13.3,7.7l13.3-7.7V20.8L36.5,13.1z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
        />
      </g>
      <text
        x="22"
        y="13.5"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
        dominantBaseline="middle"
      >
        iasBuster
      </text>
      <text
        x="80"
        y="35"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="300"
        fill="currentColor"
        textAnchor="middle"
        letterSpacing="1.5"
        style={{ textTransform: 'uppercase' }}
      >
        UNBIASED HIRING STARTS HERE
      </text>
    </svg>
  );
}
