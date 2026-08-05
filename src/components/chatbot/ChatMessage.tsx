import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex mb-3 gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
  >
    {isBot && (
      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center border border-primary-300/40 shadow-glow">
        <Bot size={14} className="text-white" />
      </div>
    )}
    <div
      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-xl ${
        isBot
          ? 'glass rounded-bl-md text-white'
          : 'bg-gradient-to-br from-primary/40 to-primary-700/40 border border-primary-300/40 rounded-br-md text-white shadow-glow'
      }`}
    >
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  </motion.div>
);

export default ChatMessage;