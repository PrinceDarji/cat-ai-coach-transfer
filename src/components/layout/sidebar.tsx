'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  LayoutDashboard,
  Calendar,
  Calculator,
  Puzzle,
  BookOpen,
  AlertCircle,
  FileText,
  Notebook,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Zap,
  Clock,
  Menu,
  X,
} from 'lucide-react'
import { useUserStore } from '@/lib/store/user-store'
import { useXPStore } from '@/lib/store/xp-store'
import { calculateDaysUntilCAT } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Coach', href: '/', icon: Bot, description: 'Your AI Mentor' },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, description: 'Overview & Stats' },
  { label: 'Planner', href: '/planner', icon: Calendar, description: 'Daily Study Plan' },
  { label: 'Quant', href: '/quant', icon: Calculator, description: 'Quantitative Ability' },
  { label: 'LRDI', href: '/lrdi', icon: Puzzle, description: 'Logical Reasoning & DI' },
  { label: 'VARC', href: '/varc', icon: BookOpen, description: 'Verbal Ability & RC' },
  { label: 'PYQs', href: '/pyqs', icon: FileText, description: 'Previous Year Questions' },
  { label: 'Mistakes', href: '/mistakes', icon: AlertCircle, description: 'Mistake Book' },
  { label: 'Mocks', href: '/mocks', icon: FileText, description: 'Mock Analysis' },
  { label: 'Notes', href: '/notes', icon: Notebook, description: 'Notes & Flashcards' },
  { label: 'Analytics', href: '/analytics', icon: BarChart2, description: 'Performance Insights' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const profile = useUserStore((s) => s.profile)
  const { streak, totalXP } = useXPStore()
  const getLevel = useXPStore((s) => s.getLevel)

  const daysLeft = profile?.catExamDate ? calculateDaysUntilCAT(profile.catExamDate) : 118
  const levelInfo = getLevel()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
          >
            <h1 className="text-lg font-bold">
              <span className="gradient-text">CAT AI</span>
            </h1>
            <p className="text-[10px] text-white/40 -mt-0.5 tracking-wider uppercase">Coach</p>
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/5" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <motion.div
                className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-[#8b5cf6]' : ''}`} />
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px bg-white/5" />

      {/* Bottom Stats */}
      {!collapsed && (
        <div className="px-4 py-4 space-y-3">
          {/* Level & XP */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/50">Level {levelInfo.level}</span>
              <span className="text-[#8b5cf6] font-medium">{totalXP} XP</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]"
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Streak & Days Left */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-white/70">{streak} day streak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/70">{daysLeft}d left</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="hidden lg:flex px-3 py-3 justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/60 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass-card"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            className="lg:hidden fixed left-0 top-0 h-full w-64 bg-[#0a0a0f] border-r border-white/5 z-50"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block h-full border-r border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl transition-all duration-300 flex-shrink-0 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
