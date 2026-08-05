import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Flame, Calendar, Dumbbell, Apple, ArrowRight, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface Workout { id: string; name: string; sets: string; reps: string; completed: boolean; }
interface DietTask { id: string; task: string; completed: boolean; }

const ProgressRing: React.FC<{ value: number; total: number }> = ({ value, total }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const pct = total === 0 ? 0 : Math.min(1, value / total);
  const offset = circumference * (1 - pct);
  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2EA7FF" />
            <stop offset="100%" stopColor="#64C9FF" />
          </linearGradient>
        </defs>
        <circle cx="64" cy="64" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="64" cy="64" r={radius}
          stroke="url(#ringGrad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-light tracking-tight text-white">{Math.round(pct * 100)}%</div>
        <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">Complete</div>
      </div>
    </div>
  );
};

const WorkoutTrackerPage: React.FC = () => {
  const [fitnessPlan, setFitnessPlan] = useState<any>(null);
  const [dailyWorkouts, setDailyWorkouts] = useState<Workout[]>([]);
  const [dailyDietTasks, setDailyDietTasks] = useState<DietTask[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('fitnessPlan');
    if (stored) {
      const plan = JSON.parse(stored);
      setFitnessPlan(plan);
      loadDailyTasks(plan);
    }
  }, []);

  const loadDailyTasks = (plan: any) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todaysWorkout = plan.workouts?.find((w: any) => w.day === today);
    setDailyWorkouts(todaysWorkout?.exercises?.map((ex: any) => ({
      id: Date.now().toString() + ex.name,
      name: ex.name, sets: ex.sets, reps: ex.reps, completed: false
    })) || []);
    setDailyDietTasks(plan.nutrition?.map((item: string) => ({
      id: Date.now().toString() + item, task: item, completed: false
    })) || []);
  };

  const total = dailyWorkouts.length + dailyDietTasks.length;
  const done  = dailyWorkouts.filter(w => w.completed).length + dailyDietTasks.filter(t => t.completed).length;
  const allDone = total > 0 && done === total;

  useEffect(() => {
    if (allDone) {
      setShowCongrats(true);
      const t = setTimeout(() => setShowCongrats(false), 3500);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  const toggleWorkout = (id: string) =>
    setDailyWorkouts(prev => prev.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  const toggleDiet = (id: string) =>
    setDailyDietTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
          <div className="chip mb-5">
            <Flame size={12} className="text-primary-200" />
            Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tightest">
            Your <span className="text-gradient-blue">daily</span> plan
          </h1>
        </motion.div>

        {!fitnessPlan ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card variant="strong" glow className="p-12 text-center">
              <div className="chip mx-auto mb-6"><Sparkles size={12} className="text-primary-200" />No plan yet</div>
              <h2 className="text-3xl font-light mb-3">Start by creating your fitness plan</h2>
              <p className="text-white/55 max-w-md mx-auto mb-8">Once you generate one, your daily workouts and nutrition checklist will appear here.</p>
              <Button variant="primary" size="lg" iconRight={<ArrowRight size={16} />} onClick={() => { window.location.href = '/fitness-plan'; }}>
                Generate plan
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-4 space-y-5">
              <Card variant="strong" glow className="p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs uppercase tracking-wider text-white/50">Progress</span>
                  <Calendar size={14} className="text-primary-300" />
                </div>
                <div className="flex justify-center mb-5">
                  <ProgressRing value={done} total={total} />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/8 text-center">
                  <div>
                    <div className="text-2xl font-light">{done}</div>
                    <div className="text-xs text-white/45 mt-1">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white/40">{total - done}</div>
                    <div className="text-xs text-white/45 mt-1">Remaining</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Plan</div>
                <div className="text-lg font-medium mb-1 text-gradient-blue">{fitnessPlan.title}</div>
                <p className="text-sm text-white/55 leading-relaxed">{fitnessPlan.description}</p>
              </Card>
            </motion.div>

            {/* Right tasks */}
            <div className="lg:col-span-8 space-y-5">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card variant="strong" className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                        <Dumbbell size={16} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/50">Workouts</div>
                        <div className="text-lg font-medium">{dailyWorkouts.filter(w => w.completed).length}/{dailyWorkouts.length} complete</div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {dailyWorkouts.length === 0 && (
                      <li className="text-sm text-white/45 py-4 text-center">No workout scheduled for today.</li>
                    )}
                    {dailyWorkouts.map(w => (
                      <li
                        key={w.id}
                        onClick={() => toggleWorkout(w.id)}
                        className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          w.completed
                            ? 'bg-primary/8 border-primary/30'
                            : 'bg-white/2 border-white/6 hover:bg-white/4 hover:border-white/12'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            w.completed ? 'bg-primary border-primary shadow-glow' : 'border-white/20 group-hover:border-primary/50'
                          }`}>
                            {w.completed && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <div>
                            <div className={`text-sm ${w.completed ? 'text-white/55 line-through' : 'text-white'}`}>{w.name}</div>
                            <div className="text-xs text-white/40 font-mono mt-0.5">{w.sets} × {w.reps}</div>
                          </div>
                        </div>
                        <div className="text-xs text-white/40 font-mono">{w.completed ? '✓ done' : 'tap'}</div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card variant="strong" className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                        <Apple size={16} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/50">Nutrition</div>
                        <div className="text-lg font-medium">{dailyDietTasks.filter(t => t.completed).length}/{dailyDietTasks.length} complete</div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {dailyDietTasks.map(t => (
                      <li
                        key={t.id}
                        onClick={() => toggleDiet(t.id)}
                        className={`group flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          t.completed
                            ? 'bg-primary/8 border-primary/30'
                            : 'bg-white/2 border-white/6 hover:bg-white/4 hover:border-white/12'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          t.completed ? 'bg-primary border-primary shadow-glow' : 'border-white/20 group-hover:border-primary/50'
                        }`}>
                          {t.completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className={`text-sm ${t.completed ? 'text-white/55 line-through' : 'text-white/85'}`}>{t.task}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showCongrats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="glass-strong p-8 rounded-3xl shadow-glowStrong text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-2xl font-light mb-1 text-gradient-blue">All done</div>
                <p className="text-white/65 text-sm">Stay consistent — you're building something real.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkoutTrackerPage;