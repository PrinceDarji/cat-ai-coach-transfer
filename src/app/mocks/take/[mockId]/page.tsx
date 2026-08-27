'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, ChevronRight, Bookmark, X, AlertTriangle, AlertCircle } from 'lucide-react';
import { useMockStore } from '@/lib/store/mock-store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// Import our demo mock
import { DEMO_MINI_MOCK } from '@/lib/content/mocks/demo';
import { CAT_2025_SLOT_1 } from '@/lib/content/mocks/cat-2025-slot-1';
import { CAT_2025_SLOT_2 } from '@/lib/content/mocks/cat-2025-slot-2';
import { CAT_2024_SLOT_1 } from '@/lib/content/mocks/cat-2024-slot-1';
import { CAT_2024_SLOT_3 } from '@/lib/content/mocks/cat-2024-slot-3';

export default function MockExamEngine() {
  const router = useRouter();
  const params = useParams();
  const { addMock } = useMockStore() as any;
  const mockId = params.mockId as string;

  // Use the demo mock if ID matches, else show error
  const mockData = mockId === 'demo-mini' ? DEMO_MINI_MOCK 
                 : mockId === 'cat-2025-slot-1' ? CAT_2025_SLOT_1 
                 : mockId === 'cat-2025-slot-2' ? CAT_2025_SLOT_2 
                 : mockId === 'cat-2024-slot-1' ? CAT_2024_SLOT_1 
                 : mockId === 'cat-2024-slot-3' ? CAT_2024_SLOT_3 
                 : null;

  const [hasStarted, setHasStarted] = useState(false);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // State for user responses
  // Structure: { sectionId: { questionId: { answer: string/number, status: 'answered' | 'marked' | 'skipped' | 'visited' } } }
  const [responses, setResponses] = useState<any>({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Initialize state when starting
  const handleStart = () => {
    if (!mockData) return;
    
    const initialResponses: any = {};
    mockData.sections.forEach(sec => {
      initialResponses[sec.id] = {};
      sec.questions.forEach(q => {
        initialResponses[sec.id][q.id] = { answer: null, status: 'unvisited' };
      });
      // Mark first question of first section as visited
      if (sec.id === mockData.sections[0].id) {
        initialResponses[sec.id][sec.questions[0].id].status = 'visited';
      }
    });
    
    setResponses(initialResponses);
    setTimeLeft(mockData.sections[0].timeLimit);
    setHasStarted(true);
  };

  // Timer logic
  useEffect(() => {
    if (!hasStarted || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time is up for this section
          clearInterval(timer);
          handleSectionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, currentSectionIdx, isSubmitting]);

  const handleSectionEnd = () => {
    if (!mockData) return;
    
    if (currentSectionIdx < mockData.sections.length - 1) {
      // Move to next section
      const nextIdx = currentSectionIdx + 1;
      setCurrentSectionIdx(nextIdx);
      setCurrentQuestionIdx(0);
      setTimeLeft(mockData.sections[nextIdx].timeLimit);
      
      // Mark first question as visited
      setResponses((prev: any) => ({
        ...prev,
        [mockData.sections[nextIdx].id]: {
          ...prev[mockData.sections[nextIdx].id],
          [mockData.sections[nextIdx].questions[0].id]: {
            ...prev[mockData.sections[nextIdx].id][mockData.sections[nextIdx].questions[0].id],
            status: prev[mockData.sections[nextIdx].id][mockData.sections[nextIdx].questions[0].id].status === 'unvisited' ? 'visited' : prev[mockData.sections[nextIdx].id][mockData.sections[nextIdx].questions[0].id].status
          }
        }
      }));
    } else {
      // End of exam
      submitExam();
    }
  };

  const submitExam = () => {
    setIsSubmitting(true);
    if (!mockData) return;

    // Calculate score
    let totalScore = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;
    const sectionScores = mockData.sections.map(sec => {
      let secScore = 0;
      let secAttempted = 0;
      let secCorrect = 0;
      let secWrong = 0;

      sec.questions.forEach(q => {
        const res = responses[sec.id]?.[q.id];
        if (res && res.answer !== null && res.answer !== '') {
          secAttempted++;
          if (q.type === 'mcq') {
            if (res.answer === q.correctAnswer) {
              secScore += 3;
              secCorrect++;
            } else {
              secScore -= 1;
              secWrong++;
            }
          } else if (q.type === 'tita') {
            if (res.answer.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
              secScore += 3;
              secCorrect++;
            } else {
              // TITA has no negative marking
              secWrong++;
            }
          }
        }
      });

      totalScore += secScore;
      totalAttempted += secAttempted;
      totalCorrect += secCorrect;

      return {
        section: sec.name,
        score: secScore,
        attempted: secAttempted,
        correct: secCorrect,
        wrong: secWrong,
        accuracy: secAttempted > 0 ? (secCorrect / secAttempted) * 100 : 0
      };
    });

    const newMock = {
      id: generateId(),
      name: mockData.name,
      date: new Date().toISOString(),
      overallScore: totalScore,
      maxScore: mockData.sections.reduce((acc, sec) => acc + sec.questions.length * 3, 0),
      percentile: Math.round(75 + (totalCorrect / (totalAttempted || 1)) * 24), // Mock percentile
      totalAttempted,
      totalCorrect,
      totalTimeSpent: mockData.sections.reduce((acc, sec) => acc + sec.timeLimit, 0),
      aiAnalysis: 'This is an AI generated summary for your mock attempt. Good job completing the test! Your score indicates a strong baseline. Keep practicing to improve accuracy and speed.',
      sections: sectionScores
    };

    addMock(newMock);
    router.replace('/mocks/dashboard');
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!mockData) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center items-center text-white bg-[#0a0a0f]">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold">Mock Not Found</h1>
        <p className="text-white/50 mb-6">This mock test is currently locked or unavailable.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20">Go Back</button>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen p-8 flex flex-col justify-center items-center text-white bg-[#0a0a0f]">
        <div className="max-w-2xl bg-[#111116] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-4">{mockData.name}</h1>
          <div className="space-y-4 mb-8 text-white/70">
            <p><strong>Total Sections:</strong> {mockData.sections.length}</p>
            <p><strong>Format:</strong> Strictly section-wise. You cannot jump between sections.</p>
            <p className="text-rose-400 flex items-center gap-2"><AlertCircle className="w-5 h-5"/> Once started, the timer cannot be paused.</p>
          </div>
          <button 
            onClick={handleStart}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-blue-500/20"
          >
            Start Exam Now
          </button>
        </div>
      </div>
    );
  }

  const currentSection = mockData.sections[currentSectionIdx];
  const currentQuestion = currentSection.questions[currentQuestionIdx];
  const currentResponse = responses[currentSection.id]?.[currentQuestion.id] || { answer: null, status: 'unvisited' };

  const handleOptionSelect = (optionIndex: number) => {
    setResponses((prev: any) => ({
      ...prev,
      [currentSection.id]: {
        ...prev[currentSection.id],
        [currentQuestion.id]: {
          ...prev[currentSection.id][currentQuestion.id],
          answer: optionIndex
        }
      }
    }));
  };

  const handleTitaChange = (val: string) => {
    setResponses((prev: any) => ({
      ...prev,
      [currentSection.id]: {
        ...prev[currentSection.id],
        [currentQuestion.id]: {
          ...prev[currentSection.id][currentQuestion.id],
          answer: val
        }
      }
    }));
  };

  const saveAndNext = () => {
    const hasAnswer = currentResponse.answer !== null && currentResponse.answer !== '';
    
    setResponses((prev: any) => ({
      ...prev,
      [currentSection.id]: {
        ...prev[currentSection.id],
        [currentQuestion.id]: {
          ...prev[currentSection.id][currentQuestion.id],
          status: hasAnswer ? 'answered' : 'skipped'
        }
      }
    }));
    
    goToNextQuestion();
  };

  const markForReviewAndNext = () => {
    setResponses((prev: any) => ({
      ...prev,
      [currentSection.id]: {
        ...prev[currentSection.id],
        [currentQuestion.id]: {
          ...prev[currentSection.id][currentQuestion.id],
          status: 'marked'
        }
      }
    }));
    
    goToNextQuestion();
  };

  const clearResponse = () => {
    setResponses((prev: any) => ({
      ...prev,
      [currentSection.id]: {
        ...prev[currentSection.id],
        [currentQuestion.id]: {
          ...prev[currentSection.id][currentQuestion.id],
          answer: null
        }
      }
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIdx < currentSection.questions.length - 1) {
      const nextQ = currentQuestionIdx + 1;
      setCurrentQuestionIdx(nextQ);
      
      // Mark as visited if unvisited
      setResponses((prev: any) => {
        const nextId = currentSection.questions[nextQ].id;
        const currentStat = prev[currentSection.id][nextId].status;
        if (currentStat === 'unvisited') {
          return {
            ...prev,
            [currentSection.id]: {
              ...prev[currentSection.id],
              [nextId]: { ...prev[currentSection.id][nextId], status: 'visited' }
            }
          };
        }
        return prev;
      });
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIdx(index);
    setResponses((prev: any) => {
      const nextId = currentSection.questions[index].id;
      const currentStat = prev[currentSection.id][nextId].status;
      if (currentStat === 'unvisited') {
        return {
          ...prev,
          [currentSection.id]: {
            ...prev[currentSection.id],
            [nextId]: { ...prev[currentSection.id][nextId], status: 'visited' }
          }
        };
      }
      return prev;
    });
  };

  // Calculate palette stats
  let answered = 0, marked = 0, unvisited = 0, skipped = 0;
  currentSection.questions.forEach(q => {
    const s = responses[currentSection.id]?.[q.id]?.status;
    if (s === 'answered') answered++;
    else if (s === 'marked') marked++;
    else if (s === 'skipped' || s === 'visited') skipped++; // visited without answering counts as skipped visually until answered
    else unvisited++;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-[#111116] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-xl">{mockData.name}</h1>
          <div className="flex bg-white/5 rounded-lg p-1">
            {mockData.sections.map((sec, i) => (
              <button 
                key={sec.id} 
                onClick={() => {
                  setCurrentSectionIdx(i);
                  setCurrentQuestionIdx(0);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${i === currentSectionIdx ? 'bg-blue-600 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                {sec.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg text-red-400 font-mono text-xl font-bold">
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-colors"
          >
            Submit Early
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Question Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-73px)] overflow-y-auto">
          <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <h2 className="text-xl font-bold">Question {currentQuestionIdx + 1}</h2>
              <div className="text-sm font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full">
                {currentQuestion.type === 'mcq' ? '+3 / -1' : '+3 / 0'}
              </div>
            </div>

            <div className="prose prose-invert prose-blue max-w-none mb-10 text-lg leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {currentQuestion.text}
              </ReactMarkdown>
            </div>

            {currentQuestion.type === 'mcq' ? (
              <div className="space-y-3">
                {currentQuestion.options.map((opt: string, i: number) => {
                  const isSelected = currentResponse.answer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4
                        ${isSelected ? 'bg-blue-600/20 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5
                        ${isSelected ? 'border-blue-400 bg-blue-500/20' : 'border-white/30'}`}
                      >
                        {isSelected && <div className="w-3 h-3 rounded-full bg-blue-400" />}
                      </div>
                      <span className="text-base">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {opt}
                        </ReactMarkdown>
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm text-white/60">Type your answer below:</label>
                <input 
                  type="text" 
                  value={currentResponse.answer || ''}
                  onChange={(e) => handleTitaChange(e.target.value)}
                  className="w-full max-w-sm bg-white/5 border border-white/20 p-4 rounded-xl text-xl focus:outline-none focus:border-blue-500"
                  placeholder="Enter value"
                />
              </div>
            )}
          </div>

          {/* Bottom Actions Bar */}
          <div className="bg-[#111116] border-t border-white/10 p-4 flex items-center justify-between mt-auto">
            <div className="flex gap-3">
              <button onClick={clearResponse} className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-colors font-medium text-white/80">
                Clear Response
              </button>
              <button onClick={markForReviewAndNext} className="px-6 py-3 border border-violet-500/50 bg-violet-500/10 text-violet-400 rounded-xl hover:bg-violet-500/20 transition-colors font-medium flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> Mark for Review & Next
              </button>
            </div>
            <button onClick={saveAndNext} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg transition-colors flex items-center gap-2">
              Save & Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Palette */}
        <div className="w-80 bg-[#111116] border-l border-white/10 flex flex-col h-[calc(100vh-73px)]">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center text-white">{answered}</div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-rose-500 rounded-md flex items-center justify-center text-white">{skipped}</div> Not Answered</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gray-500 rounded-md flex items-center justify-center text-white">{unvisited}</div> Not Visited</div>
              <div className="flex items-center gap-2"><div className="w-6 h-6 bg-violet-500 rounded-md flex items-center justify-center text-white">{marked}</div> Marked</div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-white/80 mb-4">{currentSection.name}</h3>
            <div className="grid grid-cols-4 gap-2">
              {currentSection.questions.map((q, i) => {
                const s = responses[currentSection.id]?.[q.id]?.status;
                let bg = 'bg-gray-500'; // unvisited
                if (s === 'answered') bg = 'bg-emerald-500';
                else if (s === 'skipped' || s === 'visited') bg = 'bg-rose-500';
                else if (s === 'marked') bg = 'bg-violet-500';
                
                // If it is marked but has an answer, add a small green dot indicator (CAT style)
                const hasAnswer = responses[currentSection.id]?.[q.id]?.answer !== null && responses[currentSection.id]?.[q.id]?.answer !== '';
                
                const isCurrent = i === currentQuestionIdx;

                return (
                  <button 
                    key={q.id}
                    onClick={() => jumpToQuestion(i)}
                    className={`relative w-full aspect-square rounded-md flex items-center justify-center font-bold text-sm text-white shadow-sm transition-transform hover:scale-105
                      ${bg} ${isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111116]' : ''}`}
                  >
                    {i + 1}
                    {s === 'marked' && hasAnswer && (
                      <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-400 rounded-full border border-[#111116]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="relative bg-[#111116] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Submit Exam?</h2>
              <p className="text-white/60 mb-8">Are you sure you want to submit? You will not be able to return to the test.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 py-3 bg-white/5 rounded-xl hover:bg-white/10 font-medium">Cancel</button>
                <button onClick={submitExam} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white shadow-lg">Yes, Submit</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
