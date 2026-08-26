'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend
} from 'recharts';
import {
  TrendingUp, Clock, Target, AlertTriangle, BookOpen, 
  Brain, BarChart3, Activity, Award, ArrowUpRight, ArrowDownRight,
  Flame, CheckCircle2
} from 'lucide-react';
import { useStudyStore } from '@/lib/store/study-store';
import { useXPStore } from '@/lib/store/xp-store';

// --- Demo Data Generation ---
const generateDemoAnalyticsData = () => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const studyTimeData = dates.map((date, i) => {
    const base = 1.5;
    const trend = (i / 30) * 2;
    const noise = (Math.random() * 1.5) - 0.5;
    return {
      date,
      hours: Number(Math.max(0, base + trend + noise).toFixed(1)),
    };
  });

  const accuracyData = dates.map((date, i) => {
    return {
      date,
      Quant: Math.floor(Math.min(100, Math.max(0, 45 + (i * 1.2) + (Math.random() * 10 - 5)))),
      LRDI: Math.floor(Math.min(100, Math.max(0, 50 + (i * 0.8) + (Math.random() * 8 - 4)))),
      VARC: Math.floor(Math.min(100, Math.max(0, 55 + (i * 0.5) + (Math.random() * 12 - 6)))),
    };
  });

  const questionsSolvedData = dates.map((date) => {
    return {
      date,
      Quant: Math.floor(Math.random() * 15) + 5,
      LRDI: Math.floor(Math.random() * 10) + 3,
      VARC: Math.floor(Math.random() * 12) + 4,
    };
  });

  const mockTrendsData = Array.from({ length: 8 }, (_, i) => {
    return {
      name: `Mock ${i + 1}`,
      score: 40 + (i * 5) + Math.floor(Math.random() * 10 - 5),
      percentile: 60 + (i * 4) + Math.floor(Math.random() * 5 - 2.5),
    };
  });

  const mistakeDistribution = [
    { name: 'Conceptual', value: 35, color: '#8b5cf6' },
    { name: 'Calculation', value: 25, color: '#f59e0b' },
    { name: 'Carelessness', value: 20, color: '#ef4444' },
    { name: 'Time Pressure', value: 20, color: '#06b6d4' },
  ];

  const radarData = [
    { subject: 'Accuracy', Quant: 85, LRDI: 75, VARC: 70, fullMark: 100 },
    { subject: 'Speed', Quant: 65, LRDI: 80, VARC: 60, fullMark: 100 },
    { subject: 'Consistency', Quant: 90, LRDI: 70, VARC: 85, fullMark: 100 },
    { subject: 'Coverage', Quant: 75, LRDI: 85, VARC: 95, fullMark: 100 },
    { subject: 'Mock Perf.', Quant: 80, LRDI: 75, VARC: 80, fullMark: 100 },
  ];

  const weakTopics = [
    { name: 'Number Systems', section: 'Quant', accuracy: 32, trend: 'down', rec: 'Revise prime factors and remainders.' },
    { name: 'Arrangements', section: 'LRDI', accuracy: 45, trend: 'up', rec: 'Practice more circular arrangement sets.' },
    { name: 'Para Jumbles', section: 'VARC', accuracy: 48, trend: 'down', rec: 'Focus on finding mandatory pairs.' },
    { name: 'Geometry', section: 'Quant', accuracy: 51, trend: 'up', rec: 'Memorize circle theorems and properties.' },
    { name: 'Games & Tournaments', section: 'LRDI', accuracy: 55, trend: 'flat', rec: 'Review knockout tournament concepts.' },
  ];

  const sections = ['Quant', 'LRDI', 'VARC'];
  const masteryLevels = ['not-started', 'learning', 'practicing', 'needs-revision', 'mastered'];
  
  const heatmapData = sections.map(section => {
    return {
      section,
      topics: Array.from({ length: 24 }, (_, i) => ({
        id: `${section}-${i}`,
        name: `${section} Topic ${i + 1}`,
        status: masteryLevels[Math.floor(Math.random() * masteryLevels.length)],
        masteryScore: Math.floor(Math.random() * 100)
      }))
    }
  });

  return {
    studyTimeData,
    accuracyData,
    questionsSolvedData,
    mockTrendsData,
    mistakeDistribution,
    radarData,
    weakTopics,
    heatmapData
  };
};

// --- Custom Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a24]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl shadow-black/50">
        <p className="text-white/60 text-sm mb-2 font-medium">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <p className="text-white font-medium text-sm">
                <span className="text-white/80 mr-2">{entry.name}:</span>
                {entry.value}
                {entry.name.includes('Percentile') || entry.name.includes('Accuracy') || ['Quant', 'LRDI', 'VARC'].includes(entry.name) && entry.value <= 100 ? '%' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

// --- Main Page Component ---

export default function AnalyticsPage() {
  const [isClient, setIsClient] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [sectionFilter, setSectionFilter] = useState('All');

  const data = useMemo(() => generateDemoAnalyticsData(), []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Theme colors
  const colors = {
    violet: '#8b5cf6',
    blue: '#3b82f6',
    cyan: '#06b6d4',
    emerald: '#10b981',
    amber: '#f59e0b',
    red: '#ef4444',
    Quant: '#8b5cf6',
    LRDI: '#3b82f6',
    VARC: '#10b981'
  };

  const getMasteryColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-white/5 border-white/5';
      case 'learning': return 'bg-violet-500/20 border-violet-500/30 text-violet-400';
      case 'practicing': return 'bg-blue-500/30 border-blue-500/40 text-blue-400';
      case 'needs-revision': return 'bg-amber-500/30 border-amber-500/40 text-amber-400';
      case 'mastered': return 'bg-emerald-500/30 border-emerald-500/40 text-emerald-400';
      default: return 'bg-white/5';
    }
  };

  if (!isClient) {
    return <div className="min-h-screen p-8 flex justify-center items-center"><div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8 lg:p-10 font-sans selection:bg-violet-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400">
              Analytics
            </h1>
            <p className="text-white/60 mt-1">Detailed insights into your CAT preparation journey.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-lg">
              {['7d', '30d', '90d', 'All'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    dateRange === range 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {range === 'All' ? 'All Time' : `Last ${range}`}
                </button>
              ))}
            </div>
            
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-lg">
              {['All', 'Quant', 'LRDI', 'VARC'].map((section) => (
                <button
                  key={section}
                  onClick={() => setSectionFilter(section)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    sectionFilter === section 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 font-medium text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-400" />
                Level Progress
              </h3>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">{Math.round(useXPStore((state) => state.getLevel().progress))}</span>
              <span className="text-white/40 mb-1">%</span>
            </div>
            <div className="mt-4 h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(useXPStore((state) => state.getLevel().progress))}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
              />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 font-medium text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Total Study Time
              </h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{useStudyStore((state) => state.getTotalHoursStudied())}</span>
              <span className="text-white/60 mb-1 font-medium">hrs</span>
            </div>
            <p className="text-sm text-white/40 mt-3">Keep it up!</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 font-medium text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Current Streak
              </h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{useXPStore((state) => state.streak)}</span>
              <span className="text-white/60 mb-1 font-medium">days</span>
            </div>
            <p className="text-sm text-white/40 mt-3">Personal best: {useXPStore((state) => state.longestStreak)} days</p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 font-medium text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Overall Accuracy
              </h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{useStudyStore((state) => state.getOverallAccuracy())}%</span>
            </div>
            <p className="text-sm text-white/40 mt-3">Across all sections</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Time Chart */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-violet-400" />
                Study Activity
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.studyTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.violet} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={colors.violet} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis {...({} as any)} dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} />
                  <YAxis {...({} as any)} stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  <Tooltip {...({} as any)} content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    name="Hours Studied"
                    stroke={colors.violet} 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorHours)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Mistake Distribution */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-400" />
                Mistake Analysis
              </h3>
            </div>
            <div className="h-[240px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.mistakeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.mistakeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...({} as any)} content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">412</span>
                <span className="text-xs text-white/50 font-medium">Mistakes</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {data.mistakeDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-white/70">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accuracy Trends */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Accuracy Trends
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis {...({} as any)} dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} />
                  <YAxis {...({} as any)} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  <Tooltip {...({} as any)} content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Quant" stroke={colors.Quant} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="LRDI" stroke={colors.LRDI} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="VARC" stroke={colors.VARC} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Section Comparison Radar */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Skill Dimensions
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis {...({} as any)} dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <PolarRadiusAxis {...({} as any)} angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Quant" dataKey="Quant" stroke={colors.Quant} fill={colors.Quant} fillOpacity={0.2} />
                  <Radar name="LRDI" dataKey="LRDI" stroke={colors.LRDI} fill={colors.LRDI} fillOpacity={0.2} />
                  <Radar name="VARC" dataKey="VARC" stroke={colors.VARC} fill={colors.VARC} fillOpacity={0.2} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '14px' }} />
                  <Tooltip {...({} as any)} content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Mock Trends & Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                Mock Exam Performance
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.mockTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis {...({} as any)} dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} />
                  
                  {/* Dual Y-Axis */}
                  <YAxis {...({} as any)} yAxisId="left" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis {...({} as any)} yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                  
                  <Tooltip {...({} as any)} content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                  
                  <Line yAxisId="left" type="monotone" name="Score" dataKey="score" stroke={colors.emerald} strokeWidth={3} dot={{ r: 4, fill: '#0a0a0f', strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                  <Line yAxisId="right" type="monotone" name="Percentile" dataKey="percentile" stroke={colors.cyan} strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#0a0a0f', strokeWidth: 2 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Focus Areas
              </h3>
            </div>
            <div className="space-y-4">
              {data.weakTopics.map((topic, i) => (
                <div key={i} className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{topic.name}</h4>
                      <span className="text-xs text-white/40">{topic.section}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-white">{topic.accuracy}%</span>
                      {topic.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                      ) : topic.trend === 'down' ? (
                        <ArrowDownRight className="w-3 h-3 text-red-400" />
                      ) : (
                        <span className="text-white/40 text-[10px]">-</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {topic.rec}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Topic Mastery Heatmap */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" />
              Topic Mastery
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-white/10"></div><span className="text-white/50">Unstarted</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-violet-500/40"></div><span className="text-white/50">Learning</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500/50"></div><span className="text-white/50">Practicing</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500/50"></div><span className="text-white/50">Review</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50"></div><span className="text-white/50">Mastered</span></div>
            </div>
          </div>
          
          <div className="space-y-6">
            {data.heatmapData.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-medium text-white/60 mb-3">{section.section}</h4>
                <div className="flex flex-wrap gap-2">
                  {section.topics.map((topic, i) => (
                    <div 
                      key={topic.id}
                      className={`group relative flex items-center justify-center h-8 px-3 rounded-md border text-xs cursor-pointer transition-all hover:scale-105 ${getMasteryColor(topic.status)}`}
                    >
                      <span>T{i+1}</span>
                      
                      {/* Custom tooltip on hover for heatmap */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-slate-800 border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <p className="text-white font-medium text-sm mb-1">{topic.name}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/60 capitalize">{topic.status.replace('-', ' ')}</span>
                          <span className="text-white font-bold">{topic.masteryScore}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Questions Solved Stacked Bar */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Daily Practice Volume
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.questionsSolvedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis {...({} as any)} dataKey="date" stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} />
                <YAxis {...({} as any)} stroke="rgba(255,255,255,0.2)" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
                <Tooltip {...({} as any)} content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                <Bar dataKey="Quant" stackId="a" fill={colors.Quant} radius={[0, 0, 4, 4]} />
                <Bar dataKey="LRDI" stackId="a" fill={colors.LRDI} />
                <Bar dataKey="VARC" stackId="a" fill={colors.VARC} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
}
