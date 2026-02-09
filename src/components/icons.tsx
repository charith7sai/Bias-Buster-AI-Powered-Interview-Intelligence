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
        <path
          d="M34 5.4L9.80005 18.5V45.1L34 53.4L58.2 45.1V18.5L34 5.4Z"
          fill="white"
        />
        <path
          d="M33.9999 9.90002L13.1999 21.2V42.8L33.9999 49.6L54.7999 42.8V21.2L33.9999 9.90002Z"
          fill="#374151"
        />
        <path
          d="M34 14.4L16.6 24V39.6L34 45.1L51.4 39.6V24L34 14.4Z"
          fill="white"
        />
        <path
          d="M34 18.9L20 26.7V36.9L34 42.4L48 36.9V26.7L34 18.9Z"
          fill="#374151"
        />
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
