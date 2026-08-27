'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trophy, Target, TrendingUp, Clock, FileText, ChevronDown, ChevronUp, BrainCircuit, Activity, X
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip 
} from 'recharts';
import { useMockStore } from '@/lib/store/mock-store';
import { cn, generateId, formatDate } from '@/lib/utils';
import { useXPStore } from '@/lib/store/xp-store';

const DEMO_MOCKS: any[] = [
  {
    id: 'mock1',
    name: 'SIMCAT 1',
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    overallScore: 65,
    maxScore: 198,
    percentile: 85.5,
    totalAttempted: 35,
    totalCorrect: 25,
    totalTimeSpent: 120,
    aiAnalysis: 'Solid start. Your accuracy in VARC is commendable, but LRDI needs significant work. Focus on selection strategy in LRDI sets to avoid time traps.',
    sections: [
      { section: 'Quant', score: 25, attempted: 12, correct: 9, wrong: 3, timeSpent: 40, accuracy: 75 },
      { section: 'LRDI', score: 10, attempted: 6, correct: 4, wrong: 2, timeSpent: 40, accuracy: 66 },
      { section: 'VARC', score: 30, attempted: 17, correct: 12, wrong: 5, timeSpent: 40, accuracy: 70 }
    ]
  },
  {
    id: 'mock2',
    name: 'AIMCAT 2',
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    overallScore: 78,
    maxScore: 198,
    percentile: 92.1,
    totalAttempted: 42,
    totalCorrect: 31,
    totalTimeSpent: 120,
    aiAnalysis: 'Great improvement in LRDI! Your set selection strategy paid off. However, accuracy dropped slightly in Quant due to calculation errors. Keep practicing mental math.',
    sections: [
      { section: 'Quant', score: 28, attempted: 15, correct: 11, wrong: 4, timeSpent: 40, accuracy: 73 },
      { section: 'LRDI', score: 22, attempted: 9, correct: 8, wrong: 1, timeSpent: 40, accuracy: 88 },
      { section: 'VARC', score: 28, attempted: 18, correct: 12, wrong: 6, timeSpent: 40, accuracy: 66 }
    ]
  },
  {
    id: 'mock3',
    name: 'DashCAT 3',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    overallScore: 92,
    maxScore: 198,
    percentile: 97.8,
    totalAttempted: 48,
    totalCorrect: 36,
    totalTimeSpent: 120,
    aiAnalysis: 'Excellent performance! You have crossed the 95th percentile mark. Your Quant and VARC are exceptionally strong. Ensure you maintain this momentum while pushing LRDI just a bit further.',
    sections: [
      { section: 'Quant', score: 35, attempted: 16, correct: 13, wrong: 3, timeSpent: 40, accuracy: 81 },
      { section: 'LRDI', score: 20, attempted: 8, correct: 7, wrong: 1, timeSpent: 40, accuracy: 87 },
      { section: 'VARC', score: 37, attempted: 24, correct: 16, wrong: 8, timeSpent: 40, accuracy: 66 }
    ]
  }
];

export default function MockAnalysisPage() {
  const store = useMockStore() as any;
  const { mocks, addMock } = store;
  const { addXP } = useXPStore();
  const [isClient, setIsClient] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formState, setFormState] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    overallScore: 0,
    percentile: 0,
    sections: {
      Quant: { score: 0, attempted: 0, correct: 0, timeSpent: 40 },
      LRDI: { score: 0, attempted: 0, correct: 0, timeSpent: 40 },
      VARC: { score: 0, attempted: 0, correct: 0, timeSpent: 40 }
    }
  });

  useEffect(() => {
    setIsClient(true);
    if (useMockStore.getState().mocks.length === 0) {
      useMockStore.setState({ mocks: DEMO_MOCKS });
    }
  }, []);

  const sortedMocks = useMemo(() => {
    return [...mocks].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [mocks]);

  // Helper to safely get section from old (object) or new (array) mock structures
  const getSection = (mock: any, secName: string) => {
    if (!mock.sections) return { score: 0, attempted: 0, correct: 0, wrong: 0, timeSpent: 0 };
    if (Array.isArray(mock.sections)) {
      return mock.sections.find((s: any) => s.section === secName) || { score: 0, attempted: 0, correct: 0, wrong: 0, timeSpent: 0 };
    }
    // Fallback for old object structure
    return mock.sections[secName] || { score: 0, attempted: 0, correct: 0, wrong: 0, timeSpent: 0 };
  };

  const trends = useMemo(() => {
    return [...mocks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(m => ({
      name: m.name,
      score: m.overallScore,
      percentile: m.percentile,
      qScore: getSection(m, 'Quant').score,
      lScore: getSection(m, 'LRDI').score,
      vScore: getSection(m, 'VARC').score,
    }));
  }, [mocks]);

  const stats = useMemo(() => {
    if (mocks.length === 0) return { total: 0, avgScore: 0, avgPercentile: 0, bestPercentile: 0 };
    return {
      total: mocks.length,
      avgScore: Math.round(mocks.reduce((acc: any, m: any) => acc + m.overallScore, 0) / mocks.length),
      avgPercentile: (mocks.reduce((acc: any, m: any) => acc + m.percentile, 0) / mocks.length).toFixed(1),
      bestPercentile: Math.max(...mocks.map((m: any) => m.percentile)).toFixed(1)
    };
  }, [mocks]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qW = formState.sections.Quant.attempted - formState.sections.Quant.correct;
    const lW = formState.sections.LRDI.attempted - formState.sections.LRDI.correct;
    const vW = formState.sections.VARC.attempted - formState.sections.VARC.correct;

    const newMock: any = {
      name: formState.name,
      date: new Date(formState.date).toISOString(),
      overallScore: formState.overallScore,
      maxScore: 198,
      percentile: formState.percentile,
      totalAttempted: formState.sections.Quant.attempted + formState.sections.LRDI.attempted + formState.sections.VARC.attempted,
      totalCorrect: formState.sections.Quant.correct + formState.sections.LRDI.correct + formState.sections.VARC.correct,
      totalTimeSpent: 120,
      aiAnalysis: 'AI generated analysis based on your new mock result. You are showing steady consistency. Focus on reducing negative marks to boost your score further.',
      sections: [
        { section: 'Quant', ...formState.sections.Quant, wrong: qW, accuracy: (formState.sections.Quant.correct / (formState.sections.Quant.attempted || 1)) * 100 },
        { section: 'LRDI', ...formState.sections.LRDI, wrong: lW, accuracy: (formState.sections.LRDI.correct / (formState.sections.LRDI.attempted || 1)) * 100 },
        { section: 'VARC', ...formState.sections.VARC, wrong: vW, accuracy: (formState.sections.VARC.correct / (formState.sections.VARC.attempted || 1)) * 100 }
      ]
    };
    
    addMock(newMock);
    addXP('mock-completion', 'Completed a Mock Test!');
    setIsModalOpen(false);
    setFormState({
      name: '', date: new Date().toISOString().split('T')[0], overallScore: 0, percentile: 0,
      sections: {
        Quant: { score: 0, attempted: 0, correct: 0, timeSpent: 40 },
        LRDI: { score: 0, attempted: 0, correct: 0, timeSpent: 40 },
        VARC: { score: 0, attempted: 0, correct: 0, timeSpent: 40 }
      }
    });
  };

  const handleSectionChange = (section: 'Quant'|'LRDI'|'VARC', field: string, value: number) => {
    setFormState(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: { ...prev.sections[section], [field]: value }
      }
    }));
  };

  if (!isClient) return <div className="min-h-screen p-8 flex justify-center items-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8 bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Mock Analysis</h1>
          <p className="text-white/60 mt-2">Deep dive into your performance and track your growth.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl font-medium shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Mock Result
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Mocks', value: stats.total, icon: FileText, color: 'text-blue-400' },
          { label: 'Average Score', value: stats.avgScore, icon: Target, color: 'text-violet-400' },
          { label: 'Avg Percentile', value: `${stats.avgPercentile}%ile`, icon: Activity, color: 'text-emerald-400' },
          { label: 'Best Percentile', value: `${stats.bestPercentile}%ile`, icon: Trophy, color: 'text-amber-400' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex items-center justify-between group"
          >
            <div>
              <p className="text-white/50 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold mt-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trend Charts */}
      {mocks.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" /> Score Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis {...({} as any)} dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
                  <YAxis {...({} as any)} stroke="#888" tick={{ fontSize: 12 }} />
                  <RechartsTooltip {...({} as any)} contentStyle={{ backgroundColor: '#1a1a24', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" /> Percentile Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis {...({} as any)} dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
                  <YAxis {...({} as any)} domain={[0, 100]} stroke="#888" tick={{ fontSize: 12 }} />
                  <RechartsTooltip {...({} as any)} contentStyle={{ backgroundColor: '#1a1a24', border: 'none', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="percentile" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mock List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mt-8 mb-4">Past Mocks</h2>
        <AnimatePresence>
          {sortedMocks.map((mock) => {
            const isExpanded = expandedId === mock.id;
            const accuracy = Math.round((mock.totalCorrect / mock.totalAttempted) * 100) || 0;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                key={mock.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Collapsed Header */}
                <div className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer gap-4" onClick={() => setExpandedId(isExpanded ? null : mock.id)}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="hidden sm:flex flex-col items-center justify-center p-2 bg-white/5 rounded-lg border border-white/5 w-16 h-16">
                      <span className="text-xs text-white/50">{new Date(mock.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-xl font-bold">{new Date(mock.date).getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{mock.name}</h3>
                      <p className="text-sm text-white/50">{formatDate(mock.date)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-white/50">Score</p>
                      <p className="font-bold text-blue-400">{mock.overallScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/50">Percentile</p>
                      <p className="font-bold text-emerald-400">{mock.percentile}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-white/50">Accuracy</p>
                      <p className="font-bold text-violet-400">{accuracy}%</p>
                    </div>
                    <div className="ml-2">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5 bg-white/[0.02]">
                      <div className="p-6 space-y-8">
                        
                        {/* Sectional Breakdown */}
                        <div>
                          <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">Sectional Analysis</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {['VARC', 'LRDI', 'Quant'].map((sec) => {
                              const s = getSection(mock, sec);
                              const secAcc = Math.round((s.correct / s.attempted) * 100) || 0;
                              return (
                                <div key={sec} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                  <div className="flex justify-between items-center mb-4">
                                    <h5 className="font-semibold">{sec}</h5>
                                    <span className="text-sm font-bold text-white/80">{s.score} pts</span>
                                  </div>
                                  <div className="space-y-2 text-sm text-white/70">
                                    <div className="flex justify-between"><span className="text-white/40">Attempted</span> <span>{s.attempted}</span></div>
                                    <div className="flex justify-between"><span className="text-emerald-400/80">Correct</span> <span className="text-emerald-400">{s.correct}</span></div>
                                    <div className="flex justify-between"><span className="text-rose-400/80">Wrong</span> <span className="text-rose-400">{s.wrong}</span></div>
                                    <div className="flex justify-between pt-2 border-t border-white/5"><span className="text-white/40">Accuracy</span> <span>{secAcc}%</span></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* AI & Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
                              <BrainCircuit className="w-4 h-4 text-violet-400" /> AI Insights
                            </h4>
                            <div className="bg-violet-500/10 border border-violet-500/20 p-5 rounded-xl">
                              <p className="text-violet-200/90 leading-relaxed text-sm">
                                {mock.aiAnalysis}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Question Distribution</h4>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl h-48 flex items-center">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie 
                                    data={[
                                      { name: 'Correct', value: mock.totalCorrect },
                                      { name: 'Wrong', value: mock.totalAttempted - mock.totalCorrect },
                                      { name: 'Skipped', value: 66 - mock.totalAttempted } // assuming 66 questions
                                    ]} 
                                    innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value"
                                  >
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f43f5e" />
                                    <Cell fill="#6b7280" />
                                  </Pie>
                                  <RechartsTooltip {...({} as any)} contentStyle={{ backgroundColor: '#1a1a24', border: 'none', borderRadius: '8px' }} />
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="text-sm space-y-2 ml-4">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Correct</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500" /> Wrong</div>
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-500" /> Skipped</div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Mock Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#111116] z-10">
                <h2 className="text-2xl font-semibold">Add Mock Result</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddSubmit} className="p-6 space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/60">Mock Name</label>
                    <input required type="text" placeholder="e.g., SIMCAT 5" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/60">Date</label>
                    <input required type="date" value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/60">Overall Score</label>
                    <input required type="number" value={formState.overallScore || ''} onChange={e => setFormState({...formState, overallScore: Number(e.target.value)})} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-white/60">Percentile</label>
                    <input required type="number" step="0.01" value={formState.percentile || ''} onChange={e => setFormState({...formState, percentile: Number(e.target.value)})} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <h3 className="font-medium text-white/80 border-b border-white/10 pb-2">Sectional Breakdown</h3>
                  {['VARC', 'LRDI', 'Quant'].map((sec) => (
                    <div key={sec} className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-4 gap-4">
                      <div className="col-span-4 md:col-span-1 flex items-center font-semibold text-lg">{sec}</div>
                      <div className="space-y-1">
                        <label className="text-xs text-white/50">Score</label>
                        <input required type="number" value={formState.sections[sec as 'Quant'|'LRDI'|'VARC'].score || ''} onChange={e => handleSectionChange(sec as 'Quant'|'LRDI'|'VARC', 'score', Number(e.target.value))} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-white/50">Attempted</label>
                        <input required type="number" value={formState.sections[sec as 'Quant'|'LRDI'|'VARC'].attempted || ''} onChange={e => handleSectionChange(sec as 'Quant'|'LRDI'|'VARC', 'attempted', Number(e.target.value))} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-white/50">Correct</label>
                        <input required type="number" value={formState.sections[sec as 'Quant'|'LRDI'|'VARC'].correct || ''} onChange={e => handleSectionChange(sec as 'Quant'|'LRDI'|'VARC', 'correct', Number(e.target.value))} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3 sticky bottom-0 bg-[#111116] pb-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all">
                    Save Mock Result
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
