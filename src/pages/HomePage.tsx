import React from 'react';
 import { useNavigate } from 'react-router-dom';
 import { Dumbbell, Zap, BarChart2, Trophy, Calendar } from 'lucide-react';
 import Button from '../components/ui/Button';
 import Card from '../components/ui/Card';
 

 interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: 'blue' | 'green';
 }
 

 const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, link, color }) => {
  const navigate = useNavigate();
  
  return (
  <Card 
  neonBorder={color} 
  className="p-6 cursor-pointer hover:translate-y-[-5px] transition-all duration-300"
  onClick={() => navigate(link)}
  >
  <div className={`text-${color === 'blue' ? 'neon-blue' : 'neon-green'} mb-3`}>
  {icon}
  </div>
  <h3 className="text-lg font-semibold mb-2">{title}</h3>
  <p className="text-text-secondary text-sm">{description}</p>
  </Card>
  );
 };
 

 const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
  return (
  <div className="min-h-screen pt-20 pb-10 px-4">
  <div className="max-w-6xl mx-auto">
  {/* Welcome Section */}
  <div className="mb-8 flex items-center justify-between">
  <div>
  <h1 className="text-3xl font-bold mb-2">
  Welcome back, <span className="text-neon-green">Fitness Warrior</span>
  </h1>
  <p className="text-text-secondary">Ready to crush your fitness goals today?</p>
  </div>
  <img 
  src="https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg"
  alt="Motivation"
  className="w-32 h-32 rounded-full object-cover border-4 border-neon-blue"
  />
  </div>
  
  {/* Motivational Quote */}
  <Card className="p-6 mb-8 text-center bg-gradient-to-r from-background-secondary to-background-tertiary">
  <p className="text-xl italic text-neon-blue">
  "The only bad workout is the one that didn't happen."
  </p>
  </Card>
  
  {/* Dashboard Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <DashboardCard
  title="Fitness Plan"
  description="View and customize your personalized workout plan"
  icon={<Calendar size={24} />}
  link="/fitness-plan"
  color="green"
  />
  <DashboardCard
  title="Workout Tracker"
  description="Log and monitor your daily exercise progress"
  icon={<Dumbbell size={24} />}
  link="/workout-tracker"
  color="blue"
  />
  <DashboardCard
  title="Progress Stats"
  description="Visualize your fitness journey with detailed analytics"
  icon={<BarChart2 size={24} />}
  link="/progress"
  color="green"
  />
  <DashboardCard
  title="Achievements"
  description="Check your badges and ranking on the leaderboard"
  icon={<Trophy size={24} />}
  link="/gamification"
  color="blue"
  />
  <DashboardCard
  title="Quick Start"
  description="Jump into a guided workout session right now"
  icon={<Zap size={24} />}
  link="/workout-tracker"
  color="green"
  />
  </div>
  </div>
  </div>
  );
  }
 

  return (
  <div className="h-screen pt-16 overflow-hidden">
  <div className="h-full flex flex-col md:flex-row">
  {/* Hero Section */}
  <div className="flex-1 flex flex-col justify-center p-6 md:p-12 animate-fade-in">
  <h1 className="text-4xl md:text-6xl font-bold mb-4">
  Transform Your Body with <span className="text-neon-green">FitTrack</span>
  </h1>
  <p className="text-lg md:text-xl text-text-secondary mb-8">
  Your all-in-one fitness companion. Get personalized workouts, track progress, and achieve your goals.
  </p>
  <div className="flex flex-col sm:flex-row gap-4">
  <Button 
  variant="primary" 
  neonColor="green" 
  size="lg" 
  isAnimated
  onClick={() => navigate('/signup')}
  >
  Start Your Journey
  </Button>
  <Button 
  variant="outline" 
  neonColor="blue" 
  size="lg"
  onClick={() => navigate('/login')}
  >
  Welcome Back
  </Button>
  </div>
  </div>
  
  {/* Features Grid */}
  <div className="flex-1 p-6 md:p-12 flex items-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
  <Card neonBorder="blue" className="p-6 hover:translate-y-[-5px]">
  <div className="text-neon-blue mb-3">
  <Dumbbell size={24} />
  </div>
  <h3 className="text-lg font-semibold mb-2">Smart Workouts</h3>
  <p className="text-text-secondary text-sm">
  AI-powered workout plans tailored to your goals and preferences.
  </p>
  </Card>
  
  <Card neonBorder="green" className="p-6 hover:translate-y-[-5px]">
  <div className="text-neon-green mb-3">
  <BarChart2 size={24} />
  </div>
  <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
  <p className="text-text-secondary text-sm">
  Visual insights and analytics to monitor your fitness journey.
  </p>
  </Card>
  
  <Card neonBorder="green" className="p-6 hover:translate-y-[-5px]">
  <div className="text-neon-green mb-3">
  <Trophy size={24} />
  </div>
  <h3 className="text-lg font-semibold mb-2">Rewards</h3>
  <p className="text-text-secondary text-sm">
  Earn badges and compete on leaderboards as you achieve goals.
  </p>
  </Card>
  </div>
  </div>
  </div>
  </div>
  );
 };
 

 export default HomePage;
