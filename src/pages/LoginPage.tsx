import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles, Activity, Brain } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    }, 600);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-12 px-5 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="chip mb-6">
            <Sparkles size={12} className="text-primary-200" />
            Welcome back
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tightest leading-[1.02] mb-4">
            Sign in to <span className="text-gradient-blue">FitTrack</span>
          </h1>
          <p className="text-white/55 mb-10 max-w-md">Continue your training intelligence — sync biometrics and pick up where you left off.</p>

          <Card variant="strong" className="p-8">
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@company.com"
                icon={<Mail className="h-4 w-4" />}
                required
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                required
                value={formData.password}
                onChange={handleChange}
              />

              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="flex items-center gap-2 text-white/60">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0" />
                  Remember me
                </label>
                <Link to="#" className="text-primary-200 hover:text-primary-300 transition">Forgot password?</Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                iconRight={<ArrowRight size={16} />}
                className={loading ? 'opacity-70 pointer-events-none' : ''}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>

              <p className="text-center text-sm text-white/50 mt-6">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary-200 hover:text-primary-300 transition">Create one</Link>
              </p>
            </form>
          </Card>
        </motion.div>

        {/* Right decorative panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <Card variant="strong" glow className="p-10 animate-float-slow">
            <div className="chip mb-6"><Activity size={12} className="text-primary-200" />Live signal</div>
            <h3 className="text-3xl font-light tracking-tight mb-2">Recovery 92%</h3>
            <p className="text-white/55 mb-8 text-sm">You're ready for high-intensity work today.</p>

            <div className="space-y-4">
              {[
                { label: 'Sleep',         value: '92%', glow: true },
                { label: 'HRV',           value: '68ms' },
                { label: 'Training load', value: 'Low' },
                { label: 'Hydration',     value: '2.1L' }
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6">
                  <span className="text-sm text-white/60">{s.label}</span>
                  <span className={`text-sm font-mono ${s.glow ? 'text-primary-200 text-glow' : 'text-white'}`}>{s.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/8 flex items-center gap-3">
              <Brain className="text-primary-300" size={18} />
              <span className="text-xs text-white/50">AI coach: "Push for a strength session — cardio tomorrow."</span>
            </div>
          </Card>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 w-44"
          >
            <Card variant="strong" className="p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-700" />
                <div className="text-xs">
                  <div className="text-white/50">Next session</div>
                  <div className="font-mono">in 2h 14m</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;