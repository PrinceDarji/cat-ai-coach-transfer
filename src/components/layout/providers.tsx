'use client'

import React, { useEffect, useState } from 'react'

const APP_VERSION = '2.0.0'; // Bump this to force reset

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Auto-clear stale localStorage from broken previous versions
    const storedVersion = localStorage.getItem('cat-ai-version');
    if (storedVersion !== APP_VERSION) {
      // Clear all app stores
      const keysToRemove = [
        'cat-user-storage',
        'cat-study-storage', 
        'cat-mistake-storage',
        'cat-mock-storage',
        'cat-xp-storage',
        'cat-chat-storage',
        'cat-note-storage',
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      localStorage.setItem('cat-ai-version', APP_VERSION);
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#8b5cf6] rounded-full animate-spin"></div>
      </div>
    )
  }

  return <>{children}</>
}
