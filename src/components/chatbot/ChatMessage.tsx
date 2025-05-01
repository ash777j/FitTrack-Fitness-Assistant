import React from 'react';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot }) => {
  return (
    <div className={`flex mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center">
            <Bot size={16} className="text-background-primary" />
          </div>
        </div>
      )}
      
      <div 
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          isBot 
            ? 'bg-background-tertiary text-text-primary border border-metallic-dark' 
            : 'bg-neon-green/20 text-text-primary border border-neon-green/30'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
