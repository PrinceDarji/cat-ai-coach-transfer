'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, BookX, Trash2, CheckCircle2, Circle, 
  AlertTriangle, Lightbulb, Calculator, Clock, BrainCircuit, X, ChevronDown, ChevronUp 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useMistakeStore } from '@/lib/store/mistake-store';
import { cn, generateId, formatDate } from '@/lib/utils';
import { useXPStore } from '@/lib/store/xp-store';

const CATEGORY_COLORS = {
  'Conceptual': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'Calculation': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Carelessness': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'Time Pressure': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'
};

const CATEGORY_ICONS = {
  'Conceptual': BrainCircuit,
  'Calculation': Calculator,
  'Carelessness': AlertTriangle,
  'Time Pressure': Clock
};

const DEMO_MISTAKES: any[] = [
  {
    id: 'm1',
    topicId: 'number-systems',
    topicName: 'Number Systems',
    section: 'Quant',
    questionText: 'Find the number of trailing zeroes in 100!',
    studentAnswer: '20',
    correctAnswer: '24',
    category: 'Conceptual',
    aiComment: 'You forgot to count the extra powers of 5 from 25, 50, 75, and 100.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isRepeated: true,
  },
  {
    id: 'm2',
    topicId: 'seating-arrangement',
    topicName: 'Seating Arrangement',
    section: 'LRDI',
    questionText: 'If A sits opposite to B and C is to the immediate right of B...',
    studentAnswer: 'C sits opposite to D',
    correctAnswer: 'C sits opposite to E',
    category: 'Carelessness',
    aiComment: 'You misread "immediate right" as "immediate left" in the second condition.',
    status: 'Revised',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isRepeated: false,
  },
  {
    id: 'm3',
    topicId: 'reading-comprehension',
    topicName: 'Reading Comprehension',
    section: 'VARC',
    questionText: 'What is the primary purpose of the author in the third paragraph?',
    studentAnswer: 'To criticize the modern education system',
    correctAnswer: 'To illustrate the historical context of the problem',
    category: 'Time Pressure',
    aiComment: 'You rushed through the paragraph. The criticism only appears in the conclusion, not paragraph 3.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    isRepeated: false,
  },
  {
    id: 'm4',
    topicId: 'time-speed-distance',
    topicName: 'Time Speed Distance',
    section: 'Quant',
    questionText: 'A train crosses a pole in 10s and a 200m platform in 20s. Find speed.',
    studentAnswer: '15 m/s',
    correctAnswer: '20 m/s',
    category: 'Calculation',
    aiComment: 'Calculation error: 200 / (20 - 10) = 20 m/s. You wrote 15.',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    isRepeated: false,
  },
  {
    id: 'm5',
    topicId: 'geometry',
    topicName: 'Geometry',
    section: 'Quant',
    questionText: 'In triangle ABC, AB=5, BC=12, AC=13. Find the inradius.',
    studentAnswer: '3',
    correctAnswer: '2',
    category: 'Conceptual',
    aiComment: 'For right triangles, inradius = (a+b-c)/2 = (5+12-13)/2 = 2.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    isRepeated: true,
  }
];

export default function MistakeBookPage() {
  const store = useMistakeStore() as any;
  const { mistakes, addMistake, updateMistake, deleteMistake } = store;
  const { addXP } = useXPStore();
  
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSection, setFilterSection] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formState, setFormState] = useState({
    topicId: '',
    topicName: '',
    section: 'Quant',
    questionText: '',
    studentAnswer: '',
    correctAnswer: '',
    category: 'Conceptual' as any
  });

  useEffect(() => {
    setIsClient(true);
    // Initialize demo data if empty
    if (useMistakeStore.getState().mistakes.length === 0) {
      useMistakeStore.setState({ mistakes: DEMO_MISTAKES });
    }
  }, []);

  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m: any) => {
      const matchSearch = (m.topicName || m.topicId || '').toLowerCase().includes(search.toLowerCase()) || 
                          m.questionText.toLowerCase().includes(search.toLowerCase());
      const matchSection = filterSection === 'All' || m.section === filterSection;
      const matchCategory = filterCategory === 'All' || m.category === filterCategory;
      const matchStatus = filterStatus === 'All' || m.status === filterStatus;
      return matchSearch && matchSection && matchCategory && matchStatus;
    }).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [mistakes, search, filterSection, filterCategory, filterStatus]);

  const stats = useMemo(() => {
    const total = mistakes.length;
    const repeated = mistakes.filter((m: any) => m.isRepeated).length;
    
    const catCounts = mistakes.reduce((acc: Record<string, number>, m: any) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostCommonCat = (Object.entries(catCounts) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const topicCounts = mistakes.reduce((acc: Record<string, number>, m: any) => {
      const name = m.topicName || m.topicId;
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostErrorProne = (Object.entries(topicCounts) as [string, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const pieData = Object.entries(catCounts).map(([name, value]) => ({ name, value }));
    const barData = (Object.entries(topicCounts) as [string, number][]).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));

    return { total, repeated, mostCommonCat, mostErrorProne, pieData, barData };
  }, [mistakes]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMistake: any = {
      id: generateId(),
      ...formState,
      aiComment: 'AI generated: You need to review this concept carefully. Practice 5 similar questions.',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      isRepeated: false // simplified logic
    };
    addMistake(newMistake);
    addXP('revision', 'Logged a new mistake');
    setIsModalOpen(false);
    setFormState({ topicId: '', topicName: '', section: 'Quant', questionText: '', studentAnswer: '', correctAnswer: '', category: 'Conceptual' as any });
  };

  if (!isClient) return <div className="min-h-screen p-8 flex justify-center items-center"><div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8 bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">Mistake Book</h1>
          <p className="text-white/60 mt-2">Track, analyze, and eliminate your recurring errors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 transition-colors rounded-xl font-medium shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Mistake
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Mistakes', value: stats.total, icon: BookX, color: 'text-rose-400' },
          { label: 'Repeated Errors', value: stats.repeated, icon: AlertTriangle, color: 'text-amber-400' },
          { label: 'Common Category', value: stats.mostCommonCat, icon: BrainCircuit, color: 'text-violet-400' },
          { label: 'Error-Prone Topic', value: stats.mostErrorProne, icon: Filter, color: 'text-cyan-400' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all"
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

      {/* Charts & Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">By Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'Conceptual' ? '#8b5cf6' : 
                      entry.name === 'Calculation' ? '#fbbf24' : 
                      entry.name === 'Carelessness' ? '#fb7185' : '#22d3ee'
                    } />
                  ))}
                </Pie>
                <RechartsTooltip {...({} as any)} contentStyle={{ backgroundColor: '#1a1a24', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Top Error-Prone Topics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="#333" horizontal={false} />
                <XAxis {...({} as any)} type="number" stroke="#888" />
                <YAxis {...({} as any)} dataKey="name" type="category" width={100} stroke="#888" tick={{ fill: '#888', fontSize: 12 }} />
                <RechartsTooltip {...({} as any)} contentStyle={{ backgroundColor: '#1a1a24', border: 'none', borderRadius: '8px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search mistakes..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <select value={filterSection} onChange={e => setFilterSection(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-violet-500">
          <option value="All">All Sections</option>
          <option value="Quant">Quant</option>
          <option value="LRDI">LRDI</option>
          <option value="VARC">VARC</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-violet-500">
          <option value="All">All Categories</option>
          <option value="Conceptual">Conceptual</option>
          <option value="Calculation">Calculation</option>
          <option value="Carelessness">Carelessness</option>
          <option value="Time Pressure">Time Pressure</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-violet-500">
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Revised">Revised</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Mistake List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredMistakes.map((mistake) => {
            const isExpanded = expandedId === mistake.id;
            const CatIcon = CATEGORY_ICONS[mistake.category as keyof typeof CATEGORY_ICONS] || Lightbulb;
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={mistake.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* Collapsed Header */}
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : mistake.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="hidden sm:flex flex-col items-center justify-center p-2 bg-white/5 rounded-lg border border-white/5 w-16 h-16">
                      <span className="text-xs text-white/50">{new Date(mistake.createdAt).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-xl font-bold">{new Date(mistake.createdAt).getDate()}</span>
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{mistake.topicName || mistake.topicId}</h3>
                        {mistake.isRepeated && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20">
                            Repeated
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-white/60">{mistake.section}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20"></span>
                        <span className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border", CATEGORY_COLORS[mistake.category as keyof typeof CATEGORY_COLORS])}>
                          <CatIcon className="w-3 h-3" />
                          {mistake.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-white/60">
                      {mistake.status === 'Pending' && <Circle className="w-4 h-4 text-rose-400" />}
                      {mistake.status === 'Revised' && <Clock className="w-4 h-4 text-amber-400" />}
                      {mistake.status === 'Resolved' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {mistake.status}
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-white/[0.02]"
                    >
                      <div className="p-5 space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Question</h4>
                          <p className="bg-white/5 p-4 rounded-lg font-medium">{mistake.questionText}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Your Answer</h4>
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-lg">
                              {mistake.studentAnswer}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Correct Answer</h4>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 p-4 rounded-lg">
                              {mistake.correctAnswer}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-violet-400" />
                            AI Analysis
                          </h4>
                          <p className="text-violet-200 italic bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
                            {mistake.aiComment}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex gap-2">
                            {mistake.status !== 'Revised' && (
                              <button 
                                onClick={() => updateMistake(mistake.id, { status: 'Revised' })}
                                className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-amber-400"
                              >
                                Mark Revised
                              </button>
                            )}
                            {mistake.status !== 'Resolved' && (
                              <button 
                                onClick={() => updateMistake(mistake.id, { status: 'Resolved' })}
                                className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-emerald-400"
                              >
                                Mark Resolved
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={() => deleteMistake(mistake.id)}
                            className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredMistakes.length === 0 && (
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
            <BookX className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium">No mistakes found</h3>
            <p className="text-white/50 mt-1">Great job! Or maybe you just haven't added any yet.</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Log a Mistake</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Section</label>
                    <select 
                      value={formState.section}
                      onChange={e => setFormState({...formState, section: e.target.value})}
                      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-violet-500"
                    >
                      <option value="Quant">Quant</option>
                      <option value="LRDI">LRDI</option>
                      <option value="VARC">VARC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Topic ID</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., number-systems"
                      value={formState.topicId}
                      onChange={e => setFormState({...formState, topicId: e.target.value})}
                      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Topic Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Number Systems"
                      value={formState.topicName}
                      onChange={e => setFormState({...formState, topicName: e.target.value})}
                      className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Question Text</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Enter the question..."
                    value={formState.questionText}
                    onChange={e => setFormState({...formState, questionText: e.target.value})}
                    className="w-full bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Your Answer</label>
                    <input 
                      required
                      type="text" 
                      value={formState.studentAnswer}
                      onChange={e => setFormState({...formState, studentAnswer: e.target.value})}
                      className="w-full bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-sm text-rose-200 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Correct Answer</label>
                    <input 
                      required
                      type="text" 
                      value={formState.correctAnswer}
                      onChange={e => setFormState({...formState, correctAnswer: e.target.value})}
                      className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-sm text-emerald-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/60">Mistake Category</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(CATEGORY_COLORS).map((cat) => (
                      <div 
                        key={cat}
                        onClick={() => setFormState({...formState, category: cat as any})}
                        className={cn(
                          "cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-all",
                          formState.category === cat ? CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS] : "border-white/10 bg-[#1a1a24] text-white/60 hover:bg-white/5"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          formState.category === cat ? "border-current" : "border-white/20"
                        )}>
                          {formState.category === cat && <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <span className="text-sm font-medium">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl font-medium bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20 transition-all">
                    Save Mistake
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
