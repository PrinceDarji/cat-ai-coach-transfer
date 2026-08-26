'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Search, Filter, SortDesc, Target, 
  Clock, TrendingUp, ChevronDown, ChevronUp, Play, BookOpen, AlertTriangle, CheckCircle
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

// Mock Types
type TopicStatus = 'not-started' | 'learning' | 'practicing' | 'needs-revision' | 'mastered';

interface Topic {
  id: string;
  name: string;
  category: string;
  status: TopicStatus;
  progress: number; // 0-100
  questionsAttempted: number;
  accuracy: number; // 0-100
  avgTime: number; // in seconds
}

// Mock Data
const MOCK_TOPICS: Topic[] = [
  { id: 'q1', name: 'Percentages', category: 'Arithmetic', status: 'mastered', progress: 100, questionsAttempted: 150, accuracy: 92, avgTime: 85 },
  { id: 'q2', name: 'Profit & Loss', category: 'Arithmetic', status: 'practicing', progress: 75, questionsAttempted: 80, accuracy: 78, avgTime: 110 },
  { id: 'q3', name: 'Time, Speed & Distance', category: 'Arithmetic', status: 'needs-revision', progress: 60, questionsAttempted: 120, accuracy: 55, avgTime: 140 },
  { id: 'q4', name: 'Linear Equations', category: 'Algebra', status: 'mastered', progress: 100, questionsAttempted: 90, accuracy: 88, avgTime: 75 },
  { id: 'q5', name: 'Quadratic Equations', category: 'Algebra', status: 'learning', progress: 40, questionsAttempted: 30, accuracy: 60, avgTime: 130 },
  { id: 'q6', name: 'Logarithms', category: 'Algebra', status: 'not-started', progress: 0, questionsAttempted: 0, accuracy: 0, avgTime: 0 },
  { id: 'q7', name: 'Prime Numbers', category: 'Number System', status: 'practicing', progress: 80, questionsAttempted: 60, accuracy: 82, avgTime: 95 },
  { id: 'q8', name: 'Remainders', category: 'Number System', status: 'needs-revision', progress: 45, questionsAttempted: 100, accuracy: 48, avgTime: 160 },
  { id: 'q9', name: 'Circles', category: 'Geometry', status: 'learning', progress: 30, questionsAttempted: 25, accuracy: 50, avgTime: 150 },
  { id: 'q10', name: 'Triangles', category: 'Geometry', status: 'practicing', progress: 70, questionsAttempted: 110, accuracy: 75, avgTime: 105 },
];

const STATUS_COLORS = {
  'not-started': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  'learning': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'practicing': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'needs-revision': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'mastered': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

import { useStudyStore } from '@/lib/store/study-store';
import { useRouter } from 'next/navigation';

const CHART_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e', '#71717a'];

export default function QuantPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TopicStatus | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Arithmetic': true,
    'Algebra': true,
  });

  const storeTopics = useStudyStore((state: any) => state.topics) || [];
  
  const topics = useMemo(() => {
    const sectionTopics = storeTopics.filter((t: any) => t.section === 'quant');
    if (sectionTopics.length === 0) return MOCK_TOPICS;
    return sectionTopics.map((t: any) => ({
      id: t.id,
      name: t.name,
      category: t.category || 'Arithmetic',
      status: t.status || 'not-started',
      progress: t.progress || 0,
      questionsAttempted: t.questionsAttempted || 0,
      accuracy: t.accuracy || 0,
      avgTime: t.averageTime || 0
    })) as Topic[];
  }, [storeTopics]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(topics.map(t => t.category)));
    return cats;
  }, [topics]);

  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [topics, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const mastered = topics.filter(t => t.status === 'mastered').length;
    const totalQuestions = topics.reduce((acc, t) => acc + (t.questionsAttempted || 0), 0);
    const avgAcc = topics.reduce((acc, t) => acc + ((t.accuracy || 0) * (t.questionsAttempted || 0)), 0) / (totalQuestions || 1);
    const avgTime = topics.reduce((acc, t) => acc + ((t.avgTime || 0) * (t.questionsAttempted || 0)), 0) / (totalQuestions || 1);
    return { mastered, totalQuestions, avgAcc, avgTime };
  }, [topics]);

  const chartData = useMemo(() => {
    const counts = topics.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return [
      { name: 'Mastered', value: counts['mastered'] || 0, color: '#10b981' },
      { name: 'Practicing', value: counts['practicing'] || 0, color: '#3b82f6' },
      { name: 'Learning', value: counts['learning'] || 0, color: '#f59e0b' },
      { name: 'Needs Revision', value: counts['needs-revision'] || 0, color: '#f43f5e' },
      { name: 'Not Started', value: counts['not-started'] || 0, color: '#71717a' },
    ].filter(d => d.value > 0);
  }, [topics]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

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
              <div className="p-3 bg-violet-500/20 rounded-xl border border-violet-500/30">
                <Calculator className="w-8 h-8 text-violet-400" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Quantitative Aptitude
              </h1>
            </div>
            <p className="text-zinc-400 max-w-2xl">
              Master numbers, formulas, and complex problem-solving. Track your progress across all Quant categories.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip {...({} as any)} 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-violet-400">{Math.round(stats.avgAcc)}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">Topics Mastered</span>
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.mastered}</span>
              <span className="text-sm text-zinc-500">/ {topics.length}</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">Overall Accuracy</span>
              <TrendingUp className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.avgAcc.toFixed(1)}%</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">Questions Attempted</span>
              <BookOpen className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.totalQuestions}</span>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-zinc-400 font-medium">Avg Time/Question</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{Math.round(stats.avgTime)}s</span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'mastered', 'practicing', 'learning', 'needs-revision', 'not-started'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all border capitalize",
                  statusFilter === status 
                    ? "bg-violet-500 text-white border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]" 
                    : "bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {status.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Topics */}
        <motion.div className="space-y-6">
          {categories.map((category, catIdx) => {
            const catTopics = filteredTopics.filter(t => t.category === category);
            if (catTopics.length === 0) return null;

            const isExpanded = expandedCategories[category] !== false;
            const catProgress = catTopics.reduce((acc, t) => acc + t.progress, 0) / catTopics.length;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              >
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-white">{category}</h2>
                    <span className="text-sm text-zinc-500 bg-white/5 px-3 py-1 rounded-full">
                      {catTopics.length} topics
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 w-48">
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-500 rounded-full"
                          style={{ width: `${catProgress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-zinc-400">{Math.round(catProgress)}%</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                        {catTopics.map((topic, i) => (
                          <motion.div 
                            key={topic.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-[#13131a] border border-white/5 hover:border-violet-500/30 rounded-xl p-5 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-medium text-white group-hover:text-violet-300 transition-colors">
                                {topic.name}
                              </h3>
                              <span className={cn(
                                "text-xs px-2.5 py-1 rounded-md border font-medium flex items-center gap-1.5 capitalize",
                                STATUS_COLORS[topic.status]
                              )}>
                                {topic.status === 'needs-revision' && <AlertTriangle className="w-3 h-3" />}
                                {topic.status === 'mastered' && <CheckCircle className="w-3 h-3" />}
                                {topic.status.replace('-', ' ')}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                                  <circle 
                                    cx="28" cy="28" r="24" 
                                    stroke="currentColor" 
                                    strokeWidth="4" 
                                    fill="transparent" 
                                    strokeDasharray={2 * Math.PI * 24}
                                    strokeDashoffset={2 * Math.PI * 24 * (1 - topic.progress / 100)}
                                    className="text-violet-500 transition-all duration-1000 ease-out" 
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <span className="absolute text-sm font-bold text-zinc-300">{topic.progress}%</span>
                              </div>
                              <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-1 text-sm">
                                <div className="flex flex-col">
                                  <span className="text-zinc-500 text-xs">Accuracy</span>
                                  <span className={cn(
                                    "font-semibold",
                                    topic.accuracy > 80 ? "text-emerald-400" : topic.accuracy > 60 ? "text-amber-400" : "text-rose-400"
                                  )}>{topic.accuracy}%</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-zinc-500 text-xs">Avg Time</span>
                                  <span className="font-semibold text-zinc-300">{topic.avgTime}s</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => router.push(`/learn/${topic.id}?mode=practice`)}
                                className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white"
                              >
                                <Play className="w-3.5 h-3.5" /> Practice
                              </button>
                              <button 
                                onClick={() => router.push(`/learn/${topic.id}?mode=learn`)}
                                className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all bg-white/5 text-white/60 hover:bg-white/15 hover:text-white"
                              >
                                <BookOpen className="w-3.5 h-3.5" /> Learn
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

