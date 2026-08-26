'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, Search, Filter, Target, Clock, TrendingUp, ChevronDown, ChevronUp, Play, Crosshair, AlertTriangle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock Types
type TopicStatus = 'not-started' | 'learning' | 'practicing' | 'needs-revision' | 'mastered';

interface LrdiTopic {
  id: string;
  name: string;
  category: string;
  status: TopicStatus;
  progress: number;
  setsAttempted: number;
  accuracy: number;
  avgTime: number; // in seconds
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Mock Data
const MOCK_TOPICS: LrdiTopic[] = [
  { id: 'l1', name: 'Linear Arrangements', category: 'Logical Reasoning', status: 'mastered', progress: 100, setsAttempted: 25, accuracy: 88, avgTime: 420, difficulty: 'Easy' },
  { id: 'l2', name: 'Circular Arrangements', category: 'Logical Reasoning', status: 'practicing', progress: 70, setsAttempted: 18, accuracy: 72, avgTime: 510, difficulty: 'Medium' },
  { id: 'l3', name: 'Blood Relations', category: 'Logical Reasoning', status: 'mastered', progress: 95, setsAttempted: 30, accuracy: 92, avgTime: 360, difficulty: 'Easy' },
  { id: 'l4', name: 'Syllogisms', category: 'Logical Reasoning', status: 'needs-revision', progress: 50, setsAttempted: 15, accuracy: 55, avgTime: 480, difficulty: 'Medium' },
  { id: 'd1', name: 'Tables & Caselets', category: 'Data Interpretation', status: 'learning', progress: 40, setsAttempted: 10, accuracy: 65, avgTime: 600, difficulty: 'Medium' },
  { id: 'd2', name: 'Bar Graphs & Pie Charts', category: 'Data Interpretation', status: 'practicing', progress: 85, setsAttempted: 22, accuracy: 80, avgTime: 450, difficulty: 'Easy' },
  { id: 'd3', name: 'Venn Diagrams', category: 'Data Interpretation', status: 'needs-revision', progress: 45, setsAttempted: 12, accuracy: 48, avgTime: 720, difficulty: 'Hard' },
  { id: 'm1', name: 'Games & Tournaments', category: 'Advanced LRDI', status: 'learning', progress: 30, setsAttempted: 8, accuracy: 45, avgTime: 840, difficulty: 'Hard' },
  { id: 'm2', name: 'Routes & Networks', category: 'Advanced LRDI', status: 'not-started', progress: 0, setsAttempted: 0, accuracy: 0, avgTime: 0, difficulty: 'Hard' },
];

const STATUS_COLORS = {
  'not-started': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  'learning': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'practicing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'needs-revision': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'mastered': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const DIFFICULTY_COLORS = {
  'Easy': 'text-emerald-400 bg-emerald-500/10',
  'Medium': 'text-amber-400 bg-amber-500/10',
  'Hard': 'text-rose-400 bg-rose-500/10',
};

import { useStudyStore } from '@/lib/store/study-store';

export default function LrdiPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all'>('all');
  
  const storeTopics = useStudyStore((state: any) => state.topics) || [];
  
  const topics = useMemo(() => {
    const sectionTopics = storeTopics.filter((t: any) => t.section === 'lrdi');
    if (sectionTopics.length === 0) return MOCK_TOPICS;
    return sectionTopics.map((t: any) => ({
      id: t.id,
      name: t.name,
      category: t.category || 'Logical Reasoning',
      status: t.status || 'not-started',
      progress: t.progress || 0,
      setsAttempted: t.questionsAttempted || 0,
      accuracy: t.accuracy || 0,
      avgTime: t.averageTime || 0,
      difficulty: 'Medium'
    })) as LrdiTopic[];
  }, [storeTopics]);

  const categories = useMemo(() => Array.from(new Set(topics.map(t => t.category))), [topics]);

  const filteredTopics = useMemo(() => {
    return topics.filter(t => statusFilter === 'all' || t.status === statusFilter);
  }, [topics, statusFilter]);

  const stats = useMemo(() => {
    const totalSets = topics.reduce((acc, t) => acc + t.setsAttempted, 0);
    const avgAcc = totalSets ? topics.reduce((acc, t) => acc + (t.accuracy * t.setsAttempted), 0) / totalSets : 0;
    const avgTime = totalSets ? topics.reduce((acc, t) => acc + (t.avgTime * t.setsAttempted), 0) / totalSets : 0;
    return { totalSets, avgAcc, avgTime };
  }, [topics]);

  // Data for radar chart (weaknesses)
  const radarData = useMemo(() => {
    return topics
      .filter(t => t.setsAttempted > 0)
      .map(t => ({
        subject: t.name,
        accuracy: t.accuracy,
        fullMark: 100,
      }))
      .slice(0, 6); // max 6 points for clear radar
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
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                LR & Data Interpretation
              </h1>
            </div>
            <p className="text-zinc-400 max-w-2xl">
              Decode complex data sets and logical puzzles. Identify your weak spots with the performance radar.
            </p>
          </div>
        </motion.div>

        {/* Top Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Sets Solved</span>
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-4xl font-bold text-white">{stats.totalSets}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Average Accuracy</span>
                <Crosshair className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-4xl font-bold text-white">{stats.avgAcc.toFixed(1)}%</div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Avg Time/Set</span>
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-4xl font-bold text-white">{Math.floor(stats.avgTime / 60)}m {Math.round(stats.avgTime % 60)}s</div>
            </div>
          </motion.div>

          {/* Weakness Radar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-6 left-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" /> Performance Radar
              </h3>
              <p className="text-sm text-zinc-400 mt-1">Accuracy across attempted topics</p>
            </div>
            <div className="h-64 w-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis {...({} as any)} dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                  <PolarRadiusAxis {...({} as any)} angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Accuracy"
                    dataKey="accuracy"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.3}
                  />
                  <RechartsTooltip {...({} as any)} 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['all', 'mastered', 'practicing', 'learning', 'needs-revision', 'not-started'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all border capitalize",
                statusFilter === status 
                  ? "bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                  : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Topic Categories */}
        <div className="space-y-8">
          {categories.map((category, catIdx) => {
            const catTopics = filteredTopics.filter(t => t.category === category);
            if (catTopics.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTopics.map((topic, i) => (
                    <motion.div 
                      key={topic.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group bg-[#13131a] border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] rounded-2xl transition-all duration-300 flex flex-col overflow-hidden"
                    >
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {topic.name}
                          </h3>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-md font-semibold shrink-0",
                            DIFFICULTY_COLORS[topic.difficulty]
                          )}>
                            {topic.difficulty}
                          </span>
                        </div>

                        <div className="mb-4">
                          <span className={cn(
                            "text-xs px-2.5 py-1 rounded-md border font-medium inline-block capitalize",
                            STATUS_COLORS[topic.status]
                          )}>
                            {topic.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="mt-auto space-y-4">
                          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                            <div className="text-center">
                              <div className="text-zinc-500 text-xs mb-1">Sets</div>
                              <div className="font-semibold text-zinc-200">{topic.setsAttempted}</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                              <div className="text-zinc-500 text-xs mb-1">Accuracy</div>
                              <div className={cn(
                                "font-semibold",
                                topic.accuracy > 80 ? "text-emerald-400" : topic.accuracy > 60 ? "text-amber-400" : "text-rose-400"
                              )}>{topic.accuracy}%</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                              <div className="text-zinc-500 text-xs mb-1">Time</div>
                              <div className="font-semibold text-zinc-200">{Math.floor(topic.avgTime/60)}m</div>
                            </div>
                          </div>

                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                              style={{ width: `${topic.progress}%` }}
                            />
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/learn/${topic.id}?mode=practice`)}
                              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border bg-white/5 hover:bg-cyan-600/90 text-white border-white/5 hover:border-cyan-500"
                            >
                              <Play className="w-4 h-4" /> Practice
                            </button>
                            <button 
                              onClick={() => router.push(`/learn/${topic.id}?mode=learn`)}
                              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all border bg-white/5 text-white/60 border-white/5 hover:bg-white/15 hover:text-white"
                            >
                              <Crosshair className="w-4 h-4" /> Learn
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
