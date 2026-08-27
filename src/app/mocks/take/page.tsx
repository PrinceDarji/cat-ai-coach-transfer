'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMockStore } from '@/lib/store/mock-store';

const AVAILABLE_MOCKS = [
  {
    id: 'demo-mini',
    name: 'CAT 2026 Mini Mock (Demo)',
    description: 'A 9-question mini mock (3 per section) to test the exam interface.',
    duration: 15,
    totalQuestions: 9,
    status: 'new'
  },
  {
    id: 'cat-2025-slot-1',
    name: 'CAT 2025 Slot 1 (PYQ)',
    description: 'Official CAT 2025 Slot 1 question paper.',
    duration: 120,
    totalQuestions: 66,
    status: 'new'
  },
  {
    id: 'cat-2025-slot-2',
    name: 'CAT 2025 Slot 2 (PYQ)',
    description: 'Official CAT 2025 Slot 2 question paper.',
    duration: 120,
    totalQuestions: 66,
    status: 'new'
  },
  {
    id: 'cat-2023-slot-1',
    name: 'CAT 2023 Slot 1 (PYQ)',
    description: 'Full official CAT 2023 Slot 1 question paper.',
    duration: 120,
    totalQuestions: 66,
    status: 'locked'
  }
];

export default function TakeMockList() {
  const router = useRouter();
  const { mocks } = useMockStore() as any;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8 bg-[#0a0a0f] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Available Mocks
          </h1>
          <p className="text-white/60 mt-2">Select a mock test to begin. Make sure you have uninterrupted time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AVAILABLE_MOCKS.map((mock) => {
            const isCompleted = mocks.some((m: any) => m.name === mock.name);
            const isLocked = mock.status === 'locked';

            return (
              <motion.div
                key={mock.id}
                whileHover={{ y: -4 }}
                className={`bg-[#111116] border ${isCompleted ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl p-6 relative overflow-hidden flex flex-col`}
              >
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMPLETED
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{mock.name}</h3>
                <p className="text-sm text-white/50 mb-6 flex-1">{mock.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-white/70 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-400" /> {mock.duration} mins
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-violet-400" /> {mock.totalQuestions} Questions
                  </div>
                </div>

                {isLocked ? (
                  <button disabled className="w-full py-3 rounded-xl bg-white/5 text-white/30 font-medium cursor-not-allowed">
                    Locked (Coming Soon)
                  </button>
                ) : isCompleted ? (
                  <button onClick={() => router.push('/mocks/dashboard')} className="w-full py-3 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 font-medium transition-colors">
                    View Analysis
                  </button>
                ) : (
                  <button onClick={() => router.push(`/mocks/take/${mock.id}`)} className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-500/20">
                    <Play className="w-4 h-4" /> Start Mock
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
