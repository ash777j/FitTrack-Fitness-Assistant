import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import ChatBot from './components/chatbot/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background-primary flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
