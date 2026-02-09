"use client";

import React from 'react';

const AuthBackground = () => (
  <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#f0f9ff', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#FFFFFF', stopOpacity: 1}} />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 120, 255, 0.05)" strokeWidth="1"/>
      </pattern>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
       <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="rgba(0, 0, 0, 0.08)" />
      </filter>
    </defs>

    <rect width="1600" height="900" fill="url(#bgGradient)" />
    <rect width="1600" height="900" fill="url(#grid)" />

    <path d="M -100 500 Q 400 300 800 500 T 1700 500" stroke="rgba(0, 150, 255, 0.08)" strokeWidth="120" fill="none" opacity="0.5" filter="url(#glow)"/>
    <path d="M -100 600 Q 400 800 800 600 T 1700 600" stroke="rgba(0, 150, 255, 0.06)" strokeWidth="80" fill="none" opacity="0.6" filter="url(#glow)"/>

    <g opacity="0.2" strokeLinecap="round" strokeWidth="1" filter="url(#glow)">
      <path d="M 850 100 L 950 250" stroke="#87CEEB" />
      <path d="M 950 250 L 850 400" stroke="#87CEEB" />
      <path d="M 950 250 L 1100 180" stroke="#87CEEB" />
      <path d="M 950 250 L 1100 320" stroke="#87CEEB" />
      <path d="M 1100 180 L 1200 150" stroke="#ADD8E6" />
      <path d="M 1100 180 L 1200 210" stroke="#ADD8E6" />
      <path d="M 1100 320 L 1200 290" stroke="#ADD8E6" />
      <path d="M 1100 320 L 1200 350" stroke="#ADD8E6" />
      <circle cx="850" cy="100" r="4" fill="#007BFF" />
      <circle cx="850" cy="400" r="4" fill="#007BFF" />
      <circle cx="950" cy="250" r="6" fill="#007BFF" />
      <circle cx="1100" cy="180" r="5" fill="#87CEEB" />
      <circle cx="1100" cy="320" r="5" fill="#87CEEB" />
    </g>

    <g fill="#007BFF" opacity="0.3">
        <circle cx="1400" cy="150" r="2" /> <circle cx="1350" cy="250" r="1.5" /> <circle cx="1500" cy="300" r="3" /> <circle cx="900" cy="800" r="2.5" /> <circle cx="1050" cy="750" r="1.5" /> <rect x="1250" y="600" width="4" height="4" /> <rect x="1450" y="700" width="2" height="2" />
    </g>

    <g transform="translate(820, 75)">
        <rect x="100" y="100" width="650" height="700" rx="20" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5"/>
        
        <g filter="url(#soft-shadow)">
            <rect x="150" y="150" width="280" height="380" rx="15" fill="white"/>
        </g>
        <circle cx="290" cy="230" r="45" fill="#e9ecef" />
        <path d="M 290 275 C 265 275, 245 295, 245 320 L 335 320 C 335 295, 315 275, 290 275 Z" fill="#e9ecef" />
        <rect x="180" y="340" width="220" height="12" rx="6" fill="#f8f9fa" />
        <rect x="180" y="365" width="180" height="12" rx="6" fill="#f8f9fa" />
        <rect x="180" y="390" width="220" height="12" rx="6" fill="#f8f9fa" />
        <rect x="180" y="415" width="160" height="12" rx="6" fill="#f8f9fa" />

        <g transform="translate(365, 165)" fill="#3F51B5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" transform="scale(1.8)" fill="#3F51B5" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(7, 8) scale(1.2)"/>
        </g>

        <g transform="translate(460, 150)">
            <rect width="250" height="180" rx="10" fill="white" filter="url(#soft-shadow)"/>
            <path d="M 20 140 C 60 40, 100 110, 140 70 S 220 10, 230 90" stroke="#3F51B5" strokeWidth="3" fill="none" />
            <rect x="20" y="150" width="210" height="4" rx="2" fill="#f8f9fa" />
        </g>

        <g transform="translate(460, 360)">
            <text x="0" y="15" fill="#555" fontFamily="sans-serif" fontSize="16" fontWeight="500">Rating:</text>
            <g transform="translate(80, 0)" fill="#ffc107">
              <path transform="scale(0.8)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"/>
              <path transform="translate(30) scale(0.8)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"/>
              <path transform="translate(60) scale(0.8)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"/>
              <path transform="translate(90) scale(0.8)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"/>
            </g>
             <g transform="translate(200, 0)" fill="#e9ecef">
                <path transform="scale(0.8)" d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279-6.064-5.828 8.332-1.151z"/>
            </g>
        </g>
        
        <g transform="translate(150, 560)">
          <rect width="580" height="180" rx="10" fill="white" filter="url(#soft-shadow)"/>
          <path d="M 20,120 L 140,120 L 160,100 L 20,100 Z" fill="#e9ecef" />
          <rect x="25" y="105" width="110" height="8" rx="4" fill="#ced4da" />
          <circle cx="190" cy="100" r="12" fill="#d1e7dd" />
          <path d="M 190 112 C 182 132, 198 132, 190 112 Z" fill="#d1e7dd" />
          <circle cx="230" cy="100" r="12" fill="#ffedd5" />
          <path d="M 230 112 C 222 132, 238 132, 230 112 Z" fill="#ffedd5" />
        </g>

        <g transform="translate(480, 420)">
          <circle cx="50" cy="50" r="25" stroke="#3F51B5" strokeWidth="3" fill="none"/>
          <line x1="68" y1="68" x2="85" y2="85" stroke="#3F51B5" strokeWidth="3" strokeLinecap="round" />
          <g transform="translate(110, 20)" stroke="#8BC34A" strokeWidth="3" fill="none" strokeLinecap="round">
              <path d="M 0 10 L 8 18 L 22 4" />
              <path d="M 0 40 L 8 48 L 22 34" />
          </g>
        </g>
    </g>
  </svg>
);

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        {children}
      </div>
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 w-full h-full object-cover">
            <AuthBackground />
        </div>
      </div>
    </div>
  );
}
