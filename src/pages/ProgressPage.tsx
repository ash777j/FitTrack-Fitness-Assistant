import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, Clock, Flame, Scale, Sparkles, Activity } from 'lucide-react';
import Card from '../components/ui/Card';

const weightData = [
  { name: 'Jan 1', value: 82 }, { name: 'Jan 8', value: 81.2 },
  { name: 'Jan 15', value: 80.5 }, { name: 'Jan 22', value: 79.8 },
  { name: 'Jan 29', value: 79.3 }, { name: 'Feb 5', value: 78.9 },
  { name: 'Feb 12', value: 78.4 }
];
const workoutData = [
  { name: 'Mon', value: 45 }, { name: 'Tue', value: 0 },
  { name: 'Wed', value: 60 }, { name: 'Thu', value: 30 },
  { name: 'Fri', value: 75 }, { name: 'Sat', value: 90 },
  { name: 'Sun', value: 0 }
];
const caloriesData = [
  { name: 'Protein', value: 30 }, { name: 'Carbs', value: 45 }, { name: 'Fat', value: 25 }
];
const COLORS = ['#2EA7FF', '#64C9FF', '#A5DBFF'];

const axisStyle = { fill: 'rgba(255,255,255,0.45)', fontSize: 11 };
const gridStyle = { stroke: 'rgba(255,255,255,0.06)' };

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-strong px-3 py-2 rounded-xl shadow-glass">
      <div className="text-xs text-white/55">{label}</div>
      <div className="text-sm font-mono text-primary-200">{payload[0].value}</div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; unit: string; icon: React.ReactNode; index: number }> = ({ title, value, unit, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.05, duration: 0.6 }}
  >
    <Card className="p-5 hover:shadow-glow transition-shadow h-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-white/50">{title}</span>
        <span className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-200">
          {icon}
        </span>
      </div>
      <div className="text-3xl font-light tracking-tight text-gradient-blue">{value}</div>
      <div className="text-xs text-white/45 mt-1">{unit}</div>
    </Card>
  </motion.div>
);

const ProgressPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="chip mb-5">
              <Sparkles size={12} className="text-primary-200" />
              Analytics
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tightest">
              Progress <span className="text-gradient-blue">tracker</span>
            </h1>
            <p className="text-white/55 mt-3 max-w-md">Visualize your fitness journey with detailed analytics and trends.</p>
          </div>

          <div className="flex gap-2 p-1 rounded-full glass-soft border border-white/8 w-fit">
            {(['week', 'month', 'year'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all capitalize ${
                  timeframe === t
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Workouts"        value="5"     unit="sessions this week"  icon={<TrendingUp size={14} />} index={0} />
          <StatCard title="Duration"        value="300"   unit="minutes total"       icon={<Clock size={14} />}      index={1} />
          <StatCard title="Calories"        value="1,860" unit="kcal burned"         icon={<Flame size={14} />}      index={2} />
          <StatCard title="Weight change"   value="-0.5"  unit="kg this week"        icon={<Scale size={14} />}      index={3} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card variant="strong" className="p-6 h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50">Weight progress</div>
                  <div className="text-2xl font-light mt-1">-3.6 kg <span className="text-sm text-white/45">in 6 weeks</span></div>
                </div>
                <div className="chip text-primary-200 border-primary/40 bg-primary/10">Trending down ↓</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#2EA7FF" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="#2EA7FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
                    <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                    <YAxis tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="value" stroke="#64C9FF" strokeWidth={2.5} fill="url(#blueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card variant="strong" className="p-6 h-full">
              <div className="text-xs uppercase tracking-wider text-white/50 mb-4">Macros</div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={caloriesData}
                      cx="50%" cy="50%"
                      innerRadius={55} outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {caloriesData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4 pt-4 border-t border-white/8">
                {caloriesData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-white/65">{d.name}</span>
                    </div>
                    <span className="font-mono text-white/45">{d.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card variant="strong" className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">Workout duration</div>
                <div className="text-2xl font-light mt-1">300 min total · peak 90 min</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <Activity size={14} className="text-primary-300" /> weekly volume
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#64C9FF" />
                      <stop offset="100%" stopColor="#1488E0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
                  <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                  <YAxis tick={axisStyle} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(46,167,255,0.06)' }} />
                  <Bar dataKey="value" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;