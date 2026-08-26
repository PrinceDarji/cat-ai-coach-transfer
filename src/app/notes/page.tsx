'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit3, Trash2, Brain, Sparkles, BookOpen, ChevronRight, CheckCircle2, ChevronLeft, Save
} from 'lucide-react';
import { useNoteStore } from '@/lib/store/note-store';
// import removed
import { cn, generateId, formatDate } from '@/lib/utils';
import { useXPStore } from '@/lib/store/xp-store';

const DEMO_NOTES: any[] = [
  {
    id: 'n1',
    title: 'Important Number System Formulas',
    content: '1. Number of trailing zeroes in n! = sum of [n/5^k]\n2. Number of factors of p^a * q^b = (a+1)(b+1)\n3. Sum of factors = (p^(a+1)-1)/(p-1) * (q^(b+1)-1)/(q-1)\n4. Euler totient function for N = p^a * q^b is N(1 - 1/p)(1 - 1/q)\n5. Fermat\'s Little Theorem: a^(p-1) = 1 (mod p) where p is prime.',
    section: 'Quant',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    flashcards: [
      { id: 'f1', noteId: 'n1', front: 'Formula for trailing zeroes in n!', back: 'Sum of [n/5^k] for k=1,2,...', nextReview: new Date().toISOString() },
      { id: 'f2', noteId: 'n1', front: 'Number of factors of p^a * q^b', back: '(a+1)(b+1)', nextReview: new Date().toISOString() }
    ]
  },
  {
    id: 'n2',
    title: 'RC Tone Words Masterlist',
    content: 'Acerbic: harsh or severe in temper or expression\nBelligerent: hostile and aggressive\nCynical: believing that people are motivated by self-interest\nDidactic: intended to teach, particularly in having moral instruction\nEquivocal: open to more than one interpretation; ambiguous',
    section: 'VARC',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    flashcards: [
      { id: 'f3', noteId: 'n2', front: 'Acerbic (Meaning)', back: 'Harsh or severe in temper or expression', nextReview: new Date().toISOString() },
      { id: 'f4', noteId: 'n2', front: 'Didactic (Meaning)', back: 'Intended to teach, often morally', nextReview: new Date().toISOString() }
    ]
  }
];

export default function NotesPage() {
  const notes = useNoteStore((state) => state.notes);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const addFlashcard = useNoteStore((state) => state.addFlashcard);
  const deleteFlashcard = useNoteStore((state) => state.deleteFlashcard);

  const addXP = useXPStore((state) => state.addXP);
  
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState('');
  const [filterSection, setFilterSection] = useState('All');
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editSection, setEditSection] = useState<'Quant'|'LRDI'|'VARC'>('Quant');

  const [viewMode, setViewMode] = useState<'editor' | 'flashcards' | 'quiz'>('editor');
  
  // Flashcard viewer state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (useNoteStore.getState().notes.length === 0) {
      useNoteStore.setState({ notes: DEMO_NOTES });
      setActiveNoteId(DEMO_NOTES[0].id);
    } else {
      setActiveNoteId(useNoteStore.getState().notes[0]?.id || null);
    }
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
      const matchSection = filterSection === 'All' || n.section === filterSection;
      return matchSearch && matchSection;
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes, search, filterSection]);

  const activeNote = useMemo(() => notes.find(n => n.id === activeNoteId), [notes, activeNoteId]);
  
  const totalFlashcards = useMemo(() => notes.reduce((acc, n) => acc + (n.flashcards?.length || 0), 0), [notes]);

  const handleCreateNote = () => {
    const newNote: any = {
      id: generateId(),
      title: 'New Note',
      content: '',
      section: 'Quant',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      flashcards: []
    };
    addNote(newNote);
    setActiveNoteId(newNote.id);
    startEditing(newNote);
  };

  const startEditing = (note: any) => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditSection(note.section);
    setIsEditing(true);
    setViewMode('editor');
  };

  const handleSave = () => {
    if (activeNote) {
      updateNote(activeNote.id, {
        title: editTitle,
        content: editContent,
        section: editSection,
        updatedAt: new Date().toISOString()
      });
      setIsEditing(false);
      addXP('revision', 'Saved a note');
    }
  };

  const handleAIAssess = async () => {
    if (!activeNote || !activeNote.content) return;
    
    const originalContent = activeNote.content;
    updateNote(activeNote.id, {
      content: originalContent + "\n\n--- AI Assessment ---\nEvaluating...",
    });

    try {
      const response = await fetch('/api/evaluate-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: activeNote.title,
          content: originalContent
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        updateNote(activeNote.id, {
          content: originalContent + "\n\n--- AI Assessment ---\n" + data.evaluation,
          updatedAt: new Date().toISOString()
        });
        addXP('revision', 'Used AI Assess');
      } else {
        updateNote(activeNote.id, {
          content: originalContent + "\n\n--- AI Assessment ---\nFailed to reach AI.",
          updatedAt: new Date().toISOString()
        });
      }
    } catch (e) {
      updateNote(activeNote.id, {
        content: originalContent + "\n\n--- AI Assessment ---\nFailed to reach AI.",
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleGenerateFlashcards = () => {
    if (!activeNote) return;
    // Mock generation
    const newCards: any[] = [
      { id: generateId(), front: 'What is the main concept of this note?', back: 'Automatically generated answer based on content.', nextReview: new Date().toISOString() },
      { id: generateId(), front: 'Key formula or term?', back: 'Generated explanation.', nextReview: new Date().toISOString() }
    ];
    newCards.forEach(c => addFlashcard(activeNote.id, c));
    addXP('revision', 'Generated Flashcards');
  };

  const handleCreateQuiz = () => {
    if (!activeNote) return;
    setQuizQuestions([
      { q: 'Which of the following is discussed in this note?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correct: 1 },
      { q: 'What is the primary formula mentioned?', options: ['x + y', 'x - y', 'x * y', 'x / y'], correct: 2 },
      { q: 'Select the correct statement based on the text.', options: ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'], correct: 0 }
    ]);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setViewMode('quiz');
  };

  if (!isClient) return <div className="min-h-screen p-8 flex justify-center items-center"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6 bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Notes & Flashcards</h1>
          <p className="text-white/60 mt-2">Your second brain for CAT prep.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 mr-4">
            <div className="text-right">
              <p className="text-xs text-white/50">Total Notes</p>
              <p className="font-bold text-lg">{notes.length}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50">Flashcards</p>
              <p className="font-bold text-lg text-emerald-400">{totalFlashcards}</p>
            </div>
          </div>
          <button 
            onClick={handleCreateNote}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 transition-colors rounded-xl font-medium shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-5 h-5" />
            Create Note
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <select 
            value={filterSection} onChange={e => setFilterSection(e.target.value)} 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Sections</option>
            <option value="Quant">Quant</option>
            <option value="LRDI">LRDI</option>
            <option value="VARC">VARC</option>
          </select>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <AnimatePresence>
              {filteredNotes.map(note => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setIsEditing(false);
                    setViewMode('editor');
                  }}
                  className={cn(
                    "p-4 rounded-xl cursor-pointer transition-all border",
                    activeNoteId === note.id 
                      ? "bg-white/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10" 
                      : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate pr-2 text-sm">{note.title}</h3>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap",
                      note.section === 'Quant' ? 'bg-blue-500/20 text-blue-400' :
                      note.section === 'LRDI' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-rose-500/20 text-rose-400'
                    )}>
                      {note.section}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                    {note.content || "Empty note"}
                  </p>
                  <div className="mt-3 flex justify-between items-center text-[10px] text-white/40">
                    <span>{formatDate(note.updatedAt)}</span>
                    <div className="flex gap-2">
                      {note.flashcards && note.flashcards.length > 0 && (
                        <span className="flex items-center gap-1 text-emerald-400/70"><BookOpen className="w-3 h-3"/> {note.flashcards.length}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredNotes.length === 0 && (
              <div className="text-center py-10 text-white/40 text-sm">No notes found.</div>
            )}
          </div>
        </div>

        {/* Editor / Viewer Area */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden relative">
          {activeNote ? (
            <>
              {/* Header Actions */}
              <div className="border-b border-white/10 p-4 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <button onClick={() => setViewMode('editor')} className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", viewMode === 'editor' ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5")}>Editor</button>
                  <button onClick={() => { setViewMode('flashcards'); setCurrentCardIndex(0); setIsFlipped(false); }} className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", viewMode === 'flashcards' ? "bg-white/10 text-emerald-400" : "text-white/50 hover:bg-white/5")}>Flashcards ({activeNote.flashcards?.length || 0})</button>
                </div>
                
                {viewMode === 'editor' && (
                  <div className="flex items-center gap-2">
                    <button onClick={handleAIAssess} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors flex items-center gap-1"><Sparkles className="w-4 h-4"/> AI Assess</button>
                    <button onClick={handleGenerateFlashcards} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1"><Brain className="w-4 h-4"/> Flashcards</button>
                    <button onClick={handleCreateQuiz} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors">Quiz</button>
                    {!isEditing ? (
                      <button onClick={() => startEditing(activeNote)} className="p-2 rounded-lg hover:bg-white/10 text-white/70 transition-colors"><Edit3 className="w-4 h-4"/></button>
                    ) : (
                      <button onClick={handleSave} className="p-2 rounded-lg hover:bg-white/10 text-emerald-400 transition-colors"><Save className="w-4 h-4"/></button>
                    )}
                    <button onClick={() => { deleteNote(activeNote.id); setActiveNoteId(null); }} className="p-2 rounded-lg hover:bg-rose-500/20 text-rose-400 transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                )}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {viewMode === 'editor' && (
                  <div className="max-w-3xl mx-auto h-full flex flex-col">
                    {isEditing ? (
                      <div className="space-y-4 h-full flex flex-col">
                        <input 
                          type="text" 
                          value={editTitle} onChange={e => setEditTitle(e.target.value)}
                          className="w-full bg-transparent text-3xl font-bold focus:outline-none placeholder-white/20 border-b border-transparent focus:border-white/10 pb-2"
                          placeholder="Note Title"
                        />
                        <select 
                          value={editSection} onChange={e => setEditSection(e.target.value as any)}
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none w-fit"
                        >
                          <option value="Quant">Quant</option>
                          <option value="LRDI">LRDI</option>
                          <option value="VARC">VARC</option>
                        </select>
                        <textarea
                          value={editContent} onChange={e => setEditContent(e.target.value)}
                          className="flex-1 w-full bg-transparent text-base font-mono leading-relaxed focus:outline-none resize-none placeholder-white/20 mt-4"
                          placeholder="Start typing your notes here..."
                        />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-3xl font-bold mb-3">{activeNote.title}</h2>
                          <div className="flex items-center gap-3 text-sm text-white/50">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              activeNote.section === 'Quant' ? 'bg-blue-500/20 text-blue-400' :
                              activeNote.section === 'LRDI' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-rose-500/20 text-rose-400'
                            )}>{activeNote.section}</span>
                            <span>Last edited {formatDate(activeNote.updatedAt)}</span>
                          </div>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed bg-transparent p-0 m-0">
                            {activeNote.content}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'flashcards' && (
                  <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
                    {(!activeNote.flashcards || activeNote.flashcards.length === 0) ? (
                      <div className="text-center">
                        <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-medium">No Flashcards Yet</h3>
                        <p className="text-white/50 mt-2 mb-6">Generate flashcards from your note using AI.</p>
                        <button onClick={handleGenerateFlashcards} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors">
                          Generate Flashcards
                        </button>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="text-center mb-6 text-white/50 font-medium">
                          Card {currentCardIndex + 1} of {activeNote.flashcards.length}
                        </div>
                        <div 
                          className="relative h-80 w-full perspective-1000 cursor-pointer group"
                          onClick={() => setIsFlipped(!isFlipped)}
                        >
                          <motion.div 
                            className="w-full h-full relative preserve-3d transition-transform duration-500"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl group-hover:border-emerald-500/50 transition-colors">
                              <h4 className="text-sm font-medium text-white/40 uppercase tracking-widest absolute top-6">Question</h4>
                              <p className="text-2xl font-medium">{activeNote.flashcards[currentCardIndex].front}</p>
                              <p className="text-xs text-white/30 absolute bottom-6">Click to flip</p>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl" style={{ transform: 'rotateY(180deg)' }}>
                              <h4 className="text-sm font-medium text-emerald-500/60 uppercase tracking-widest absolute top-6">Answer</h4>
                              <p className="text-xl text-emerald-100">{activeNote.flashcards[currentCardIndex].back}</p>
                              <div className="absolute bottom-6 flex gap-4">
                                <button className="px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-lg text-sm hover:bg-rose-500/30" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setTimeout(() => setCurrentCardIndex(Math.min(currentCardIndex + 1, activeNote.flashcards!.length - 1)), 200); }}>Hard</button>
                                <button className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setTimeout(() => setCurrentCardIndex(Math.min(currentCardIndex + 1, activeNote.flashcards!.length - 1)), 200); }}>Good</button>
                                <button className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); setTimeout(() => setCurrentCardIndex(Math.min(currentCardIndex + 1, activeNote.flashcards!.length - 1)), 200); }}>Easy</button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                          <button 
                            disabled={currentCardIndex === 0}
                            onClick={() => { setIsFlipped(false); setTimeout(() => setCurrentCardIndex(prev => prev - 1), 200); }}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => deleteFlashcard(activeNote.id, activeNote.flashcards![currentCardIndex].id)}
                            className="p-2 text-rose-400/50 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button 
                            disabled={currentCardIndex === activeNote.flashcards.length - 1}
                            onClick={() => { setIsFlipped(false); setTimeout(() => setCurrentCardIndex(prev => prev + 1), 200); }}
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {viewMode === 'quiz' && (
                  <div className="max-w-2xl mx-auto py-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold">AI Generated Quiz</h3>
                      {quizSubmitted && (
                        <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl font-bold">
                          Score: {Object.keys(quizAnswers).filter(k => quizAnswers[Number(k)] === quizQuestions[Number(k)].correct).length} / {quizQuestions.length}
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-8">
                      {quizQuestions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                          <p className="text-lg font-medium mb-4">{qIndex + 1}. {q.q}</p>
                          <div className="space-y-3">
                            {q.options.map((opt: string, oIndex: number) => {
                              const isSelected = quizAnswers[qIndex] === oIndex;
                              const isCorrect = oIndex === q.correct;
                              let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
                              
                              if (!quizSubmitted) {
                                btnClass += isSelected ? "bg-cyan-500/20 border-cyan-500/50" : "bg-white/5 border-white/10 hover:border-white/30";
                              } else {
                                if (isCorrect) btnClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 ";
                                else if (isSelected && !isCorrect) btnClass += "bg-rose-500/20 border-rose-500/50 text-rose-200 ";
                                else btnClass += "bg-white/5 border-white/5 opacity-50 ";
                              }

                              return (
                                <button 
                                  key={oIndex}
                                  disabled={quizSubmitted}
                                  onClick={() => setQuizAnswers({...quizAnswers, [qIndex]: oIndex})}
                                  className={btnClass}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!quizSubmitted && Object.keys(quizAnswers).length === quizQuestions.length && (
                      <div className="mt-8 flex justify-end">
                        <button 
                          onClick={() => { setQuizSubmitted(true); addXP('revision', 'Completed Quiz'); }}
                          className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-colors"
                        >
                          Submit Quiz
                        </button>
                      </div>
                    )}
                    {quizSubmitted && (
                      <div className="mt-8 flex justify-end">
                         <button 
                          onClick={() => setViewMode('editor')}
                          className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors"
                        >
                          Back to Note
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <BookOpen className="w-16 h-16 text-white/10 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Note Selected</h3>
              <p className="text-white/50 max-w-sm mb-6">Select a note from the sidebar or create a new one to start writing.</p>
              <button 
                onClick={handleCreateNote}
                className="px-6 py-3 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors rounded-xl font-medium"
              >
                Create New Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
