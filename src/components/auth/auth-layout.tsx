"use client";

import React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-sky-50 py-12 px-4">
        {children}
    </div>
  );
}
