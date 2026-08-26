'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import Header from '@/components/layout/header'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isOnboarding = pathname === '/onboarding'

  if (isOnboarding) {
    return (
      <div className="h-screen w-full overflow-y-auto">
        {children}
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          {/* Background decorative glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-violet/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          {children}
        </main>
      </div>
    </div>
  )
}
