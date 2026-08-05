import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Users, Lock, Sparkles, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const badgesData = [
  { id: 1, name: 'First Workout',    description: 'Completed your first workout',                   icon: '🏋️', earned: true,  date: '2023-04-15' },
  { id: 2, name: 'Week Streak',      description: 'Worked out for 7 days in a row',                 icon: '🔥', earned: true,  date: '2023-04-22' },
  { id: 3, name: 'Morning Person',   description: 'Completed 5 workouts before 8 AM',               icon: '🌅', earned: true,  date: '2023-05-01' },
  { id: 4, name: 'Weight Loss',      description: 'Lost 5kg since starting',                        icon: '⚖️', earned: false },
  { id: 5, name: 'Marathon',         description: 'Ran a total of 42.2km',                          icon: '🏃', earned: false },
  { id: 6, name: 'Strength Guru',    description: 'Lifted 5000kg total in one session',             icon: '💪', earned: false },
  { id: 7, name: 'Nutrition Master', description: 'Logged meals for 30 days straight',              icon: '🥗', earned: false },
  { id: 8, name: 'Early Achiever',   description: 'Reached your first fitness goal',                icon: '🎯', earned: false }
];
const leaderboardData = [
  { id: 1, name: 'Sarah Johnson',    workouts: 32, streak: 15, badges: 6, avatar: '👩‍🦱' },
  { id: 2, name: 'You',              workouts: 28, streak: 12, badges: 3, avatar: '👤', isUser: true },
  { id: 3, name: 'Michael Chen',     workouts: 26, streak:  8, badges: 5, avatar: '👨' },
  { id: 4, name: 'Emma Wilson',      workouts: 24, streak:  6, badges: 4, avatar: '👱‍♀️' },
  { id: 5, name: 'James Rodriguez',  workouts: 22, streak:  4, badges: 3, avatar: '👨‍🦳' },
  { id: 6, name: 'Aisha Patel',      workouts: 20, streak:  3, badges: 3, avatar: '👩' },
  { id: 7, name: 'David Kim',        workouts: 18, streak:  0, badges: 2, avatar: '👨‍🦱' }
];
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
  const sorted = [...leaderboardData].sort((a, b) => b.workouts - a.workouts);
  const earnedCount = badgesData.filter(b => b.earned).length;

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
          <div className="chip mb-5">
            <Sparkles size={12} className="text-primary-200" />
            Achievements
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tightest">
            Rewards & <span className="text-gradient-blue">ranking</span>
          </h1>
          <p className="text-white/55 mt-3 max-w-md">Track your badges, see how you rank against others, stay motivated.</p>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card variant="strong" glow className="p-8 md:p-10 text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 blur-3xl rounded-full pointer-events-none" />
            <p className="relative text-2xl md:text-3xl font-light italic leading-relaxed max-w-2xl mx-auto text-gradient-blue">
              "{motivationalQuotes[quoteIndex]}"
            </p>
            <div className="relative mt-6">
              <Button variant="ghost" size="sm" icon={<RefreshCw size={12} />} onClick={() => setQuoteIndex(p => (p + 1) % motivationalQuotes.length)}>
                New quote
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-full glass-soft border border-white/8 w-fit">
          {([
            { key: 'badges',      label: 'Badges',      icon: <Award size={14} /> },
            { key: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={14} /> }
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm rounded-full transition-all ${
                activeTab === t.key
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'badges' ? (
            <motion.div key="badges" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-medium">Your collection</h2>
                <span className="text-sm text-white/55">{earnedCount} of {badgesData.length} earned</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {badgesData.map((badge, i) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className={`p-5 text-center relative overflow-hidden h-full ${!badge.earned ? 'opacity-55' : 'hover:shadow-glow'}`}>
                      <div className="text-5xl mb-3">{badge.icon}</div>
                      <h3 className="text-sm font-medium mb-1 text-white">{badge.name}</h3>
                      <p className="text-xs text-white/50 leading-relaxed mb-3">{badge.description}</p>
                      {badge.earned ? (
                        <p className="text-[10px] uppercase tracking-wider text-primary-200">Earned {badge.date}</p>
                      ) : (
                        <p className="text-[10px] uppercase tracking-wider text-white/35">Locked</p>
                      )}
                      {!badge.earned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-ink-900/65 backdrop-blur-[2px]">
                          <div className="glass-soft px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-white/60">
                            <Lock size={11} /> Locked
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="lb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <Card variant="strong" className="overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-white/8">
                  <h2 className="text-xl font-medium flex items-center gap-2">
                    <Trophy size={18} className="text-primary-300" /> Top athletes
                  </h2>
                  <div className="flex items-center gap-1.5 text-sm text-white/55">
                    <Users size={14} /> {leaderboardData.length} participants
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/3 text-xs uppercase tracking-wider text-white/45">
                        <th className="py-3 px-6 text-left">Rank</th>
                        <th className="py-3 px-6 text-left">Athlete</th>
                        <th className="py-3 px-6 text-right">Workouts</th>
                        <th className="py-3 px-6 text-right">Streak</th>
                        <th className="py-3 px-6 text-right">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border-t border-white/6 transition-colors ${
                            user.isUser ? 'bg-primary/8' : 'hover:bg-white/3'
                          }`}
                        >
                          <td className="py-4 px-6">
                            {index < 3 ? (
                              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${
                                index === 0 ? 'bg-primary/20 border border-primary/40 shadow-glow' :
                                index === 1 ? 'bg-white/8 border border-white/15' :
                                              'bg-white/5 border border-white/10'
                              }`}>
                                <span className={`font-mono text-sm ${
                                  index === 0 ? 'text-primary-200' : 'text-white/65'
                                }`}>{index + 1}</span>
                              </div>
                            ) : (
                              <span className="font-mono text-sm text-white/45 ml-3">{index + 1}</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{user.avatar}</span>
                              <div>
                                <div className={`text-sm ${user.isUser ? 'text-primary-200 font-medium' : 'text-white'}`}>{user.name}</div>
                              </div>
                              {user.isUser && (
                                <span className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary-200 px-2 py-0.5 rounded-full border border-primary/30">You</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-mono text-sm text-white">{user.workouts}</td>
                          <td className="py-4 px-6 text-right">
                            <span className={`font-mono text-sm ${user.streak > 0 ? 'text-primary-200' : 'text-white/40'}`}>
                              {user.streak}d {user.streak > 0 && '🔥'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <span className="inline-flex items-center gap-1.5 font-mono text-sm text-white">
                              {user.badges} <Award size={12} className="text-primary-300" />
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5">
                <Card className="p-5 text-center text-sm text-white/65">
                  Next milestone: <span className="text-primary-200 font-mono ml-1">{sorted.find(u => u.isUser)!.workouts + 1} workouts</span> — keep going.
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamificationPage;