'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Target,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  BrainCircuit,
} from 'lucide-react';

import { useUserStore } from '@/lib/store/user-store';
import { useStudyStore } from '@/lib/store/study-store';
import { useMistakeStore } from '@/lib/store/mistake-store';
import { useXPStore } from '@/lib/store/xp-store';
import { generateDailyPlan } from '@/lib/mock/ai-engine';


// MOCK UTILS & STORES
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Dummy tasks for the demo
const initialTasks = [
  { id: '1', title: 'Number Systems - Remainders', description: 'Watch conceptual video and take notes on Fermat\'s Little Theorem.', topic: 'Quant', section: 'QA', timeEstimate: '45m', difficulty: 'hard', type: 'learn', status: 'pending' },
  { id: '2', title: 'Solve 20 Algebra Questions', description: 'Practice from level 2 difficulty. Focus on quadratic equations.', topic: 'Algebra', section: 'QA', timeEstimate: '1h', difficulty: 'medium', type: 'practice', status: 'pending' },
  { id: '3', title: 'RC Passage: Philosophy', description: 'Read and solve 4 questions. Time yourself strictly (10 mins max).', topic: 'RC', section: 'VARC', timeEstimate: '15m', difficulty: 'hard', type: 'practice', status: 'completed' },
  { id: '4', title: 'Review Yesterday\'s Mock', description: 'Analyze the 5 LRDI sets. Redo the ones you got wrong.', topic: 'Mock Analysis', section: 'LRDI', timeEstimate: '1.5h', difficulty: 'medium', type: 'review-mistakes', status: 'skipped' },
];

const getDifficultyColor = (diff: string) => {
  switch (diff) {
    case 'easy': return 'bg-emerald-400';
    case 'medium': return 'bg-amber-400';
    case 'hard': return 'bg-rose-400';
    default: return 'bg-white/20';
  }
};

const getTypeIcon = (type: string, className: string) => {
  switch (type) {
    case 'learn': return <BookOpen className={className} />;
    case 'practice': return <Target className={className} />;
    case 'revise': return <RefreshCw className={className} />;
    case 'mock': return <FileText className={className} />;
    case 'review-mistakes': return <AlertTriangle className={className} />;
    default: return <BookOpen className={className} />;
  }
};

export default function PlannerPage() {
  const [mounted, setMounted] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { profile } = useUserStore();
  const { topics, revisionItems } = useStudyStore();
  const { mistakes } = useMistakeStore();
  const { addXP } = useXPStore();

  useEffect(() => {
    setMounted(true);
    // Simulate checking store for existing plan
    const savedPlan = localStorage.getItem('cat-daily-plan');
    if (savedPlan) {
      setHasPlan(true);
      setTasks(JSON.parse(savedPlan));
    }
  }, []);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateDailyPlan((profile || { availableHoursWeekend: 4, availableHoursWeekday: 2 }) as any, topics, mistakes, revisionItems);
      
      const mappedTasks = plan.tasks.map((t: any) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        topic: t.topicName,
        section: t.section,
        timeEstimate: `${t.estimatedMinutes}m`,
        difficulty: t.difficulty,
        type: t.type,
        status: 'pending'
      }));

      // Preserve completed tasks from the current plan
      const completedTasks = tasks.filter(t => t.status === 'completed');
      const newPendingTasks = mappedTasks.length > 0 ? mappedTasks : initialTasks;
      
      // Merge: keep completed tasks at the top + new tasks
      const finalTasks = hasPlan && completedTasks.length > 0 
        ? [...completedTasks, ...newPendingTasks]
        : newPendingTasks;
      
      setTasks(finalTasks);
      setHasPlan(true);
      setIsGenerating(false);
      localStorage.setItem('cat-daily-plan', JSON.stringify(finalTasks));
    }, 2000);
  };

  const updateTaskStatus = (id: string, status: string) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, status } : t);
      localStorage.setItem('cat-daily-plan', JSON.stringify(updated));
      return updated;
    });
    if (status === 'completed') {
      addXP('question-correct', 'Completed a planner task');
    }
  };

  if (!mounted) return null;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Daily Planner</h1>
            <p className="text-white/50">{today}</p>
          </div>

          {hasPlan && (
            <div className="flex items-center gap-4">
              <div className="flex gap-4 text-sm mr-4">
                <div className="flex flex-col">
                  <span className="text-white/40">Total Time</span>
                  <span className="font-semibold">3.5 hrs</span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-4">
                  <span className="text-white/40">Tasks</span>
                  <span className="font-semibold">{totalCount}</span>
                </div>
              </div>
              <button 
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Regenerate
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {!hasPlan && !isGenerating ? (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center"
          >
            <div className="w-32 h-32 relative mb-8">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full border border-white/10 rounded-3xl bg-white/5 flex items-center justify-center backdrop-blur-xl rotate-12 hover:rotate-0 transition-all duration-500">
                <BrainCircuit className="w-16 h-16 text-violet-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">No Plan for Today Yet</h2>
            <p className="text-white/50 max-w-md mb-8">
              Let our AI analyze your weaknesses, track your mock scores, and generate the perfect study schedule to maximize your percentile.
            </p>
            <button 
              onClick={handleGeneratePlan}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center gap-3 font-semibold text-lg"
            >
              <Sparkles className="w-5 h-5" />
              Generate Daily Plan
            </button>
          </motion.div>
        ) : isGenerating ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full" />
              <div className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent animate-spin" />
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 animate-pulse">
              AI is crafting your perfect schedule...
            </h3>
            <p className="text-white/40 mt-2 text-sm">Analyzing weak areas and past mistakes</p>
          </div>
        ) : (
          /* Timeline View */
          <div className="space-y-12">
            <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 space-y-8 py-4">
              <AnimatePresence>
                {tasks.map((task, index) => {
                  const isExpanded = expandedId === task.id;
                  const isCompleted = task.status === 'completed';
                  const isSkipped = task.status === 'skipped';
                  
                  return (
                    <motion.div 
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "relative bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl transition-all duration-300 group",
                        isCompleted && "bg-white/[0.02] border-transparent",
                        isSkipped && "bg-white/[0.02] border-transparent border-l-amber-500/50 border-l-4"
                      )}
                    >
                      {/* Timeline Dot */}
                      <div className={cn(
                        "absolute -left-[35px] md:-left-[51px] top-8 w-5 h-5 rounded-full border-4 border-[#0a0a0f] z-10 transition-colors",
                        isCompleted ? "bg-emerald-400" : isSkipped ? "bg-amber-400" : "bg-violet-500"
                      )} />

                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        
                        {/* Left: Meta Info */}
                        <div className="flex md:flex-col items-center md:items-start gap-3 md:w-32 shrink-0 pt-1">
                          <span className="flex items-center gap-1.5 text-sm font-medium bg-white/10 px-3 py-1.5 rounded-lg w-fit">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {task.timeEstimate}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", getDifficultyColor(task.difficulty))} />
                            <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                              {task.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Center: Content */}
                        <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={cn(
                              "p-2 rounded-lg bg-white/10",
                              isCompleted ? "text-emerald-400" : "text-violet-400"
                            )}>
                              {getTypeIcon(task.type, "w-4 h-4")}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-white/40">{task.section} • {task.topic}</span>
                          </div>
                          <h3 className={cn(
                            "text-lg md:text-xl font-semibold mb-2 transition-colors",
                            (isCompleted || isSkipped) && "line-through text-white/40"
                          )}>
                            {task.title}
                          </h3>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-white/60 text-sm mt-3 mb-4 leading-relaxed">
                                  {task.description}
                                </p>
                                {/* Additional expandable content could go here */}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex md:flex-col gap-2 shrink-0 md:pt-1 md:ml-4">
                          {task.status === 'pending' ? (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'completed'); }}
                                className="flex-1 md:flex-none p-3 md:px-4 md:py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                              >
                                <CheckCircle2 className="w-4 h-4" /> <span className="md:hidden">Done</span>
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'skipped'); }}
                                className="flex-1 md:flex-none p-3 md:px-4 md:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                              >
                                <XCircle className="w-4 h-4" /> <span className="md:hidden">Skip</span>
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={(e) => { e.stopPropagation(); updateTaskStatus(task.id, 'pending'); }}
                              className="w-full p-2 md:px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 transition-colors text-sm font-medium flex items-center justify-center"
                            >
                              Undo
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {!isExpanded && (
                        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a0a0f] rounded-full p-1 border border-white/10 pointer-events-none">
                          <ChevronDown className="w-4 h-4 text-white/40" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Completion Summary Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-violet-900/40 to-[#0a0a0f] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1 max-w-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Today's Progress</h3>
                    <span className="text-violet-400 font-bold">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-8 bg-white/5 px-6 py-4 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-sm text-white/50 mb-1">Completed</span>
                    <span className="text-2xl font-bold text-white">{completedCount}<span className="text-sm font-normal text-white/40">/{totalCount}</span></span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-sm text-white/50 mb-1">XP Earned</span>
                    <span className="text-2xl font-bold text-cyan-400">+{completedCount * 50}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
