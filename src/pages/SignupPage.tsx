import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
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
      window.location.href = '/';
    }, 600);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-12 px-5 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-3xl w-full mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-10">
          <div className="chip mx-auto mb-6">
            <Sparkles size={12} className="text-primary-200" />
            Free · No card required
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tightest leading-[1.02] mb-4">
            Create your <span className="text-gradient-blue">account</span>
          </h1>
          <p className="text-white/55 max-w-md mx-auto">Two minutes to set up. Lifelong access to AI fitness intelligence.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Card variant="strong" glow className="p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-x-5">
                <Input
                  label="Full name"
                  type="text" name="name" placeholder="Alex Johnson"
                  icon={<User className="h-4 w-4" />}
                  required value={formData.name} onChange={handleChange}
                />
                <Input
                  label="Email"
                  type="email" name="email" placeholder="you@company.com"
                  icon={<Mail className="h-4 w-4" />}
                  required value={formData.email} onChange={handleChange}
                />
                <Input
                  label="Password"
                  type="password" name="password" placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  required value={formData.password} onChange={handleChange}
                />
                <Input
                  label="Confirm password"
                  type="password" name="confirmPassword" placeholder="••••••••"
                  icon={<Lock className="h-4 w-4" />}
                  required value={formData.confirmPassword} onChange={handleChange}
                />
              </div>

              <label className="flex items-start gap-2 my-6 text-sm text-white/55">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0" />
                <span>I agree to the <Link to="#" className="text-primary-200">Terms of Service</Link> and <Link to="#" className="text-primary-200">Privacy Policy</Link>.</span>
              </label>

              <Button
                type="submit" variant="primary" size="lg" fullWidth
                disabled={loading}
                iconRight={<ArrowRight size={16} />}
                className={loading ? 'opacity-70 pointer-events-none' : ''}
              >
                {loading ? 'Creating account…' : 'Create account'}
              </Button>

              <p className="text-center text-sm text-white/50 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-200 hover:text-primary-300 transition">Sign in</Link>
              </p>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;