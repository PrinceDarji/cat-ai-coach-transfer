'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, BrainCircuit, Calculator, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllPYQs, PYQ } from '@/lib/content/pyqs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function PYQHub() {
  const allPyqs = getAllPYQs();
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterSection, setFilterSection] = useState<string | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});

  const filteredPyqs = allPyqs.filter(q => {
    if (filterYear !== 'all' && q.year !== filterYear) return false;
    if (filterSection !== 'all' && q.section !== filterSection) return false;
    return true;
  });

  const getSectionIcon = (section: string) => {
    if (section === 'varc') return <BookOpen className="w-5 h-5 text-emerald-400" />;
    if (section === 'lrdi') return <BrainCircuit className="w-5 h-5 text-violet-400" />;
    return <Calculator className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-[#0a0a0f] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Previous Year Questions (PYQs)
          </h1>
          <p className="text-white/60 mt-2">
            Browse and practice official CAT questions from past years. Use the filters to find specific topics or years.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-[#111116] border border-white/10 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-white/50">
            <Filter className="w-4 h-4" /> Filters:
          </div>
          <select 
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Years</option>
            <option value="2025">CAT 2025</option>
            <option value="2024">CAT 2024</option>
            <option value="2023">CAT 2023</option>
          </select>

          <select 
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Sections</option>
            <option value="varc">VARC</option>
            <option value="lrdi">LRDI</option>
            <option value="quant">Quant</option>
          </select>
        </div>

        {/* List of PYQs */}
        <div className="space-y-4">
          {filteredPyqs.map(pyq => (
            <motion.div 
              key={pyq.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111116] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <div 
                className="p-5 cursor-pointer flex items-center justify-between"
                onClick={() => {
                  setExpandedId(expandedId === pyq.id ? null : pyq.id);
                  setShowSolution(null);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    {getSectionIcon(pyq.section)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">CAT {pyq.year} - Slot {pyq.slot}</h3>
                    <p className="text-sm text-white/50 uppercase tracking-wider">{pyq.section} • {pyq.topicId}</p>
                  </div>
                </div>
                <div>
                  {expandedId === pyq.id ? <ChevronUp className="w-5 h-5 text-white/40" /> : <ChevronDown className="w-5 h-5 text-white/40" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === pyq.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-white/[0.02]"
                  >
                    <div className="p-6 space-y-6">
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {pyq.text}
                        </ReactMarkdown>
                      </div>

                      {pyq.type === 'mcq' && pyq.options && (
                        <div className="space-y-3">
                          {pyq.options.map((opt, i) => {
                            const isSelected = userAnswers[pyq.id] === i;
                            const isCorrect = pyq.correctAnswer === i;
                            const showResult = showSolution === pyq.id;
                            
                            let bgClass = isSelected ? 'bg-blue-500/20 border-blue-500/50' : 'bg-[#1a1a24] border-white/10';
                            if (showResult) {
                              if (isCorrect) bgClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                              else if (isSelected && !isCorrect) bgClass = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                            }

                            return (
                              <button 
                                key={i} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (showSolution !== pyq.id) setUserAnswers(prev => ({...prev, [pyq.id]: i}));
                                }}
                                className={`w-full text-left p-4 rounded-xl border transition-colors ${bgClass}`}
                              >
                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                                  {opt}
                                </ReactMarkdown>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {pyq.type === 'tita' && (
                        <div className="space-y-3">
                          <input 
                            type="text"
                            placeholder="Type your answer here..."
                            value={(userAnswers[pyq.id] as string) || ''}
                            onChange={(e) => {
                              if (showSolution !== pyq.id) setUserAnswers(prev => ({...prev, [pyq.id]: e.target.value}));
                            }}
                            className="w-full bg-[#1a1a24] border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      )}

                      {showSolution === pyq.id ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-xl mt-6">
                          <h4 className="font-bold text-blue-400 mb-2">Solution</h4>
                          {pyq.type === 'tita' && (
                            <p className="mb-4 text-white/80">
                              Correct Answer: <strong>{pyq.correctAnswer}</strong>
                              <br/>
                              <span className={String(userAnswers[pyq.id]).trim().toLowerCase() === String(pyq.correctAnswer).trim().toLowerCase() ? 'text-emerald-400' : 'text-rose-400'}>
                                Your Answer: {userAnswers[pyq.id] || 'None'}
                              </span>
                            </p>
                          )}
                          <div className="text-blue-200/80 text-sm">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {pyq.explanation || 'Detailed explanation not available yet.'}
                            </ReactMarkdown>
                          </div>
                        </motion.div>
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowSolution(pyq.id); }}
                          className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                        >
                          Check Answer & Show Solution
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {filteredPyqs.length === 0 && (
            <div className="text-center py-12 text-white/40">
              No PYQs found for the selected filters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
