'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, BarChart2, BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MocksHub() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8 bg-[#0a0a0f] text-white flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
          Mock Center
        </h1>
        <p className="text-white/60 text-lg">
          Take full-length CAT exams or analyze your past performance with AI insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Take a Mock */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/mocks/take')}
          className="group relative bg-[#111116] border border-white/10 p-8 rounded-2xl text-left overflow-hidden hover:border-blue-500/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 ml-1" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Take a Mock</h2>
          <p className="text-white/60">
            Experience the real CAT exam environment. Strict timers, section-wise navigation, and authentic PYQs.
          </p>
        </motion.button>

        {/* Analyze Mock */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/mocks/dashboard')}
          className="group relative bg-[#111116] border border-white/10 p-8 rounded-2xl text-left overflow-hidden hover:border-emerald-500/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
            <BarChart2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Analyze Mocks</h2>
          <p className="text-white/60">
            Dive deep into your performance. View section-wise accuracy, percentiles, and AI-generated insights.
          </p>
        </motion.button>
      </div>
    </div>
  );
}
