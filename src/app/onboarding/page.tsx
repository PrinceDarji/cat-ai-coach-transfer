'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store/user-store';
import { IIM_COLLEGES } from '@/lib/constants';
import { 
  GraduationCap, 
  Brain, 
  Target, 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Sparkles,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1]
    }
  })
};

export default function OnboardingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // State from User Store
  const { setProfile, completeOnboarding, isOnboarded } = useUserStore();
  
  // Local Form State
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState('');
  const [targetPercentile, setTargetPercentile] = useState(99);
  const [dreamColleges, setDreamColleges] = useState<string[]>([]);
  const [examDate, setExamDate] = useState('2026-11-24');
  
  // Self Assessment
  const [sectionLevels, setSectionLevels] = useState<{
    quant: 'Beginner' | 'Intermediate' | 'Advanced';
    lrdi: 'Beginner' | 'Intermediate' | 'Advanced';
    varc: 'Beginner' | 'Intermediate' | 'Advanced';
  }>({
    quant: 'Intermediate',
    lrdi: 'Intermediate',
    varc: 'Intermediate'
  });
  const [previousAttempts, setPreviousAttempts] = useState(0);
  
  // Schedule
  const [weekdayHours, setWeekdayHours] = useState(3);
  const [weekendHours, setWeekendHours] = useState(6);
  const [preferredTime, setPreferredTime] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    if (isOnboarded) {
      router.push('/');
    }
  }, [isOnboarded, router]);

  if (!mounted) return null;

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    try {
      // Map local form state to UserProfile fields
      const levelMap: Record<string, 'beginner' | 'intermediate' | 'advanced'> = {
        'Beginner': 'beginner',
        'Intermediate': 'intermediate',
        'Advanced': 'advanced'
      };
      const timeMap: Record<string, 'morning' | 'afternoon' | 'evening' | 'night'> = {
        'Morning': 'morning',
        'Afternoon': 'afternoon',
        'Evening': 'evening',
        'Night': 'night'
      };

      const profileData = {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        name: name || 'Student',
        email: '',
        targetPercentile,
        targetColleges: dreamColleges,
        catExamDate: examDate,
        availableHoursWeekday: weekdayHours,
        availableHoursWeekend: weekendHours,
        preferredStudyTime: timeMap[preferredTime] || 'morning',
        currentLevel: levelMap[sectionLevels.quant] || 'intermediate',
        previousAttempts,
        onboardingCompleted: true,
        createdAt: new Date().toISOString()
      };

      setProfile(profileData as any);
      completeOnboarding();
      
      // Use window.location as fallback if router.push doesn't work
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (err) {
      console.error('Onboarding error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const toggleCollege = (college: string) => {
    setDreamColleges(prev => 
      prev.includes(college) 
        ? prev.filter(c => c !== college)
        : [...prev, college]
    );
  };

  const filteredColleges = IIM_COLLEGES?.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col selection:bg-violet-500/30 overflow-y-auto pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 z-10 w-full max-w-4xl mx-auto">
        
        {/* Progress Indicator */}
        <div className="w-full max-w-md mb-12 flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white/10 -z-10" />
          <motion.div 
            className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 -z-10"
            initial={{ width: '0%' }}
            animate={{ width: `${((step - 1) / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                step >= i 
                  ? "bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                  : "bg-[#14141a] border border-white/10 text-white/40"
              )}
            >
              {step > i ? <CheckCircle className="w-4 h-4" /> : i}
            </div>
          ))}
        </div>

        {/* Wizard Content */}
        <div className="w-full max-w-2xl relative min-h-[500px]">
          <AnimatePresence custom={direction} mode="wait">
            
            {/* STEP 1: WELCOME */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center space-y-8"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <GraduationCap className="w-10 h-10 text-violet-400" />
                </div>
                
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-cyan-200 tracking-tight">
                    Welcome to CAT AI Coach
                  </h1>
                  <p className="text-lg text-white/60 font-medium">
                    Your personal AI mentor for CAT preparation.
                  </p>
                </div>

                <div className="w-full max-w-sm mt-8 space-y-4">
                  <div className="text-left space-y-2">
                    <label className="text-sm font-medium text-white/70 ml-1">What should I call you?</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: GOAL SETTING */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col space-y-8 w-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Target className="w-8 h-8 text-cyan-400" />
                    Set Your Goals
                  </h2>
                  <p className="text-white/60">Aim high, we'll help you get there.</p>
                </div>

                <div className="space-y-8">
                  {/* Target Percentile */}
                  <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="flex justify-between items-end">
                      <label className="font-medium text-white/90">Target Percentile</label>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                        {targetPercentile.toFixed(1)}%ile
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="90" 
                      max="100" 
                      step="0.1" 
                      value={targetPercentile}
                      onChange={(e) => setTargetPercentile(parseFloat(e.target.value))}
                      className="w-full accent-violet-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/40">
                      <span>90</span>
                      <span>92.5</span>
                      <span>95</span>
                      <span>97.5</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Exam Date */}
                  <div className="space-y-3">
                    <label className="font-medium text-white/90 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      CAT Exam Date
                    </label>
                    <input 
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 [color-scheme:dark]"
                    />
                  </div>

                  {/* Dream Colleges */}
                  <div className="space-y-3">
                    <label className="font-medium text-white/90">Dream Colleges</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input 
                        type="text"
                        placeholder="Search IIMs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                    <div className="h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {filteredColleges.map((college) => (
                        <div 
                          key={college}
                          onClick={() => toggleCollege(college)}
                          className={cn(
                            "px-4 py-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between",
                            dreamColleges.includes(college)
                              ? "bg-violet-500/20 border-violet-500/50 text-white"
                              : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <span className="text-sm font-medium">{college}</span>
                          {dreamColleges.includes(college) && <CheckCircle className="w-4 h-4 text-violet-400" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SELF ASSESSMENT */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col space-y-8 w-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Brain className="w-8 h-8 text-violet-400" />
                    Self Assessment
                  </h2>
                  <p className="text-white/60">Where do you stand right now?</p>
                </div>

                <div className="space-y-4">
                  {/* Subject Cards */}
                  {[
                    { id: 'quant', name: 'Quantitative Ability (QA)', color: 'violet' },
                    { id: 'lrdi', name: 'Logical Reasoning (LRDI)', color: 'cyan' },
                    { id: 'varc', name: 'Verbal Ability (VARC)', color: 'emerald' }
                  ].map((subject) => (
                    <div key={subject.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
                      <h3 className="font-medium text-white/90">{subject.name}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setSectionLevels(prev => ({ ...prev, [subject.id]: level }))}
                            className={cn(
                              "py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all border",
                              sectionLevels[subject.id as keyof typeof sectionLevels] === level
                                ? {
                                    violet: "bg-violet-500/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]",
                                    cyan: "bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]",
                                    emerald: "bg-emerald-500/20 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]",
                                  }[subject.color]
                                : "bg-[#14141a] border-white/10 text-white/50 hover:bg-white/5"
                            )}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Previous Attempts */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center">
                    <label className="font-medium text-white/90">Previous CAT Attempts</label>
                    <div className="flex bg-[#14141a] rounded-lg p-1 border border-white/10">
                      {[0, 1, 2, '3+'].map((num) => (
                        <button
                          key={num}
                          onClick={() => setPreviousAttempts(typeof num === 'string' ? 3 : num)}
                          className={cn(
                            "w-10 h-8 rounded-md text-sm font-medium transition-all",
                            previousAttempts === (typeof num === 'string' ? 3 : num)
                              ? "bg-white/20 text-white shadow-sm"
                              : "text-white/50 hover:text-white"
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SCHEDULE */}
            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col space-y-8 w-full"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8 text-emerald-400" />
                    Study Schedule
                  </h2>
                  <p className="text-white/60">Consistency is key. Let's plan your time.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="font-medium text-white/90">Weekday Study Hours</label>
                        <span className="text-xl font-bold text-violet-400">{weekdayHours} hrs/day</span>
                      </div>
                      <input 
                        type="range" min="1" max="8" step="1" 
                        value={weekdayHours} onChange={(e) => setWeekdayHours(parseInt(e.target.value))}
                        className="w-full accent-violet-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-end">
                        <label className="font-medium text-white/90">Weekend Study Hours</label>
                        <span className="text-xl font-bold text-cyan-400">{weekendHours} hrs/day</span>
                      </div>
                      <input 
                        type="range" min="1" max="14" step="1" 
                        value={weekendHours} onChange={(e) => setWeekendHours(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-medium text-white/90">Preferred Study Time</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'Morning', icon: Sun, label: 'Morning (6AM - 12PM)' },
                        { id: 'Afternoon', icon: Sun, label: 'Afternoon (12PM - 5PM)' },
                        { id: 'Evening', icon: Sunset, label: 'Evening (5PM - 9PM)' },
                        { id: 'Night', icon: Moon, label: 'Night (9PM - 2AM)' }
                      ].map((time) => {
                        const Icon = time.icon;
                        const isSelected = preferredTime === time.id;
                        return (
                          <button
                            key={time.id}
                            onClick={() => setPreferredTime(time.id as any)}
                            className={cn(
                              "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                              isSelected 
                                ? "bg-violet-500/20 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                            )}
                          >
                            <Icon className={cn("w-6 h-6", isSelected ? "text-violet-400" : "text-white/40")} />
                            <span className="text-xs font-medium text-center">{time.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: READY */}
            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center text-center space-y-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 blur-[40px] opacity-30 rounded-full" />
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-cyan-300">
                    You're All Set, {name || 'Champ'}!
                  </h2>
                  <p className="text-lg text-white/70 max-w-md mx-auto leading-relaxed">
                    I've crafted a personalized study plan targeting <strong className="text-white">{targetPercentile}%ile</strong>. 
                    Let's crack the CAT together.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md text-left mt-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-white/50 mb-1">Weekly Commitment</div>
                    <div className="font-semibold text-white/90">{(weekdayHours * 5) + (weekendHours * 2)} hours</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-white/50 mb-1">Target</div>
                    <div className="font-semibold text-white/90">{targetPercentile}%ile</div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-2xl mt-12 flex justify-between items-center relative z-20">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div /> // Placeholder for layout
          )}

          {step < 5 ? (
            <button
              onClick={nextStep}
              disabled={step === 1 && !name.trim()}
              className={cn(
                "px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
                step === 1 && !name.trim() 
                  ? "bg-white/10 text-white/30 cursor-not-allowed shadow-none" 
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              )}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 text-white font-bold transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center gap-2 scale-105"
            >
              Start Your Journey <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
