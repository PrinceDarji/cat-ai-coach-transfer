import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note, Flashcard, SectionType } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface NoteState {
  notes: Note[];
  
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'flashcards'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  
  addFlashcard: (noteId: string, flashcard: Omit<Flashcard, 'id' | 'noteId'>) => void;
  deleteFlashcard: (noteId: string, flashcardId: string) => void;
  
  getNotesBySection: (section: SectionType) => Note[];
  searchNotes: (query: string) => Note[];
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (note) => set((state) => ({
        notes: [...state.notes, { 
          id: generateId(), 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString(),
          flashcards: [],
          ...note, 
        }]
      })),
      
      updateNote: (id, updates) => set((state) => ({
        notes: state.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n)
      })),
      
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(n => n.id !== id)
      })),
      
      addFlashcard: (noteId, flashcard) => set((state) => ({
        notes: state.notes.map(n => n.id === noteId ? {
          ...n,
          flashcards: [...(n.flashcards || []), { ...flashcard, id: generateId(), noteId }],
          updatedAt: new Date().toISOString()
        } : n)
      })),
      
      deleteFlashcard: (noteId, flashcardId) => set((state) => ({
        notes: state.notes.map(n => n.id === noteId ? {
          ...n,
          flashcards: (n.flashcards || []).filter(f => f.id !== flashcardId),
          updatedAt: new Date().toISOString()
        } : n)
      })),
      
      getNotesBySection: (section) => get().notes.filter(n => n.section === section),
      
      searchNotes: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().notes.filter(n => 
          n.title.toLowerCase().includes(lowerQuery) || 
          n.content.toLowerCase().includes(lowerQuery) ||
          (n.tags && n.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
      }
    }),
    {
      name: 'cat-note-storage',
    }
  )
);
