'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, Type, Brain, Search, Filter, Target, Clock, TrendingUp, Play, Flame, Sparkles
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, AreaChart, Area, CartesianGrid
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock Types
type TopicStatus = 'not-started' | 'learning' | 'practicing' | 'needs-revision' | 'mastered';

interface VarcTopic {
  id: string;
  name: string;
  category: 'Reading Comprehension' | 'Verbal Ability' | 'Grammar & Vocab';
  status: TopicStatus;
  progress: number;
  attempted: number;
  accuracy: number;
}

// Mock Data
const MOCK_TOPICS: VarcTopic[] = [
  { id: 'v1', name: 'Main Idea / Central Theme', category: 'Reading Comprehension', status: 'mastered', progress: 100, attempted: 45, accuracy: 90 },
  { id: 'v2', name: 'Inference Based', category: 'Reading Comprehension', status: 'practicing', progress: 65, attempted: 38, accuracy: 72 },
  { id: 'v3', name: 'Tone & Style', category: 'Reading Comprehension', status: 'learning', progress: 40, attempted: 20, accuracy: 55 },
  { id: 'v4', name: 'Specific Detail', category: 'Reading Comprehension', status: 'mastered', progress: 90, attempted: 50, accuracy: 88 },
  { id: 'va1', name: 'Para Jumbles', category: 'Verbal Ability', status: 'practicing', progress: 75, attempted: 60, accuracy: 65 },
  { id: 'va2', name: 'Para Summary', category: 'Verbal Ability', status: 'needs-revision', progress: 45, attempted: 35, accuracy: 48 },
  { id: 'va3', name: 'Odd Sentence Out', category: 'Verbal Ability', status: 'practicing', progress: 80, attempted: 40, accuracy: 78 },
  { id: 'va4', name: 'Critical Reasoning', category: 'Verbal Ability', status: 'learning', progress: 30, attempted: 15, accuracy: 50 },
  { id: 'gv1', name: 'Vocabulary Context', category: 'Grammar & Vocab', status: 'practicing', progress: 60, attempted: 100, accuracy: 82 },
  { id: 'gv2', name: 'Sentence Correction', category: 'Grammar & Vocab', status: 'needs-revision', progress: 50, attempted: 45, accuracy: 55 },
];

const STATUS_COLORS = {
  'not-started': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  'learning': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'practicing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'needs-revision': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'mastered': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

// Mock data for Reading Speed chart
const SPEED_DATA = [
  { day: 'Mon', speed: 220 },
  { day: 'Tue', speed: 235 },
  { day: 'Wed', speed: 230 },
  { day: 'Thu', speed: 250 },
  { day: 'Fri', speed: 265 },
  { day: 'Sat', speed: 280 },
  { day: 'Sun', speed: 295 },
];

import { useStudyStore } from '@/lib/store/study-store';

export default function VarcPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Reading Comprehension' | 'Verbal Ability' | 'Grammar & Vocab'>('Reading Comprehension');
  
  const storeTopics = useStudyStore((state: any) => state.topics) || [];
  
  const topics = useMemo(() => {
    const sectionTopics = storeTopics.filter((t: any) => t.section === 'varc');
    if (sectionTopics.length === 0) return MOCK_TOPICS;
    return sectionTopics.map((t: any) => ({
      id: t.id,
      name: t.name,
      category: t.category === 'Verbal Ability' || t.category === 'Grammar & Vocab' ? t.category : 'Reading Comprehension',
      status: t.status || 'not-started',
      progress: t.progress || 0,
      attempted: t.questionsAttempted || 0,
      accuracy: t.accuracy || 0,
    })) as VarcTopic[];
  }, [storeTopics]);

  const currentTopics = useMemo(() => {
    return topics.filter(t => t.category === activeTab);
  }, [topics, activeTab]);

  const rcAccuracy = useMemo(() => {
    const rcTopics = topics.filter(t => t.category === 'Reading Comprehension');
    const total = rcTopics.reduce((acc, t) => acc + t.attempted, 0);
    return total ? rcTopics.reduce((acc, t) => acc + (t.accuracy * t.attempted), 0) / total : 0;
  }, [topics]);

  const vaAccuracy = useMemo(() => {
    const vaTopics = topics.filter(t => t.category === 'Verbal Ability');
    const total = vaTopics.reduce((acc, t) => acc + t.attempted, 0);
    return total ? vaTopics.reduce((acc, t) => acc + (t.accuracy * t.attempted), 0) / total : 0;
  }, [topics]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                <BookOpen className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Verbal Ability & RC
              </h1>
            </div>
            <p className="text-zinc-400 max-w-2xl">
              Enhance your reading comprehension speed and master verbal logic constructs.
            </p>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">RC Accuracy</span>
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">{rcAccuracy.toFixed(1)}%</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">VA Accuracy</span>
              <Brain className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-3xl font-bold text-white">{vaAccuracy.toFixed(1)}%</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="relative z-10 flex justify-between items-start mb-2">
              <span className="text-zinc-400 font-medium">Reading Speed (WPM)</span>
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div className="relative z-10 flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-white">295</span>
              <span className="text-sm text-emerald-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +15% this week</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPEED_DATA}>
                  <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="speed" stroke="#10b981" fillOpacity={1} fill="url(#colorSpeed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-4 border-b border-white/10 pb-px">
          {(['Reading Comprehension', 'Verbal Ability', 'Grammar & Vocab'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 px-2 text-sm font-medium transition-all relative",
                activeTab === tab ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabVarc" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {currentTopics.map((topic, i) => (
            <motion.div 
              key={topic.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#13131a] border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] rounded-2xl transition-all duration-300 flex flex-col group overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {topic.name}
                  </h3>
                </div>

                <div className="mb-6">
                  <span className={cn(
                    "text-xs px-2.5 py-1 rounded-md border font-medium inline-block capitalize",
                    STATUS_COLORS[topic.status]
                  )}>
                    {topic.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="mt-auto space-y-5">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-zinc-500">Attempted</span>
                      <span className="font-semibold text-zinc-200">{topic.attempted} {activeTab === 'Reading Comprehension' ? 'Passages' : 'Questions'}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-zinc-500">Accuracy</span>
                      <span className={cn(
                        "font-semibold text-lg",
                        topic.accuracy > 80 ? "text-emerald-400" : topic.accuracy > 60 ? "text-amber-400" : "text-rose-400"
                      )}>{topic.accuracy}%</span>
                    </div>
                  </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Progress</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${topic.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full transform -skew-x-12 animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/learn/${topic.id}?mode=practice`)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50"
                    >
                      <Play className="w-4 h-4" /> Practice
                    </button>
                    <button 
                      onClick={() => router.push(`/learn/${topic.id}?mode=learn`)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border bg-white/5 text-white/60 border-white/5 hover:bg-white/15 hover:text-white"
                    >
                      <BookOpen className="w-4 h-4" /> Learn
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {activeTab === 'Grammar & Vocab' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-8 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-2xl overflow-hidden"
          >
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-emerald-400" /> Daily Vocab Builder
                </h3>
                <p className="text-zinc-400 max-w-md">Learn 10 new high-frequency CAT words today. Consistent vocabulary building improves RC comprehension speed.</p>
              </div>
              <button 
                onClick={() => router.push('/learn/gv1?mode=practice')}
                className="shrink-0 px-8 py-3 rounded-xl font-semibold transition-all bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Start Session
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
