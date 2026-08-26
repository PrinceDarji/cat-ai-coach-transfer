import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/lib/types';
import { generateId } from '@/lib/utils';

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (contentUpdate: string) => void;
  setTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  getLastMessage: () => ChatMessage | null;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, { ...message, id: generateId(), timestamp: new Date().toISOString() }]
      })),
      
      updateLastMessage: (contentUpdate: string) => set((state) => {
        if (state.messages.length === 0) return state;
        const newMsgs = [...state.messages];
        newMsgs[newMsgs.length - 1].content += contentUpdate;
        return { messages: newMsgs };
      }),
      
      setTyping: (isTyping) => set({ isTyping }),
      
      clearMessages: () => set({ messages: [] }),
      
      getLastMessage: () => {
        const messages = get().messages;
        if (messages.length === 0) return null;
        return messages[messages.length - 1];
      }
    }),
    {
      name: 'cat-chat-storage',
    }
  )
);
