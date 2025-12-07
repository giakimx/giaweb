import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Bot, ArrowRight, CornerDownLeft } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatBotProps {
  embedded?: boolean;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ embedded = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Ready to answer questions about Gia's work." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render the Embedded Card version
  if (embedded) {
    return (
      <div className="flex flex-col h-full bg-white rounded-xl border border-neutral-200 overflow-hidden relative transition-all duration-300 hover:border-neutral-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded border border-neutral-200 bg-white flex items-center justify-center">
                <Sparkles size={14} className="text-neutral-900" />
             </div>
             <div>
               <h3 className="font-mono-accent text-sm font-medium text-neutral-900 uppercase tracking-wide">AI_Assistant_v1.0</h3>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"></span>
                  <span className="text-[10px] text-neutral-500 font-mono-accent uppercase">Online</span>
               </div>
             </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto min-h-[200px] p-6 space-y-6 scrollbar-hide bg-white">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] font-mono-accent text-neutral-400 mb-1 uppercase tracking-wider">
                {msg.role === 'user' ? 'You' : 'Model'}
              </span>
              <div 
                className={`max-w-[90%] px-4 py-3 text-sm leading-relaxed border ${
                  msg.role === 'user' 
                    ? 'bg-neutral-900 text-white border-neutral-900 rounded-lg rounded-tr-none' 
                    : 'bg-white text-neutral-700 border-neutral-200 rounded-lg rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start">
               <span className="text-[10px] font-mono-accent text-neutral-400 mb-1 uppercase tracking-wider">Model</span>
               <div className="bg-neutral-50 border border-neutral-200 rounded-lg rounded-tl-none px-4 py-3 flex gap-1 items-center">
                <div className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-neutral-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about experience..."
              className="w-full bg-neutral-50 text-neutral-900 placeholder-neutral-400 text-sm rounded-lg pl-4 pr-12 py-3 border border-neutral-200 focus:border-neutral-400 focus:bg-white focus:ring-0 outline-none transition-all font-mono-accent"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-1.5 hover:bg-neutral-200 rounded transition-colors disabled:opacity-30"
            >
               {isLoading ? (
                 <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin"/> 
               ) : (
                 <CornerDownLeft size={16} className="text-neutral-900" />
               )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AIChatBot;