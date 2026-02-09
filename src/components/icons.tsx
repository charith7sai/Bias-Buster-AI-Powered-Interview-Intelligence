import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          d="M33.9999 0.900024L6.49994 16.5V47.1L33.9999 57.9L61.4999 47.1V16.5L33.9999 0.900024Z"
          fill="#374151"
        />
        <text
          x="34"
          y="33"
          fontFamily="Inter, sans-serif"
          fontSize="36"
          fontWeight="700"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
        >B</text>
      </g>
      
      <text 
        x="80" 
        y="30" 
        fontFamily="Inter, sans-serif" 
        fontSize="24" 
        fill="#374151"
        dominantBaseline="middle"
      >
        <tspan fontWeight="400">Bias</tspan>
        <tspan fontWeight="700">Buster</tspan>
      </text>
      <text 
        x="80" 
        y="48" 
        fontFamily="Inter, sans-serif" 
        fontSize="8" 
        fill="#374151" 
        letterSpacing="0.15em"
      >
        UNBIASED HIRING STARTS HERE
      </text>
    </svg>
  );
}
