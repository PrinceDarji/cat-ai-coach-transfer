import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/providers'
import AppShell from '@/components/layout/app-shell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'CAT AI Coach | Your Premium Prep Companion',
  description: 'AI-powered coaching platform for CAT exam preparation. Dark mode, analytics, and intelligent study plans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-inter bg-slate-950 text-white antialiased overflow-hidden`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
