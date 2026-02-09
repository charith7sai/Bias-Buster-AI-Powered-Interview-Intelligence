import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        {/* Hexagon spiral icon. Scaled to be about 55px tall. */}
        <g transform="scale(0.95)">
          <path 
            d="M34 1 L61 15.5 V44.5 L34 58 L7 44.5 V15.5 Z M34 10 L55.5 22.25 V40.75 L34 52.5 L12.5 40.75 V22.25 Z M34 19 L49 29 V35 L34 45 L19 35 V29 Z" 
            fillRule="evenodd" 
            fill="#374151"
          />
        </g>
        
        {/* Text part of the logo */}
        <text 
          x="53" 
          y="30" 
          fontFamily="Inter, sans-serif" 
          fontSize="24" 
          fill="#374151"
          dominantBaseline="middle"
        >
          <tspan fontWeight="400">ias</tspan>
          <tspan fontWeight="700">Buster</tspan>
        </text>

        {/* Custom dot for the 'i' to match the image */}
        <circle cx="58" cy="15.5" r="2.5" fill="#374151" />
        
        {/* Tagline */}
        <text 
          x="125" 
          y="52" 
          fontFamily="Inter, sans-serif" 
          fontSize="8" 
          fill="#374151" 
          letterSpacing="0.15em"
          textAnchor="middle"
        >
          UNBIASED HIRING STARTS HERE
        </text>
      </g>
    </svg>
  );
}
