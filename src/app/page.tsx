'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/lib/store/user-store';
import { useChatStore } from '@/lib/store/chat-store';
import { useStudyStore } from '@/lib/store/study-store';
import { useXPStore } from '@/lib/store/xp-store';
import { generateGreeting, generateCoachResponse, generateDailyPlan } from '@/lib/mock/ai-engine';
import { getGreeting, calculateDaysUntilCAT } from '@/lib/utils';
import { 
  Send, 
  Calendar, 
  Target, 
  Zap, 
  BookOpen, 
  ClipboardList, 
  Flame, 
  Star, 
  Clock, 
  TrendingUp,
  Brain,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  const { profile, isOnboarded } = useUserStore();
  const { messages, addMessage, updateLastMessage, isTyping, setTyping } = useChatStore();
  const { streak, totalXP, getLevel } = useXPStore();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const promptHandled = useRef(false);

  // Initialize and redirect checks
  useEffect(() => {
    setMounted(true);
    if (!isOnboarded) {
      router.push('/onboarding');
    } else if (messages.length === 0) {
      // First load greeting
      const greetingText = generateGreeting(
        profile as any,
        [],  // studySessions
        streak || 0
      );
      addMessage({
        role: 'assistant',
        content: greetingText,
      });
    }
  }, [isOnboarded, router, messages.length, profile, addMessage, streak]);

  // Handle ?prompt= query parameter from topic pages
  useEffect(() => {
    const promptParam = searchParams.get('prompt');
    if (promptParam && mounted && isOnboarded && !promptHandled.current) {
      promptHandled.current = true;
      // Small delay to let greeting load first
      setTimeout(() => {
        handleSendMessage(promptParam);
        // Clean up URL
        window.history.replaceState({}, '', '/');
      }, 500);
    }
  }, [searchParams, mounted, isOnboarded]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!mounted || !isOnboarded) return null;

  const daysLeft = profile?.catExamDate ? calculateDaysUntilCAT(profile.catExamDate) : 0;
  const levelInfo = getLevel();

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;
    
    // Add user message
    addMessage({
      role: 'user',
      content: text,
    });
    setInputValue('');
    
    setTyping(true);
    
    try {
      // Add a placeholder message for the assistant
      addMessage({
        role: 'assistant',
        content: '',
      });
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          profile: profile
        })
      });
      
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const textChunk = decoder.decode(value, { stream: true });
            updateLastMessage(textChunk);
          }
        }
      } else {
        updateLastMessage('Error getting response.');
      }
    } catch (error) {
      updateLastMessage('Error connecting to the network.');
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Calendar, label: "Start Today's Plan", prompt: "What is my study plan for today?" },
    { icon: Target, label: "Practice Weak Topics", prompt: "I want to practice my weak topics." },
    { icon: Zap, label: "Quick Quiz", prompt: "Give me a quick 5-question quiz." },
    { icon: BookOpen, label: "Review Mistakes", prompt: "Let's review my recent mistakes." },
    { icon: ClipboardList, label: "Take Mock", prompt: "I am ready to take a full mock test." }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-white overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* Header / Stats Row */}
      <header className="flex-shrink-0 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md z-10 px-4 py-4 sm:px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[11px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                AI Coach
              </h1>
              <p className="text-xs text-white/50">Always here to help, {profile?.name}</p>
            </div>
          </div>
          
          <div className="hidden sm:flex gap-3">
            <StatCard icon={Flame} value={streak.toString()} label="Day Streak" color="orange" />
            <StatCard icon={Star} value={`Lvl ${levelInfo.level}`} label={`${totalXP} XP`} color="violet" />
            <StatCard icon={Clock} value={daysLeft.toString()} label="Days Left" color="cyan" />
            <StatCard icon={TrendingUp} value="0/3" label="Today's Tasks" color="emerald" />
          </div>
        </div>

        {/* Mobile Stats (Horizontal Scroll) */}
        <div className="flex sm:hidden overflow-x-auto gap-3 pb-2 scrollbar-none snap-x">
          <div className="snap-start"><StatCard icon={Flame} value={streak.toString()} label="Day Streak" color="orange" /></div>
          <div className="snap-start"><StatCard icon={Star} value={`Lvl ${levelInfo.level}`} label={`${totalXP} XP`} color="violet" /></div>
          <div className="snap-start"><StatCard icon={Clock} value={daysLeft.toString()} label="Days Left" color="cyan" /></div>
          <div className="snap-start"><StatCard icon={TrendingUp} value="0/3" label="Today's Tasks" color="emerald" /></div>
        </div>

        {/* Quick Actions Scroll Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={() => handleSendMessage(action.prompt)}
                className="snap-start whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-white/80"
              >
                <Icon className="w-4 h-4 text-violet-400" />
                {action.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 z-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4",
                  msg.role === 'user' 
                    ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_4px_20px_rgba(139,92,246,0.2)] rounded-tr-sm"
                    : "bg-white/5 border border-white/10 backdrop-blur-md text-white/90 shadow-sm rounded-tl-sm prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-a:text-violet-400 max-w-none"
                )}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{String(msg.content || '')}</ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{String(msg.content || '')}</p>
                  )}
                  <span className={cn(
                    "text-[10px] block mt-2 opacity-50 font-medium",
                    msg.role === 'user' ? "text-right" : "text-left"
                  )}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start w-full"
              >
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 h-[52px]">
                  <motion.div 
                    className="w-2 h-2 bg-violet-400 rounded-full" 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-violet-400 rounded-full" 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-violet-400 rounded-full" 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-shrink-0 p-4 sm:p-6 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 w-full pb-8">
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-end gap-2 bg-[#14141a] border border-white/10 rounded-2xl p-2 shadow-2xl transition-all focus-within:border-violet-500/50 focus-within:bg-[#1a1a24]">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI coach anything... (Shift+Enter for newline)"
              className="flex-1 max-h-[150px] min-h-[44px] bg-transparent resize-none outline-none text-white placeholder:text-white/30 px-3 py-3 text-sm sm:text-base scrollbar-thin scrollbar-thumb-white/10"
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                "p-3 rounded-xl flex items-center justify-center transition-all flex-shrink-0 mb-[2px] mr-[2px]",
                inputValue.trim() && !isTyping
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-3">
            <span className="text-[10px] text-white/30 font-medium tracking-wide uppercase">AI can make mistakes. Verify important information.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: any, value: string, label: string, color: 'violet' | 'cyan' | 'orange' | 'emerald' }) {
  const colorMap = {
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 min-w-max">
      <div className={cn("p-1.5 rounded-lg border", colorMap[color])}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-bold text-white/90 leading-none mb-1">{value}</div>
        <div className="text-[10px] font-medium text-white/40 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}
