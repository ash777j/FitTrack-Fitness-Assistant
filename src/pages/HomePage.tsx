import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Dumbbell,
  BarChart2,
  Trophy,
  Zap,
  Calendar,
  ArrowRight,
  Sparkles,
  Activity,
  Heart,
  Brain,
  Flame,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

/* ===========================
   Shared motion presets
   =========================== */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.7, ease }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

/* ===========================
   Authenticated dashboard
   =========================== */
interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  index: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, link, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card tilt glow={false} onClick={() => navigate(link)} className="p-6 h-full group">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-500/10 border border-primary/30 flex items-center justify-center text-primary-200 group-hover:shadow-glow transition-shadow">
            {icon}
          </div>
          <ArrowRight size={18} className="text-white/40 group-hover:text-primary-300 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="text-lg font-medium mb-1.5 text-white">{title}</h3>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
        <div className="mt-6 pt-6 border-t border-white/8 flex items-center justify-between text-xs text-white/40">
          <span>Open module</span>
          <span className="font-mono">0{index + 1}</span>
        </div>
      </Card>
    </motion.div>
  );
};

const DashboardHome: React.FC = () => {
  const cards = [
    { title: 'Fitness Plan',    description: 'Personalized AI-built training programs that adapt to your goals and recovery.', icon: <Calendar size={20} />,   link: '/fitness-plan' },
    { title: 'Workout Tracker', description: 'Log every rep and session. Real-time progress synced across devices.',        icon: <Dumbbell size={20} />,   link: '/workout-tracker' },
    { title: 'Progress Stats',  description: 'Deep analytics and visual insights for your body composition and strength.', icon: <BarChart2 size={20} />,  link: '/progress' },
    { title: 'Achievements',    description: 'Earn badges and climb the global leaderboard as you hit milestones.',          icon: <Trophy size={20} />,     link: '/gamification' },
    { title: 'Quick Start',     description: 'Jump straight into a guided session — warmup, work, cooldown handled.',     icon: <Zap size={20} />,        link: '/workout-tracker' }
  ];

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
          <motion.div variants={fadeUp} className="chip mb-6">
            <Sparkles size={12} className="text-primary-200" />
            Welcome back · streak day 12
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-light tracking-tightest leading-[1.02]">
            <span className="text-white">Good morning,</span>
            <br />
            <span className="text-gradient-blue">Alex.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
            You're 3 workouts away from your weekly goal. Recovery looks great — let's keep the momentum.
          </motion.p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-16"
        >
          {[
            { label: 'Streak',         value: '12',  unit: 'days',  icon: <Flame size={16} /> },
            { label: 'Calories',       value: '2,140', unit: 'burned', icon: <Activity size={16} /> },
            { label: 'Heart',          value: '142', unit: 'bpm',    icon: <Heart size={16} /> },
            { label: 'Mind',           value: '87',  unit: 'focus',  icon: <Brain size={16} /> }
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i}>
              <Card className="p-5 group hover:shadow-glow transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-white/50">{s.label}</span>
                  <span className="text-primary-300">{s.icon}</span>
                </div>
                <div className="text-3xl font-light tracking-tight">{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.unit}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map((c, i) => (
            <DashboardCard key={c.title} {...c} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ===========================
   Public landing hero
   =========================== */
const LandingHome: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating decorative shapes */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute top-32 -right-20 w-80 h-80 rounded-3xl glass-strong rotate-12 animate-float-slow hidden lg:block"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -60]) }}
        className="absolute top-96 -left-32 w-72 h-72 rounded-full glass-strong animate-float-medium hidden lg:block"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left — hero copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp} className="chip mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              New · AI-powered adaptive plans
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[clamp(3rem,9vw,7.5rem)] font-light tracking-tightest leading-[0.95] text-white"
            >
              Train smarter.<br />
              <span className="text-gradient-blue">Live stronger.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light"
            >
              FitTrack combines biometric data, recovery science, and AI to design training programs that actually move the needle — week after week.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                magnetic
                iconRight={<ArrowRight size={16} />}
                onClick={() => navigate('/signup')}
              >
                Start training free
              </Button>
              <Button variant="ghost" size="lg" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-12 flex items-center gap-6 text-sm text-white/45">
              <div className="flex -space-x-2">
                {['from-primary to-primary-700', 'from-secondary to-primary', 'from-primary-400 to-primary-700'].map((g, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-ink-900`} />
                ))}
              </div>
              <span>Join <strong className="text-white">38,000+</strong> athletes training today</span>
            </motion.div>
          </motion.div>

          {/* Right — floating preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              <Card variant="strong" tilt glow className="p-7 animate-float-slow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50">Today's plan</div>
                    <div className="text-lg font-medium mt-1">Upper body · push</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-glow">
                    <Dumbbell size={18} />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Incline DB Press',   set: '4 × 10', done: true  },
                    { name: 'Cable Fly',          set: '3 × 12', done: true  },
                    { name: 'Overhead Press',     set: '4 × 8',  done: false },
                    { name: 'Tricep Pushdown',    set: '3 × 12', done: false }
                  ].map((ex) => (
                    <div key={ex.name} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      ex.done ? 'bg-primary/10 border-primary/30' : 'bg-white/3 border-white/8'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          ex.done ? 'bg-primary border-primary' : 'border-white/20'
                        }`}>
                          {ex.done && <Check size={12} className="text-white" />}
                        </div>
                        <span className={ex.done ? 'text-white/60 line-through text-sm' : 'text-sm'}>{ex.name}</span>
                      </div>
                      <span className="text-xs font-mono text-white/50">{ex.set}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <div className="text-xs text-white/50">Recovery score</div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow" />
                    </div>
                    <span className="text-sm font-mono text-primary-200">76%</span>
                  </div>
                </div>
              </Card>

              {/* Floating mini card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-8 w-52"
              >
                <Card variant="strong" className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                      <Activity size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Volume this week</div>
                      <div className="text-sm font-mono text-white">+18%</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Floating top-right pill */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-6"
              >
                <div className="glass-strong px-4 py-2.5 rounded-full flex items-center gap-2">
                  <Flame size={14} className="text-primary-300" />
                  <span className="text-sm font-mono">12 day streak</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-14">
            <div className="eyebrow justify-center mb-4">Capabilities</div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tightest">
              Built for <span className="text-gradient-blue">athletes</span>, not influencers.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <Brain size={20} />,     title: 'Adaptive AI',    desc: 'Plans rebalance every session based on your recovery and performance signals.' },
              { icon: <Activity size={20} />,   title: 'Biometric sync', desc: 'Connect wearables, smart watches and HR straps in one tap. Apple Health, Garmin, Whoop.' },
              { icon: <Sparkles size={20} />,   title: 'Recovery-first', desc: 'A built-in coach that flags overtraining before injuries happen.' }
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <Card tilt className="p-7 h-full group">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/30 to-primary-500/10 border border-primary/30 flex items-center justify-center text-primary-200 mb-5 group-hover:shadow-glow transition-shadow">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <Card variant="strong" glow className="relative p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-light tracking-tightest mb-6">
                Ready to <span className="text-gradient-blue">redefine</span> your training?
              </h2>
              <p className="text-white/55 max-w-xl mx-auto mb-10 text-lg">
                Free forever for individuals. Premium unlocks advanced AI coaching, nutrition and team dashboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" magnetic iconRight={<ArrowRight size={16} />} onClick={() => navigate('/signup')}>
                  Create free account
                </Button>
                <Button variant="ghost" size="lg" onClick={() => navigate('/login')}>
                  I already have one
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

/* ===========================
   Page entry
   =========================== */
const HomePage: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <DashboardHome /> : <LandingHome />;
};

export default HomePage;