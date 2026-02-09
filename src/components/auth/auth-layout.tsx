"use client";

import React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-cyan-100 dark:bg-slate-900 py-12 px-4 overflow-hidden">
      {/* Background container */}
      <div className="absolute inset-0 -z-10">
        {/* Shiny effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(100,200,255,0.15)_0%,transparent_60%)]" />

        {/* Animated Waves */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-none">
                <svg className="absolute top-1/2 left-1/2 w-[200%] max-w-none animate-wave" style={{ animationDirection: 'reverse' }} viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C240,150 480,350 720,250 C960,150 1200,350 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.1"
                    ></path>
                </svg>
                 <svg className="absolute top-1/2 left-1/2 w-[220%] max-w-none animate-wave" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C240,350 480,150 720,250 C960,350 1200,150 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.1"
                    ></path>
                </svg>
                 <svg className="absolute top-1/2 left-1/2 w-[240%] max-w-none animate-wave" style={{ animationDuration: '60s' }} viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0,250 C288,200 576,300 864,250 C1152,200 1440,300 1440,250 L1440,500 L0,500 Z"
                        fill="white"
                        opacity="0.05"
                    ></path>
                </svg>
            </div>
        </div>
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
}
