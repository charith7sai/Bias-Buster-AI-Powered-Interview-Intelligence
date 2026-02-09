"use client";

import React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-sky-50 lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4">
        {children}
      </div>
      <div className="hidden lg:block" />
    </div>
  );
}
