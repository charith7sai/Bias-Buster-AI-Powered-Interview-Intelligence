import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 210 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        {/* Hexagon icon, scaled and positioned to match font height. */}
        <g transform="translate(7.2, 18.2) scale(0.4)">
          <path 
            d="M34 1 L61 15.5 V44.5 L34 58 L7 44.5 V15.5 Z M34 10 L55.5 22.25 V40.75 L34 52.5 L12.5 40.75 V22.25 Z" 
            fillRule="evenodd" 
            fill="#374151"
          />
        </g>
        
        {/* Text part of the logo */}
        <text 
          x="33" 
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
        <circle cx="36" cy="15.5" r="2.5" fill="#374151" />
        
        {/* Tagline */}
        <text 
          x="105" 
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
