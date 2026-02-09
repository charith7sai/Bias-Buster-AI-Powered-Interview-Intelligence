"use client";

import React from 'react';

const AuthBackground = () => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: 'white' }}
    >
      <defs>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
        <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.1" />
        </filter>
        <clipPath id="clip-path">
          <rect x="960" y="0" width="960" height="1080" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="1920" height="1080" fill="url(#bg-grad)" />

      {/* Grid Lines */}
      <g clipPath="url(#clip-path)" opacity="0.3">
        {Array.from({ length: 50 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 40 + 960} y1="0" x2={i * 40 + 960} y2="1080" stroke="#dbeafe" strokeWidth="1" />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`h-${i}`} x1="960" y1={i * 40} x2="1920" y2={i * 40} stroke="#dbeafe" strokeWidth="1" />
        ))}
      </g>

      {/* Abstract Waves */}
      <g clipPath="url(#clip-path)" opacity="0.5">
        <path d="M 960 800 C 1200 700, 1400 900, 1920 850 L 1920 1080 L 960 1080 Z" fill="#dbeafe" />
        <path d="M 960 900 C 1100 850, 1300 950, 1920 920 L 1920 1080 L 960 1080 Z" fill="#bfdbfe" />
      </g>
      
      {/* Dashboard Illustration on the right */}
      <g transform="translate(1080, 180)">

        {/* Candidate Profile Card */}
        <g filter="url(#soft-shadow)">
            <rect x="0" y="0" width="450" height="200" rx="20" fill="white" />
        </g>
        <circle cx="60" cy="60" r="30" fill="#e2e8f0" />
        <text x="110" y="50" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="#1e293b">Alex Green</text>
        <text x="110" y="80" fontFamily="sans-serif" fontSize="16" fill="#64748b">Product Manager</text>
        <g transform="translate(110, 100)">
            {[0, 1, 2, 3].map(i => (
                <path key={i} d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" fill="#facc15" transform={`translate(${i * 25}, 0) scale(0.8)`} />
            ))}
             <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" fill="#e2e8f0" transform={`translate(100, 0) scale(0.8)`} />
        </g>
        
        {/* Shield Icon */}
        <g transform="translate(360, 30)">
            <g filter="url(#soft-shadow)">
                <circle cx="0" cy="0" r="35" fill="white"/>
            </g>
            <path d="M0 -15 L15 0 V10 C15 20 0 25 0 25 S -15 20 -15 10 V 0 Z" fill="#3b82f6" />
            <path d="M-6 5 L-2 9 L6 0" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        
        {/* Analytics Card */}
        <g transform="translate(0, 240)">
            <g filter="url(#soft-shadow)">
                <rect x="0" y="0" width="450" height="200" rx="20" fill="white" />
            </g>
            <text x="25" y="40" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#1e293b">Analytics</text>
            {/* Bar chart */}
            <g transform="translate(40, 70)">
                <rect x="0" y="70" width="40" height="30" fill="#93c5fd" rx="4" />
                <rect x="50" y="40" width="40" height="60" fill="#60a5fa" rx="4" />
                <rect x="100" y="20" width="40" height="80" fill="#3b82f6" rx="4" />
            </g>
            {/* Checkmark */}
            <circle cx="390" cy="40" r="20" fill="#dcfce7" />
            <path d="M383 40 L388 45 L398 35" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Small people with laptop */}
         <g transform="translate(500, 0)">
            <g filter="url(#soft-shadow)">
                <rect x="0" y="0" width="280" height="440" rx="20" fill="white" />
            </g>
            {/* Laptop */}
            <rect x="70" y="280" width="140" height="80" rx="8" fill="#475569" />
            <rect x="75" y="285" width="130" height="70" rx="4" fill="#dbeafe" />
            <rect x="60" y="360" width="160" height="8" rx="4" fill="#334155" />
            {/* Person 1 */}
            <circle cx="80" cy="240" r="15" fill="#94a3b8" />
            <rect x="65" y="255" width="30" height="40" rx="15" fill="#94a3b8" />
            {/* Person 2 */}
            <circle cx="200" cy="240" r="15" fill="#94a3b8" />
            <rect x="185" y="255" width="30" height="40" rx="15" fill="#94a3b8" />
        </g>

        {/* Magnifying Glass card */}
        <g transform="translate(0, 480)">
             <g filter="url(#soft-shadow)">
                <rect x="0" y="0" width="220" height="220" rx="20" fill="white" />
            </g>
            <circle cx="110" cy="100" r="50" stroke="#93c5fd" strokeWidth="12" fill="none"/>
            <line x1="145" y1="135" x2="185" y2="175" stroke="#93c5fd" strokeWidth="15" strokeLinecap="round"/>
        </g>
      </g>
    </svg>
);

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <AuthBackground />
      <div className="relative w-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 px-4">
          {children}
        </div>
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
