import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import Button from '../ui/Button';
import ChatMessage from './ChatMessage';
import Input from '../ui/Input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m FitBot 💪 — your personal guide to fitness, nutrition, and well-being. Ask me anything!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsThinking(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(message);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('good morning') || lowerCaseMessage.includes('good evening')) {
      return "Hey there! I'm FitBot 💪 — your personal guide to fitness, nutrition, and well-being. Ask me anything!";
    }

    // Goodbyes
    if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye') || lowerCaseMessage.includes('see you') || lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('talk later')) {
      return "Take care! Stay strong, stay healthy! 👋";
    }

    // Fitness Queries
    if (lowerCaseMessage.includes('how do i lose belly fat')) {
      return "For losing belly fat, combine cardio (like jogging or cycling) with core workouts (planks, crunches). Consistency is key!";
    }
    if (lowerCaseMessage.includes('suggest a workout plan')) {
      return "Beginner workout plan: \n- Monday: Full-body strength (bodyweight) \n- Tuesday: 20-min walk + stretching \n- Wednesday: Rest or yoga \n- Thursday: Lower body focus \n- Friday: Cardio (HIIT or dance)";
    }
    if (lowerCaseMessage.includes('i want to gain muscle')) {
      return "To build muscle, aim for strength training 4–5 days a week and consume a high-protein diet with a slight calorie surplus.";
    }
    if (lowerCaseMessage.includes('whats a good routine for beginners')) {
      return "A good routine for beginners includes starting with bodyweight exercises and gradually increasing the intensity.";
    }
    if (lowerCaseMessage.includes('home workout tips')) {
      return "Home workout tips: Use bodyweight exercises, resistance bands, and household items for weights. Follow online tutorials for guidance.";
    }
    if (lowerCaseMessage.includes('what should i eat to lose weight')) {
      return "Stick to whole foods: leafy greens, lean proteins, and complex carbs. Cut down on sugar and fried items. Drink plenty of water.";
    }
    if (lowerCaseMessage.includes('give me a meal plan for weight loss')) {
      return "✔ *Breakfast*: Greek yogurt + berries  \n✔ *Lunch*: Grilled chicken + quinoa salad  \n✔ *Dinner*: Stir-fried tofu + veggies  \nSnack: Handful of almonds or boiled eggs.";
    }
    if (lowerCaseMessage.includes('best foods to gain muscle')) {
      return "Eat high-protein foods like eggs, chicken, lentils, cottage cheese, and protein shakes. Include healthy fats and complex carbs.";
    }
    if (lowerCaseMessage.includes('is keto a good diet')) {
      return "The keto diet can help with fat loss, but it may not suit everyone. It’s best under professional guidance.";
    }
    if (lowerCaseMessage.includes('how many calories should i eat')) {
      return "It depends on your goals, age, and activity. For weight loss, eat 10–20% fewer calories than you burn daily.";
    }
    if (lowerCaseMessage.includes('how much protein do i need')) {
      return "Aim for 1.6–2.2g of protein per kg of body weight daily if you're working out.";
    }
    if (lowerCaseMessage.includes('what are healthy snacks')) {
      return "Try nuts, fruits, boiled eggs, hummus with carrots, or Greek yogurt with honey.";
    }
    if (lowerCaseMessage.includes('should i avoid carbs')) {
      return "No need to avoid carbs entirely. Choose whole grains like oats, brown rice, and sweet potatoes over refined ones.";
    }
    if (lowerCaseMessage.includes('i feel stressed and tired')) {
      return "Try deep breathing, short walks, or journaling. Take breaks and stay hydrated. Prioritize rest and seek support if needed.";
    }
    if (lowerCaseMessage.includes('how can i improve my sleep')) {
      return "Sleep tips:  \n- Go to bed/wake up at the same time  \n- No screens 1 hour before bed  \n- Avoid caffeine after 2 PM  \n- Keep your room dark and cool";
    }
    if (lowerCaseMessage.includes('i feel unmotivated')) {
      return "Start small. Even 5 minutes of movement helps. Set one tiny, achievable goal today. Progress, not perfection!";
    }
    if (lowerCaseMessage.includes('how to stay mentally healthy')) {
      return "Eat well, sleep 7–9 hours, exercise regularly, and connect with others. Journaling and mindfulness also help.";
    }
    if (lowerCaseMessage.includes('what to do when i feel anxious')) {
      return "Take 5 deep breaths, journal how you feel, or go for a walk. Avoid stimulants and practice grounding techniques.";
    }
    if (lowerCaseMessage.includes('is meditation useful')) {
      return "Yes, daily meditation (even 5–10 mins) reduces stress, improves focus, and boosts mental clarity.";
    }
    if (lowerCaseMessage.includes('i feel overwhelmed')) {
      return "Break tasks into smaller chunks. Prioritize 1–2 things only. Take breaks and don’t hesitate to ask for help.";
    }
    if (lowerCaseMessage.includes('morning routine for mental health')) {
      return "Try this:  \n1. Wake early  \n2. 5 mins of gratitude  \n3. Light stretching  \n4. Nutritious breakfast  \n5. Set your top 3 daily goals";
    }
    if (lowerCaseMessage.includes('whats a good workout routine for beginners')) {
      return "Start with 3–4 days/week. Focus on:  \n- Day 1: Full-body strength (bodyweight)  \n- Day 2: 20-min walk + stretching  \n- Day 3: Rest or yoga  \n- Day 4: Cardio (cycling, brisk walking)";
    }
    if (lowerCaseMessage.includes('how do i lose belly fat')) {
      return "Combine regular cardio (30 min daily) with core exercises and a clean diet. Sleep and stress also affect fat loss.";
    }
    if (lowerCaseMessage.includes('best exercises to build muscle')) {
      return "Focus on compound lifts like squats, deadlifts, bench press, and pull-ups. Train 4–5x per week.";
    }
    if (lowerCaseMessage.includes('can i work out at home')) {
      return "Absolutely! Use bodyweight routines: push-ups, squats, planks, lunges, jumping jacks. A yoga mat is all you need to start.";
    }
    if (lowerCaseMessage.includes('how often should i exercise')) {
      return "Aim for 3–5 days/week depending on your goals and recovery. Mix strength and cardio.";
    }
    if (lowerCaseMessage.includes('how long should i work out daily')) {
      return "30–60 minutes is ideal. Consistency matters more than duration.";
    }
    if (lowerCaseMessage.includes('is walking enough for fitness')) {
      return "Yes, especially for beginners. Try brisk walking 30 mins/day and build from there.";
    }
    if (lowerCaseMessage.includes('i want to tone my body')) {
      return "Focus on high-rep resistance training and combine it with cardio. Keep your diet clean and protein-rich.";
    }
    if (lowerCaseMessage.includes('tips for staying consistent with workouts')) {
      return "Set realistic goals, track progress, and make it enjoyable. Music, a buddy, or an app can help you stay motivated.";
    }

    // Fallback response
    return "I'm still learning! Try asking about fitness, weight loss, workouts, or hydration.";
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full z-40 transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-neon-blue hover:bg-neon-blue/80 hover:shadow-neon-blue'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-sm bg-background-secondary border border-metallic-dark rounded-lg shadow-lg z-40 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-background-tertiary p-4 border-b border-metallic-dark">
            <h3 className="font-semibold">FitBot 💬</h3>
            <p className="text-xs text-text-secondary">Your fitness assistant</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                isBot={msg.sender === 'bot'}
              />
            ))}
            {isThinking && (
              <div className="flex mb-4 justify-start">
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center">
                    <Bot size={16} className="text-background-primary" />
                  </div>
                </div>
                <div className="max-w-[80%] px-4 py-2 rounded-lg bg-background-tertiary text-text-primary border border-metallic-dark">
                  FitBot is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-metallic-dark flex">
            <Input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 bg-background-tertiary border border-metallic-dark rounded-l-md py-2 px-3 focus:outline-none focus:border-neon-blue text-text-primary"
            />
            <Button
              onClick={handleSend}
              className="rounded-l-none"
              disabled={!message.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
