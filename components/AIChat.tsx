import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  ChevronsLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  React.useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: t('chat.welcome'),
        timestamp: Date.now(),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini API
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const responseText = await sendMessageToGemini(history, userMsg.text);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Tab (Center Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center py-12 px-1 transition-all duration-500 group bg-primary text-white hover:pr-1.5 ${
          isOpen ? 'translate-x-full pointer-events-none' : 'translate-x-0'
        } [clip-path:polygon(0_10%,100%_0,100%_100%,0_90%)]`}
        aria-label={t('chat.openLabel')}
      >
        <div className='flex flex-col items-center gap-2'>
          <ChevronsLeft className='w-5 h-5 group-hover:-translate-x-0.5 transition-transform' />
          <span className='[writing-mode:vertical-rl] font-black tracking-[0.3em] text-[16px] select-none leading-none'>
            Shape
          </span>
        </div>
      </button>

      {/* Chat Window (Sidebar style) */}
      <div
        className={`sticky top-0 z-50 h-screen bg-white flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden flex-shrink-0 ${
          isOpen ? 'w-full md:w-1/3 border-l border-gray-100' : 'w-0 border-l-0'
        }`}
      >
        {/* Header */}
        <div className='bg-white border-b border-gray-100 p-4 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 p-2 rounded-lg text-primary'>
              <Bot className='w-5 h-5' />
            </div>
            <div>
              <h3 className='font-bold text-sm text-dark'>
                {t('chat.heading')}
              </h3>
              <div className='flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse'></span>
                <p className='text-[10px] text-gray-400 uppercase tracking-wider font-semibold'>
                  {t('chat.online')}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-dark'
            title={t('chat.close')}
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Messages Area */}
        <div className='flex-1 overflow-y-auto p-6 bg-white space-y-6 scrollbar-hide'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className='flex items-center gap-2 mb-1 px-1'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-gray-300'>
                  {msg.role === 'user' ? t('chat.you') : t('chat.assistant')}
                </span>
              </div>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap max-w-[95%] ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-gray-50 text-gray-700 rounded-tl-none border border-gray-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className='flex flex-col items-start animate-pulse'>
              <div className='flex items-center gap-2 mb-1 px-1'>
                <span className='text-[10px] font-bold uppercase tracking-widest text-gray-300'>
                  {t('chat.assistant')}
                </span>
              </div>
              <div className='bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100'>
                <div className='flex gap-1.5'>
                  <span className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce'></span>
                  <span className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-75'></span>
                  <span className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-150'></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className='p-6 bg-white border-t border-gray-100'>
          <div className='relative group'>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.placeholder')}
              rows={2}
              className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm resize-none transition-all'
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className='absolute right-3 bottom-3 p-2 bg-primary text-white rounded-lg hover:bg-[#c03f0a] disabled:opacity-30 disabled:hover:bg-primary transition-all shadow-md active:scale-95'
            >
              <Send className='w-4 h-4' />
            </button>
          </div>
          <div className='mt-4 flex items-center justify-between'>
            <span className='text-[9px] text-gray-300 uppercase font-bold tracking-tighter'>
              {t('chat.poweredBy')}
            </span>
            <span className='text-[9px] text-gray-300 uppercase font-bold tracking-tighter'>
              {t('chat.bouyguesInfra')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
