"use client";

import React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background py-12 px-4">
      {/* Background container */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-background dark:from-sky-950/50 dark:to-background" />

        {/* Grid and Waves */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_-20%,rgba(125,211,252,0.1),transparent)]"
        />

        <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-auto">
              <path
                  fill="hsl(var(--primary) / 0.05)"
                  d="M0,160L40,170.7C80,181,160,203,240,218.7C320,235,400,245,480,224C560,203,640,149,720,138.7C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
              ></path>
          </svg>
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full h-auto">
              <path
                  fill="hsl(var(--primary) / 0.1)"
                  d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,234.7C672,235,768,181,864,154.7C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
}
