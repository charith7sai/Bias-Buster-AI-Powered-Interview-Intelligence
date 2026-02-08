import type { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22a4.95 4.95 0 0 0 4.95-4.95c0-2.73-2.22-4.95-4.95-4.95a4.95 4.95 0 0 0-4.95 4.95A4.95 4.95 0 0 0 12 22Z" />
      <path d="M15 13a3 3 0 1 0-6 0" />
      <path d="M12 2v10" />
      <path d="m4.2 8.5 1.8 1.8" />
      <path d="m18 10.3 1.8-1.8" />
    </svg>
  );
}
