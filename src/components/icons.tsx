import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.65 12L18.31 19H5.69L2.35 12L5.69 5H18.31L21.65 12ZM18.31 12L16.19 17.5H7.81L5.69 12L7.81 6.5H16.19L18.31 12ZM14.2 9L13.2 7.5H10.8L9.8 9H8V15H9.8L10.8 16.5H13.2L14.2 15H16V9H14.2ZM14 10.5V13.5H13.2L12.2 12L13.2 10.5H14Z"
        fill="url(#logo-gradient)"
      />
    </svg>
  );
}
