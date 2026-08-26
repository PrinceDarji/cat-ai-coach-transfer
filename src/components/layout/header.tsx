'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Search, Bell, Clock, Menu } from 'lucide-react'
import { useUserStore } from '@/lib/store/user-store'
import { calculateDaysUntilCAT } from '@/lib/utils'

const BREADCRUMB_MAP: Record<string, string> = {
  '/': 'AI Coach',
  '/dashboard': 'Dashboard',
  '/planner': 'Daily Planner',
  '/quant': 'Quantitative Aptitude',
  '/lrdi': 'LR & Data Interpretation',
  '/varc': 'Verbal Ability & RC',
  '/mistakes': 'Mistake Book',
  '/mocks': 'Mock Analysis',
  '/notes': 'Notes',
  '/analytics': 'Analytics',
  '/onboarding': 'Getting Started',
}

export default function Header() {
  const pathname = usePathname()
  const profile = useUserStore((s) => s.profile)
  const daysLeft = profile?.catExamDate ? calculateDaysUntilCAT(profile.catExamDate) : 118
  const initials = profile?.name
    ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'PD'
  
  const getBreadcrumb = () => {
    return BREADCRUMB_MAP[pathname] || pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1) || 'Coach'
  }

  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 bg-slate-950/70 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle (hidden on desktop usually, but styling placeholder) */}
        <button className="md:hidden p-2 rounded-md hover:bg-white/10 text-slate-400 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium text-slate-100 hidden sm:block">
          {getBreadcrumb()}
        </h1>
      </div>

      <div className="flex-1 max-w-md px-4 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-accent-violet transition-colors" />
          <input 
            type="text" 
            placeholder="Search topics, questions, shortcuts... (Cmd+K)" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-violet/50 focus:bg-white/10 transition-all focus:ring-2 focus:ring-accent-violet/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-2 glass-card px-3 py-1.5 border-accent-cyan/20 bg-accent-cyan/5">
          <Clock className="w-4 h-4 text-accent-cyan" />
          <span className="text-xs font-semibold text-accent-cyan">CAT &apos;26: {daysLeft} Days</span>
        </div>
        
        <button className="relative p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-rose rounded-full animate-pulse"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-accent-violet to-accent-blue p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg glow-violet">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-900">
            <span className="text-xs font-bold text-white">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
