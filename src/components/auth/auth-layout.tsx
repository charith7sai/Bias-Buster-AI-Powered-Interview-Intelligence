"use client";

import React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-950 py-12 px-4 overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0 -z-10">
        {/* Shiny effect - Glowing Blue */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,183,255,0.15)_0%,transparent_70%)]" />

        {/* Animated Waves */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-none">
                <svg className="absolute top-1/2 left-1/2 w-[200%] max-w-none animate-wave" style={{ animationDirection: 'reverse', animationDuration: '40s' }} viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C240,150 480,350 720,250 C960,150 1200,350 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.03"
                    ></path>
                </svg>
                 <svg className="absolute top-1/2 left-1/2 w-[220%] max-w-none animate-wave" style={{ animationDuration: '50s' }} viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C240,350 480,150 720,250 C960,350 1200,150 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.05"
                    ></path>
                </svg>
                 <svg className="absolute top-1/2 left-1/2 w-[240%] max-w-none animate-wave" style={{ animationDuration: '60s' }} viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C288,200 576,300 864,250 C1152,200 1440,300 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.02"
                    ></path>
                </svg>
            </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}