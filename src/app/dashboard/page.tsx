'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import {
  Flame,
  Target,
  Clock,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Calendar,
  ChevronRight,
  RefreshCw,
  MoreVertical,
} from 'lucide-react';

import { useUserStore } from '@/lib/store/user-store';
import { useStudyStore } from '@/lib/store/study-store';
import { useXPStore } from '@/lib/store/xp-store';

import { cn, getGreeting, calculateDaysUntilCAT } from '@/lib/utils';
// import { CAT_TOPICS } from '@/lib/constants'; // not needed for now

// Using standard random quote as utility fallback or custom object
const getMotivationalQuote = () => ({ text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" });


// Mock performance data
const performanceData = [
  { day: 'Mon', accuracy: 65, questions: 40 },
  { day: 'Tue', accuracy: 68, questions: 45 },
  { day: 'Wed', accuracy: 74, questions: 50 },
  { day: 'Thu', accuracy: 72, questions: 42 },
  { day: 'Fri', accuracy: 79, questions: 55 },
  { day: 'Sat', accuracy: 82, questions: 60 },
  { day: 'Sun', accuracy: 85, questions: 65 },
];

const topicMasteryData = {
  quant: [ { name: 'Quant', value: 68, fill: '#8b5cf6' } ],
  lrdi: [ { name: 'LRDI', value: 45, fill: '#06b6d4' } ],
  varc: [ { name: 'VARC', value: 82, fill: '#10b981' } ],
};

const tasks = [
  { id: 1, title: 'Number Systems Basics', type: 'learn', time: '45m', difficulty: 'easy', completed: true },
  { id: 2, title: 'Solve 20 Quant Questions', type: 'practice', time: '1h', difficulty: 'medium', completed: false },
  { id: 3, title: 'RC Passage Analysis', type: 'practice', time: '30m', difficulty: 'hard', completed: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState(getMotivationalQuote());

  const { profile, isOnboarded } = useUserStore();
  const { streak, getLevel } = useXPStore();
  
  const { level, currentXP, nextLevelXP } = getLevel();

  useEffect(() => {
    setMounted(true);
    if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [isOnboarded, router]);

  if (!mounted || !isOnboarded) return null;

  const daysLeft = profile?.catExamDate ? calculateDaysUntilCAT(profile.catExamDate) : 145;
  const urgencyColor = daysLeft > 100 ? 'text-emerald-400' : daysLeft > 30 ? 'text-amber-400' : 'text-rose-400';

  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8 overflow-x-hidden font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
              {getGreeting()}
            </h1>
            <p className="text-white/60 mt-1">Here's your progress overview for today.</p>
          </div>
          <button 
            onClick={() => router.push('/planner')}
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 w-fit"
          >
            <Zap className="w-4 h-4 text-violet-400" />
            <span>Generate Today's Plan</span>
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Hero Stats */}
          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-violet-500/20 rounded-xl">
                <Award className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/70">Lvl {level}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">Level {level}</h3>
            <p className="text-sm text-white/50 mb-4">Current Level</p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${Math.min(100, (currentXP / nextLevelXP) * 100)}%` }} />
            </div>
            <p className="text-xs text-white/50 mt-2 text-right">{currentXP} / {nextLevelXP} XP</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/70">Personal Best: 14</span>
            </div>
            <h3 className="text-3xl font-bold text-white flex items-baseline gap-1">
              {streak} <span className="text-lg font-medium text-white/50">days</span>
            </h3>
            <p className="text-sm text-white/50">Study Streak</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Calendar className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <h3 className={cn("text-3xl font-bold mb-1", urgencyColor)}>{daysLeft}</h3>
            <p className="text-sm text-white/50">Days Until CAT</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">Top 5%</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{profile?.targetPercentile || 95.4}</h3>
            <p className="text-sm text-white/50">Est. Percentile</p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Tasks & Goals */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-1 space-y-6 md:space-y-8"
          >
            {/* Today's Tasks */}
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-violet-400" />
                  Today's Plan
                </h3>
                <span className="text-sm font-medium text-white/60">{Math.round(taskProgress)}% Done</span>
              </div>
              
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-colors border",
                    task.completed ? "bg-white/5 border-transparent opacity-60" : "bg-white/10 border-white/5 hover:border-white/10"
                  )}>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                      task.completed ? "border-emerald-400 bg-emerald-400/20" : "border-white/20"
                    )}>
                      {task.completed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium truncate transition-all", task.completed && "line-through text-white/50")}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-white/40">{task.type}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs text-white/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => router.push('/planner')}
                className="w-full mt-4 py-3 rounded-xl bg-violet-500/10 text-violet-400 font-medium text-sm hover:bg-violet-500/20 transition-colors flex items-center justify-center gap-2"
              >
                View Full Planner <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Weekly Goal Progress */}
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Weekly Goal</h3>
              <p className="text-sm text-white/60 mb-5">You're on track! Keep pushing.</p>
              
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold text-white">18.5<span className="text-sm text-white/50 font-normal">h</span></span>
                <span className="text-sm font-medium text-white/50">25h Target</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[74%]" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Charts & Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-6 md:space-y-8"
          >
            {/* Performance Chart */}
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl h-[400px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Performance Trend
                  </h3>
                  <p className="text-sm text-white/50 mt-1">Accuracy vs Questions Solved (Last 7 Days)</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/70">Demo Data</span>
              </div>
              
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid {...({} as any)} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis {...({} as any)} dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis {...({} as any)} yAxisId="left" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis {...({} as any)} yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip {...({} as any)} 
                      contentStyle={{ backgroundColor: 'rgba(10,10,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#0a0a0f' }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="questions" name="Questions" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#0a0a0f' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Topic Mastery Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Quant', value: 68, color: '#8b5cf6', mastered: '14/22' },
                { title: 'LRDI', value: 45, color: '#06b6d4', mastered: '8/18' },
                { title: 'VARC', value: 82, color: '#10b981', mastered: '18/20' }
              ].map((topic, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col items-center relative overflow-hidden">
                   <h4 className="text-sm font-medium text-white/70 mb-4 w-full text-left">{topic.title} Mastery</h4>
                   <div className="w-24 h-24 relative mb-4">
                     <ResponsiveContainer width="100%" height="100%">
                       <RadialBarChart 
                         cx="50%" cy="50%" 
                         innerRadius="70%" outerRadius="100%" 
                         barSize={8} 
                         data={[{ name: topic.title, value: topic.value, fill: topic.color }]} 
                         startAngle={90} endAngle={-270}
                       >
                         <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={10} />
                       </RadialBarChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-xl font-bold" style={{ color: topic.color }}>{topic.value}%</span>
                     </div>
                   </div>
                   <p className="text-xs text-white/50">{topic.mastered} Topics Completed</p>
                </div>
              ))}
            </motion.div>

            {/* Motivation Card */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => setQuote(getMotivationalQuote())} // in a real app, this would get a new random quote
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <BookOpen className="w-8 h-8 text-white/30 mb-4" />
              <p className="text-lg md:text-xl font-medium text-white/90 italic mb-3 leading-relaxed">
                "{quote.text}"
              </p>
              <p className="text-sm text-cyan-300 font-medium">— {quote.author}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
