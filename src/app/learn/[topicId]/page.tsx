'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Target, MessageCircle, CheckCircle, XCircle, 
  Lightbulb, ChevronRight, Send, Sparkles, ArrowRight, RotateCcw
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { cn } from '@/lib/utils';
import { getTopicContent, TopicContent, PracticeQuestion } from '@/lib/content';
import { getPYQsByTopic } from '@/lib/content/pyqs';
import { useXPStore } from '@/lib/store/xp-store';
import { generateCoachResponse } from '@/lib/mock/ai-engine';

// ─── Coach Chat Message ───
interface ChatMsg { role: 'user' | 'assistant'; text: string; }

export default function LearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicId = params?.topicId as string;
  const initialMode = searchParams?.get('mode') || 'learn';

  const [content, setContent] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'coach'>(initialMode as any);

  // Learn state
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  // Practice state
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [numericAnswer, setNumericAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState<Record<number, { answer: string; correct: boolean }>>({});
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [dataSource, setDataSource] = useState<'standard' | 'pyq'>('standard');
  const [topicPyqs, setTopicPyqs] = useState<any[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

  // Coach chat state
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');

  // Load content
  useEffect(() => {
    async function loadContent() {
      try {
        const topicData = await getTopicContent(topicId);
        if (topicData) {
          setContent(topicData);
        }
        setTopicPyqs(getPYQsByTopic(topicId));
      } catch (err) {
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    }
    if (topicId) loadContent();
  }, [topicId]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`learn-progress-${topicId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedLessons(new Set(data.completedLessons || []));
      setPracticeHistory(data.practiceHistory || {});
    }
  }, [topicId]);

  // Save progress
  useEffect(() => {
    if (topicId && (completedLessons.size > 0 || Object.keys(practiceHistory).length > 0)) {
      localStorage.setItem(`learn-progress-${topicId}`, JSON.stringify({
        completedLessons: Array.from(completedLessons),
        practiceHistory,
      }));
    }
  }, [topicId, completedLessons, practiceHistory]);

  const filteredQuestions = useMemo(() => {
    if (!content || !content.practice) return [];
    
    let allQuestions = [];
    if (dataSource === 'standard') {
      allQuestions = [...content.practice, ...generatedQuestions];
    } else {
      allQuestions = [...topicPyqs];
    }
    
    // Normalize question objects because subagents used different schemas
    const totalQuestions = allQuestions.length;
    const normalized = allQuestions.map((q: any, i: number) => {
      // Normalize 'text' -> 'question'
      const questionText = q.question || q.text || 'Question missing';
      
      // Normalize type
      const type = q.type || (q.options ? 'mcq' : 'numeric');
      
      // Auto-distribute difficulty if missing (first 33% easy, middle medium, last hard)
      let difficulty = q.difficulty;
      if (!difficulty) {
        if (i < Math.ceil(totalQuestions / 3)) difficulty = 'easy';
        else if (i >= Math.floor((totalQuestions * 2) / 3)) difficulty = 'hard';
        else difficulty = 'medium';
      }
      
      // Normalize options and correct answers
      let options = q.options;
      let correctAnswer = q.correctAnswer;
      let wrongExplanations = q.wrongExplanations;
      
      if (options && options.length > 0) {
        if (typeof options[0] === 'string') {
          // Quant schema: ['34%', '44%', '54%', '64%'] and correctAnswer: 3 and wrongExplanations: ['...', ...]
          const labels = ['A', 'B', 'C', 'D', 'E'];
          const newOptions = options.map((opt: string, i: number) => ({ label: labels[i], text: opt }));
          if (typeof correctAnswer === 'number') {
            correctAnswer = labels[correctAnswer];
          }
          if (Array.isArray(wrongExplanations)) {
            const newWrong: Record<string, string> = {};
            wrongExplanations.forEach((exp: string, i: number) => {
              if (exp) newWrong[labels[i]] = exp;
            });
            wrongExplanations = newWrong;
          }
          options = newOptions;
        } else if (options[0].id && options[0].isCorrect !== undefined) {
          // LRDI/VARC schema: [{ id: 'A', text: '...', isCorrect: true, explanation: '...' }]
          const newOptions = options.map((opt: any) => ({ label: opt.id, text: opt.text }));
          const correctOpt = options.find((opt: any) => opt.isCorrect);
          if (correctOpt) correctAnswer = correctOpt.id;
          
          const newWrong: Record<string, string> = {};
          options.forEach((opt: any) => {
            if (!opt.isCorrect && opt.explanation) newWrong[opt.id] = opt.explanation;
          });
          wrongExplanations = newWrong;
          options = newOptions;
        }
      }
      
      return {
        ...q,
        question: questionText,
        type,
        difficulty,
        options,
        correctAnswer,
        wrongExplanations
      };
    });

    if (difficultyFilter === 'all') return normalized;
    return normalized.filter(q => q.difficulty === difficultyFilter);
  }, [content, difficultyFilter]);

  const currentQuestion = filteredQuestions[currentQ];

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    const answer = currentQuestion.type === 'mcq' ? selectedAnswer : numericAnswer.trim();
    if (!answer) return;
    const correct = answer.toUpperCase() === currentQuestion.correctAnswer.toUpperCase();
    setSubmitted(true);
    setPracticeHistory(prev => ({ ...prev, [currentQ]: { answer, correct } }));
  };

  const handleNextQuestion = () => {
    if (currentQ < filteredQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer('');
      setNumericAnswer('');
      setSubmitted(false);
      setShowHint(false);
    }
  };

  const handleResetProgress = () => {
    setCurrentQ(0);
    setSelectedAnswer('');
    setNumericAnswer('');
    setSubmitted(false);
    setShowHint(false);
    setPracticeHistory({});
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    
    try {
      const topicContext = content ? `The student is currently learning "${content.name}" in the ${content.section.toUpperCase()} section.` : '';
      
      // Add a placeholder message for the assistant
      setChatMessages(prev => [...prev, { role: 'assistant', text: '' }]);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `[Context: ${topicContext}] ${userMsg}`,
          history: chatMessages.map(m => ({ role: m.role, content: m.text })),
          profile: {}
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
            setChatMessages(prev => {
              const newMsgs = [...prev];
              const lastMsg = newMsgs[newMsgs.length - 1];
              newMsgs[newMsgs.length - 1] = { ...lastMsg, text: lastMsg.text + textChunk };
              return newMsgs;
            });
          }
        }
      } else {
        setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: 'Error getting response.' }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: 'Network error.' }]);
    }
  };

  const handleGenerateQuestion = async () => {
    if (isGeneratingQuestion || !content) return;
    setIsGeneratingQuestion(true);
    
    try {
      const response = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: content.name,
          difficulty: difficultyFilter === 'all' ? 'medium' : difficultyFilter
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedQuestions(prev => [...prev, data]);
        setTimeout(() => {
          setCurrentQ(filteredQuestions.length); // Next available index will be the new question
          setSelectedAnswer('');
          setNumericAnswer('');
          setSubmitted(false);
          setShowHint(false);
        }, 100);
      }
    } catch (error) {
      console.error('Failed to generate question', error);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const practiceStats = useMemo(() => {
    const total = Object.keys(practiceHistory).length;
    const correct = Object.values(practiceHistory).filter(h => h.correct).length;
    return { total, correct, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [practiceHistory]);

  // ─── Loading State ───
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading lesson...</p>
        </div>
      </div>
    );
  }

  // ─── Content Not Found ───
  if (!content) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <BookOpen className="w-16 h-16 text-violet-400 mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-2">Content Not Found</h2>
          <p className="text-white/50 mb-6">We couldn't find the lesson for topic ID: {topicId}</p>
          <button onClick={() => router.back()} className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      {/* ─── Header ─── */}
      <div className="sticky top-0 z-40 bg-[#0a0a12]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-right">
              <span className="text-xs text-white/30">{completedLessons.size}/{content.lessons.length} lessons</span>
              {practiceStats.total > 0 && (
                <span className="text-xs text-white/30 ml-3">{practiceStats.correct}/{practiceStats.total} correct</span>
              )}
            </div>
          </div>
          <h1 className="text-xl font-bold text-white mb-3">{content.name}</h1>
          
          {/* Tab bar */}
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {(['learn', 'practice', 'coach'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5",
                  activeTab === tab 
                    ? "bg-violet-600 text-white shadow-lg" 
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {tab === 'learn' && <><BookOpen className="w-3.5 h-3.5" /> Learn</>}
                {tab === 'practice' && <><Target className="w-3.5 h-3.5" /> Practice</>}
                {tab === 'coach' && <><MessageCircle className="w-3.5 h-3.5" /> Ask Coach</>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Content Area ─── */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* ═══════════ LEARN TAB ═══════════ */}
          {activeTab === 'learn' && (
            <motion.div key="learn" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              {content.lessons.map((lesson, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "bg-[#13131a] border rounded-2xl overflow-hidden transition-all",
                    completedLessons.has(i) ? "border-emerald-500/30" : "border-white/5"
                  )}
                >
                  {/* Lesson header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                        completedLessons.has(i) ? "bg-emerald-500/20 text-emerald-400" : "bg-violet-500/20 text-violet-400"
                      )}>
                        {completedLessons.has(i) ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                    </div>
                  </div>

                  {/* Lesson content */}
                  <div className="px-6 py-5">
                    <div className="prose prose-invert prose-violet max-w-none prose-sm
                      [&_h3]:text-base [&_h3]:text-violet-300 [&_h3]:mt-4 [&_h3]:mb-2
                      [&_p]:text-[14px] [&_p]:leading-relaxed [&_p]:text-white/80
                      [&_li]:text-[14px] [&_li]:text-white/80
                      [&_strong]:text-white
                      [&_blockquote]:border-violet-500/40 [&_blockquote]:bg-violet-500/5 [&_blockquote]:rounded-r-lg [&_blockquote]:py-2 [&_blockquote]:text-violet-200
                      [&_code]:bg-white/10 [&_code]:rounded [&_code]:px-1.5 [&_code]:text-amber-300
                      [&_table]:text-sm [&_th]:text-violet-300 [&_td]:text-white/70
                    ">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{lesson.content}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Mark as understood */}
                  <div className="px-6 pb-5">
                    <button
                      onClick={() => {
                        setCompletedLessons(prev => {
                          const next = new Set(prev);
                          if (next.has(i)) next.delete(i); else next.add(i);
                          return next;
                        });
                      }}
                      className={cn(
                        "px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                        completedLessons.has(i)
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-white/50 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10"
                      )}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {completedLessons.has(i) ? "Understood ✓" : "I understood this"}
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* After all lessons — CTA to practice */}
              <div className="text-center py-8">
                <p className="text-white/40 text-sm mb-3">Finished reading? Test your understanding!</p>
                <button
                  onClick={() => { setActiveTab('practice'); setCurrentQ(0); }}
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors flex items-center gap-2 mx-auto"
                >
                  <Target className="w-4 h-4" /> Start Practice <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════════ PRACTICE TAB ═══════════ */}
          {activeTab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {/* Practice Source Toggle */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-[#111116] border border-white/10 rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() => { setDataSource('standard'); setCurrentQ(0); setSubmitted(false); }}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                      dataSource === 'standard' ? "bg-violet-600 text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    <BrainCircuit className="w-4 h-4" /> AI Practice
                  </button>
                  <button
                    onClick={() => { setDataSource('pyq'); setCurrentQ(0); setSubmitted(false); }}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                      dataSource === 'pyq' ? "bg-emerald-600 text-white shadow-lg" : "text-white/40 hover:text-white"
                    )}
                  >
                    <BookOpen className="w-4 h-4" /> Actual PYQs ({topicPyqs.length})
                  </button>
                </div>
              </div>

              {/* Difficulty filter + stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
                  {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => { setDifficultyFilter(d); setCurrentQ(0); setSubmitted(false); setSelectedAnswer(''); setNumericAnswer(''); setShowHint(false); }}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize",
                        difficultyFilter === d ? "bg-violet-600 text-white" : "text-white/40 hover:text-white/70"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                {practiceStats.total > 0 && (
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-sm font-semibold",
                      practiceStats.accuracy >= 80 ? "text-emerald-400" : practiceStats.accuracy >= 50 ? "text-amber-400" : "text-rose-400"
                    )}>
                      {practiceStats.accuracy}% accuracy
                    </span>
                    <button onClick={handleResetProgress} className="text-white/30 hover:text-white/60 transition-colors" title="Reset progress">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={handleGenerateQuestion}
                  disabled={isGeneratingQuestion}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg text-sm font-medium transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  {isGeneratingQuestion ? "Generating..." : "Generate AI Question"}
                </button>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 text-white/40">No questions for this difficulty level.</div>
              ) : currentQuestion ? (
                <div className="space-y-4">
                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-white/40">Question {currentQ + 1} of {filteredQuestions.length}</span>
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${((currentQ + 1) / filteredQuestions.length) * 100}%` }} />
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-md font-medium capitalize",
                      currentQuestion.difficulty === 'easy' ? "bg-emerald-500/20 text-emerald-400" :
                      currentQuestion.difficulty === 'medium' ? "bg-amber-500/20 text-amber-400" :
                      "bg-rose-500/20 text-rose-400"
                    )}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>

                  {/* Question card */}
                  <div className="bg-[#13131a] border border-white/5 rounded-2xl p-6">
                    <p className="text-white text-base leading-relaxed mb-6">{currentQuestion.question}</p>

                    {/* MCQ Options */}
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                      <div className="space-y-3 mb-6">
                        {currentQuestion.options.map(opt => {
                          const isSelected = selectedAnswer === opt.label;
                          const isCorrect = opt.label === currentQuestion.correctAnswer;
                          const wasChosen = submitted && isSelected;
                          
                          return (
                            <button
                              key={opt.label}
                              onClick={() => { if (!submitted) setSelectedAnswer(opt.label); }}
                              disabled={submitted}
                              className={cn(
                                "w-full text-left px-5 py-3.5 rounded-xl border transition-all flex items-start gap-3",
                                submitted && isCorrect && "border-emerald-500/50 bg-emerald-500/10",
                                submitted && wasChosen && !isCorrect && "border-rose-500/50 bg-rose-500/10",
                                !submitted && isSelected && "border-violet-500/50 bg-violet-500/10",
                                !submitted && !isSelected && "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/5",
                                submitted && !isCorrect && !wasChosen && "border-white/5 bg-white/[0.01] opacity-50"
                              )}
                            >
                              <span className={cn(
                                "w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5",
                                submitted && isCorrect && "bg-emerald-500 text-white",
                                submitted && wasChosen && !isCorrect && "bg-rose-500 text-white",
                                !submitted && isSelected && "bg-violet-500 text-white",
                                !submitted && !isSelected && "bg-white/10 text-white/50"
                              )}>
                                {submitted && isCorrect ? <CheckCircle className="w-4 h-4" /> : 
                                 submitted && wasChosen && !isCorrect ? <XCircle className="w-4 h-4" /> : 
                                 opt.label}
                              </span>
                              <span className={cn(
                                "text-sm leading-relaxed",
                                submitted && isCorrect ? "text-emerald-300" :
                                submitted && wasChosen && !isCorrect ? "text-rose-300" :
                                "text-white/80"
                              )}>
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Numeric Input */}
                    {currentQuestion.type === 'numeric' && (
                      <div className="mb-6">
                        <input
                          type="text"
                          value={numericAnswer}
                          onChange={e => setNumericAnswer(e.target.value)}
                          disabled={submitted}
                          placeholder="Type your answer..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 disabled:opacity-50"
                          onKeyDown={e => { if (e.key === 'Enter' && !submitted) handleSubmitAnswer(); }}
                        />
                      </div>
                    )}

                    {/* Hint */}
                    {!submitted && !showHint && (
                      <button onClick={() => setShowHint(true)} className="text-sm text-amber-400/70 hover:text-amber-400 flex items-center gap-1.5 mb-4 transition-colors">
                        <Lightbulb className="w-3.5 h-3.5" /> Need a hint?
                      </button>
                    )}
                    {showHint && !submitted && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/15 rounded-xl px-4 py-3 mb-4">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-amber-200/90 text-sm">{currentQuestion.hint}</span>
                      </motion.div>
                    )}

                    {/* Submit button */}
                    {!submitted && (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={currentQuestion.type === 'mcq' ? !selectedAnswer : !numericAnswer.trim()}
                        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-white/5 disabled:text-white/20 text-white font-medium transition-all text-sm"
                      >
                        Submit Answer
                      </button>
                    )}

                    {/* ── Result & Explanation ── */}
                    {submitted && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mt-2">
                        {/* Correct/Wrong banner */}
                        {practiceHistory[currentQ]?.correct ? (
                          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-300 font-medium">Correct! Well done! 🎉</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/20 rounded-xl px-5 py-3">
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="text-rose-300 font-medium">
                              Not quite. Your answer: {practiceHistory[currentQ]?.answer} → Correct: {currentQuestion.correctAnswer}
                            </span>
                          </div>
                        )}

                        {/* Solution explanation */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span className="text-violet-300 font-semibold text-sm">Solution</span>
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none [&_p]:text-white/80 [&_strong]:text-white">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{currentQuestion.explanation}</ReactMarkdown>
                          </div>
                        </div>

                        {/* Wrong answer explanation */}
                        {!practiceHistory[currentQ]?.correct && currentQuestion.wrongExplanations?.[practiceHistory[currentQ]?.answer] && (
                          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <XCircle className="w-4 h-4 text-rose-400" />
                              <span className="text-rose-300 font-semibold text-sm">Where you went wrong</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {currentQuestion.wrongExplanations[practiceHistory[currentQ]?.answer]}
                            </p>
                          </div>
                        )}

                        {/* Next / Ask Coach */}
                        <div className="flex gap-3 pt-2">
                          {currentQ < filteredQuestions.length - 1 ? (
                            <button onClick={handleNextQuestion} className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors text-sm flex items-center justify-center gap-2">
                              Next Question <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <div className="flex-1 text-center py-3 text-white/40 text-sm">
                              🎉 You've completed all questions! Score: {practiceStats.correct}/{practiceStats.total}
                            </div>
                          )}
                          {!practiceHistory[currentQ]?.correct && (
                            <button
                              onClick={() => {
                                setActiveTab('coach');
                                const q = currentQuestion.question.substring(0, 60);
                                setChatInput(`I got this question wrong: "${q}..." Can you explain it differently?`);
                              }}
                              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium transition-colors text-sm flex items-center gap-2"
                            >
                              <MessageCircle className="w-4 h-4" /> Ask Coach
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Question navigator */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {filteredQuestions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setCurrentQ(i); setSelectedAnswer(''); setNumericAnswer(''); setSubmitted(!!practiceHistory[i]); setShowHint(false); }}
                        className={cn(
                          "w-8 h-8 rounded-lg text-xs font-medium transition-all",
                          i === currentQ ? "bg-violet-600 text-white ring-2 ring-violet-500/50" :
                          practiceHistory[i]?.correct ? "bg-emerald-500/20 text-emerald-400" :
                          practiceHistory[i] ? "bg-rose-500/20 text-rose-400" :
                          "bg-white/5 text-white/40 hover:bg-white/10"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}

          {/* ═══════════ ASK COACH TAB ═══════════ */}
          {activeTab === 'coach' && (
            <motion.div key="coach" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col" style={{ minHeight: 'calc(100vh - 200px)' }}>
              {/* Quick questions */}
              {chatMessages.length === 0 && (
                <div className="mb-6">
                  <p className="text-white/40 text-sm mb-3">Ask anything about <strong className="text-white/70">{content.name}</strong>:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      `Explain ${content.name} in the simplest way possible`,
                      `Give me an easy real-world example`,
                      `What are the most common mistakes students make?`,
                      `How is this tested in CAT?`,
                      `I'm confused about the formulas, can you help?`,
                    ].map((q, i) => (
                      <button
                        key={i}
                        onClick={() => { setChatInput(q); }}
                        className="text-xs bg-white/5 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-white/60 hover:text-violet-300 px-3 py-2 rounded-lg transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat messages */}
              <div className="flex-1 space-y-4 mb-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm",
                      msg.role === 'user'
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-white/5 border border-white/10 text-white/80 rounded-bl-md"
                    )}>
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-invert prose-sm max-w-none [&_p]:text-white/80 [&_strong]:text-white [&_h2]:text-base [&_h3]:text-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{msg.text}</ReactMarkdown>
                        </div>
                      ) : msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <div className="sticky bottom-4 bg-[#0a0a12] pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask your doubt..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-violet-500/50"
                    onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                    className="px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-white/5 disabled:text-white/20 text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

