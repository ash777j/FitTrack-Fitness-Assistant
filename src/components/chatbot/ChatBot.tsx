import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import ChatMessage from './ChatMessage';
import Input from '../ui/Input';

interface Message { id: string; text: string; sender: 'user' | 'bot'; timestamp: Date; }

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "Hi! I'm FitBot — your AI fitness coach. Ask me about workouts, recovery, or nutrition.",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: message, sender: 'user', timestamp: new Date() };
    setMessages(p => [...p, userMessage]);
    setMessage('');
    setIsThinking(true);
    setTimeout(() => {
      setMessages(p => [...p, {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsThinking(false);
    }, 1100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSend(); };

  const getBotResponse = (msg: string): string => {
    const l = msg.toLowerCase();
    if (l.includes('hi') || l.includes('hello') || l.includes('hey')) return "Hey there! I'm FitBot 💪 — your AI fitness coach. Ask me anything!";
    if (l.includes('bye') || l.includes('thanks')) return "Take care! Stay strong, stay consistent 👋";
    if (l.includes('belly fat'))   return "Combine 30 min daily cardio with core work (planks, crunches). Consistency beats intensity.";
    if (l.includes('muscle'))      return "Strength train 4–5x/week, eat 1.6–2.2g protein per kg, sleep 7–9 hours. Progressive overload is the key.";
    if (l.includes('meal plan'))   return "Try: breakfast — Greek yogurt + berries · lunch — grilled chicken + quinoa · dinner — tofu stir-fry · snack — almonds.";
    if (l.includes('protein'))     return "Aim for 1.6–2.2g per kg of bodyweight daily when training.";
    if (l.includes('sleep'))       return "Same bedtime daily, no screens 1h before, dark room, cool temperature. Magnesium helps.";
    if (l.includes('unmotivated')) return "Start with 5 minutes. Tiny wins compound. You don't need motivation — you need motion.";
    if (l.includes('home workout'))return "Push-ups, squats, planks, lunges, jumping jacks. A yoga mat is all you need to start.";
    return "I'm still learning! Try asking about workouts, muscle gain, nutrition, or recovery.";
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
          isOpen
            ? 'glass-strong text-white border-white/15'
            : 'bg-gradient-to-br from-primary to-primary-700 text-white shadow-glow border border-primary-300/40'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={20} />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary-200 border-2 border-ink-900">
            <span className="absolute inset-0 rounded-full bg-primary-200 animate-ping" />
          </span>
        )}
      </motion.button>

      {/* Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 w-full max-w-sm z-40"
          >
            <div className="glass-strong rounded-3xl shadow-glass overflow-hidden">
              {/* Header */}
              <div className="relative px-5 py-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full" />
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center border border-primary-300/40">
                      <Sparkles size={16} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">FitBot</div>
                    <div className="text-xs text-white/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
                      Online · AI fitness coach
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-4 py-4 h-80 overflow-y-auto bg-gradient-to-b from-transparent to-ink-900/30">
                {messages.map(m => (
                  <ChatMessage key={m.id} message={m.text} isBot={m.sender === 'bot'} />
                ))}
                {isThinking && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center border border-primary-300/40 shadow-glow">
                      <Sparkles size={14} />
                    </div>
                    <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary-300"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/8 flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask FitBot anything…"
                  className="!mb-0"
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  icon={<Send size={14} />}
                >
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;