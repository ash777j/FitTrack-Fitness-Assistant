import React, { useState } from 'react';
import { Trophy, Award, Users, ArrowDown, ArrowUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Sample data for badges
const badgesData = [
  { id: 1, name: 'First Workout', description: 'Completed your first workout', icon: '🏋️', earned: true, date: '2023-04-15' },
  { id: 2, name: 'Week Streak', description: 'Worked out for 7 days in a row', icon: '🔥', earned: true, date: '2023-04-22' },
  { id: 3, name: 'Morning Person', description: 'Completed 5 workouts before 8 AM', icon: '🌅', earned: true, date: '2023-05-01' },
  { id: 4, name: 'Weight Loss', description: 'Lost 5kg since starting', icon: '⚖️', earned: false },
  { id: 5, name: 'Marathon', description: 'Ran a total of 42.2km', icon: '🏃', earned: false },
  { id: 6, name: 'Strength Guru', description: 'Lifted 5000kg total in one session', icon: '💪', earned: false },
  { id: 7, name: 'Nutrition Master', description: 'Logged meals for 30 days straight', icon: '🥗', earned: false },
  { id: 8, name: 'Early Achiever', description: 'Reached your first fitness goal', icon: '🎯', earned: false },
];

// Sample data for leaderboard
const leaderboardData = [
  { id: 1, name: 'Sarah Johnson', workouts: 32, streak: 15, badges: 6, avatar: '👩‍🦱' },
  { id: 2, name: 'You', workouts: 28, streak: 12, badges: 3, avatar: '👤', isUser: true },
  { id: 3, name: 'Michael Chen', workouts: 26, streak: 8, badges: 5, avatar: '👨' },
  { id: 4, name: 'Emma Wilson', workouts: 24, streak: 6, badges: 4, avatar: '👱‍♀️' },
  { id: 5, name: 'James Rodriguez', workouts: 22, streak: 4, badges: 3, avatar: '👨‍🦳' },
  { id: 6, name: 'Aisha Patel', workouts: 20, streak: 3, badges: 3, avatar: '👩' },
  { id: 7, name: 'David Kim', workouts: 18, streak: 0, badges: 2, avatar: '👨‍🦱' },
];

// Motivational quotes for the page
const motivationalQuotes = [
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Don't stop when you're tired. Stop when you're done.",
  "The hard days are the best because that's when champions are made.",
  "If it doesn't challenge you, it doesn't change you."
];

const GamificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard'>('badges');
  const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random() * motivationalQuotes.length));
  
  // Sort leaderboard by workouts desc
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.workouts - a.workouts);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Achievements & Rewards</h1>
          <p className="text-text-secondary">Track your badges and see how you rank against others</p>
        </div>
        
        {/* Motivational Quote */}
        <Card className="p-6 mb-8 text-center">
          <p className="text-xl italic text-neon-blue">"{motivationalQuotes[quoteIndex]}"</p>
          <Button 
            variant="outline" 
            neonColor="green" 
            size="sm" 
            className="mt-4"
            onClick={() => setQuoteIndex(prev => (prev + 1) % motivationalQuotes.length)}
          >
            New Quote
          </Button>
        </Card>
        
        {/* Tabs Navigation */}
        <div className="flex mb-6">
          <button
            className={`flex items-center px-4 py-2 border-b-2 ${
              activeTab === 'badges'
                ? 'border-neon-green text-neon-green'
                : 'border-transparent text-text-secondary hover:text-neon-blue'
            }`}
            onClick={() => setActiveTab('badges')}
          >
            <Award className="mr-2 h-5 w-5" />
            Badges
          </button>
          <button
            className={`flex items-center px-4 py-2 border-b-2 ${
              activeTab === 'leaderboard'
                ? 'border-neon-blue text-neon-blue'
                : 'border-transparent text-text-secondary hover:text-neon-blue'
            }`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="mr-2 h-5 w-5" />
            Leaderboard
          </button>
        </div>
        
        {/* Badge Content */}
        {activeTab === 'badges' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <Award className="mr-2 h-5 w-5 text-neon-green" />
                  Your Badges
                </h2>
                <p className="text-text-secondary">
                  {badgesData.filter(b => b.earned).length} / {badgesData.length} earned
                </p>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {badgesData.map(badge => (
                  <Card 
                    key={badge.id} 
                    className={`p-4 relative overflow-hidden ${!badge.earned && 'opacity-60'}`}
                    neonBorder={badge.earned ? 'green' : 'none'}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-text-secondary text-sm mb-2">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-neon-green text-xs">Earned on {badge.date}</p>
                      ) : (
                        <p className="text-text-secondary text-xs">Not yet earned</p>
                      )}
                    </div>
                    
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background-primary/70">
                        <div className="bg-background-secondary px-3 py-1 rounded-full text-text-secondary text-xs border border-metallic-dark">
                          Locked
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Leaderboard Content */}
        {activeTab === 'leaderboard' && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-neon-blue" />
                  Leaderboard
                </h2>
                <div className="flex items-center text-text-secondary text-sm">
                  <Users className="mr-1 h-4 w-4" />
                  {leaderboardData.length} participants
                </div>
              </div>
              
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-background-tertiary">
                        <th className="py-3 px-4 text-left text-text-secondary text-sm font-medium">Rank</th>
                        <th className="py-3 px-4 text-left text-text-secondary text-sm font-medium">User</th>
                        <th className="py-3 px-4 text-right text-text-secondary text-sm font-medium">Workouts</th>
                        <th className="py-3 px-4 text-right text-text-secondary text-sm font-medium">Streak</th>
                        <th className="py-3 px-4 text-right text-text-secondary text-sm font-medium">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedLeaderboard.map((user, index) => (
                        <tr 
                          key={user.id} 
                          className={`
                            border-b border-metallic-dark 
                            ${user.isUser ? 'bg-neon-blue/10' : 'hover:bg-background-tertiary/50'}
                          `}
                        >
                          <td className="py-4 px-4 text-left">
                            {index === 0 ? (
                              <div className="text-yellow-400 font-bold flex items-center">
                                <Trophy className="h-4 w-4 mr-1" /> 1
                              </div>
                            ) : index === 1 ? (
                              <div className="text-gray-300 font-bold flex items-center">
                                <Trophy className="h-4 w-4 mr-1" /> 2
                              </div>
                            ) : index === 2 ? (
                              <div className="text-amber-600 font-bold flex items-center">
                                <Trophy className="h-4 w-4 mr-1" /> 3
                              </div>
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-left">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">{user.avatar}</span>
                              <span className={user.isUser ? 'font-semibold text-neon-blue' : ''}>{user.name}</span>
                              {user.isUser && <span className="ml-2 text-xs bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-full">You</span>}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-medium">{user.workouts}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end">
                              <span className={user.streak > 0 ? 'text-neon-green' : 'text-text-secondary'}>
                                {user.streak} days
                              </span>
                              {user.streak > 0 && <span className="ml-1">🔥</span>}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end">
                              <span>{user.badges}</span>
                              <Award className="h-4 w-4 ml-1 text-neon-blue" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            <Card className="p-4 bg-background-tertiary text-center">
              <p className="text-text-secondary mb-2">Keep working out to climb up the leaderboard!</p>
              <p className="text-sm">
                Next milestone: 
                <span className="text-neon-green ml-1">
                  {sortedLeaderboard.find(user => user.isUser)?.workouts! + 1} workouts
                </span>
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationPage;
