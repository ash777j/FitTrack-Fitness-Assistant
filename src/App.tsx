import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import ChatBot from './components/chatbot/ChatBot';

function App() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen text-text-primary overflow-x-hidden">
        {/* Layered stage background */}
        <div className="bg-stage" />

        {/* Animated orbs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="orb orb-blue   w-[600px] h-[600px] top-[-200px] left-[-200px] animate-orb-drift" />
          <div className="orb orb-cyan   w-[500px] h-[500px] bottom-[-180px] right-[-160px] animate-orb-drift" style={{ animationDelay: '-6s' }} />
          <div className="orb orb-violet w-[420px] h-[420px] top-[40%] left-[55%] animate-orb-drift opacity-40" style={{ animationDelay: '-12s' }} />
        </div>

        {/* Grid mask */}
        <div className="bg-grid" />

        {/* Mouse spotlight */}
        <div
          className="cursor-spotlight"
          style={{ left: pos.x, top: pos.y }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <footer className="relative z-10 py-10 px-6 text-center text-white/40 text-sm">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <span>© 2026 FitTrack Labs — AI Fitness Intelligence</span>
              <div className="flex items-center gap-6 text-white/40">
                <a href="#" className="hover:text-white/70 transition">Privacy</a>
                <a href="#" className="hover:text-white/70 transition">Terms</a>
                <a href="#" className="hover:text-white/70 transition">Status</a>
              </div>
            </div>
          </footer>
          <ChatBot />
        </div>
      </div>
    </Router>
  );
}

export default App;