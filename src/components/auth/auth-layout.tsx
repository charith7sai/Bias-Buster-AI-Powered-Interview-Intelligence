"use client";

import React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const authBg = PlaceHolderImages.find(img => img.id === 'auth-background');

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: authBg ? `url(${authBg.imageUrl})` : 'none' }}
      data-ai-hint={authBg?.imageHint}
    >
      <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 px-4">
          {children}
        </div>
        {/* The right side is empty to let the background show through */}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
}
