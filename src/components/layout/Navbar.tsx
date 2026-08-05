import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell, LogOut, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const navLinks = isAuthenticated
    ? [
        { path: '/fitness-plan',    label: 'Plans' },
        { path: '/workout-tracker', label: 'Workouts' },
        { path: '/progress',        label: 'Progress' },
        { path: '/gamification',    label: 'Rewards' }
      ]
    : [];

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div
            className={`
              relative flex items-center justify-between
              rounded-2xl border transition-all duration-500
              ${scrolled
                ? 'glass-strong border-white/10 px-4 sm:px-6 py-3 shadow-glass'
                : 'border-transparent bg-transparent px-2 py-2'}
            `}
          >
            {/* Logo */}
            <NavLink to="/" className="group flex items-center gap-2.5">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center border border-primary-300/40">
                  <Dumbbell className="w-4.5 h-4.5 text-white" size={18} />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Fit<span className="text-gradient-blue">Track</span>
              </span>
            </NavLink>

            {/* Center nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path} className="relative px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navbar-pill"
                          className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40 shadow-glow"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<LogOut size={14} />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    Sign in
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    iconRight={<ArrowRight size={14} />}
                    onClick={() => navigate('/signup')}
                  >
                    Get started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 inset-x-5 z-40 md:hidden"
          >
            <div className="glass-strong p-5 rounded-3xl">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary/15 text-white border border-primary/40'
                            : 'text-white/70 hover:bg-white/5 border border-transparent'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="h-px bg-white/10 my-3" />
                {isAuthenticated ? (
                  <Button variant="ghost" size="md" fullWidth icon={<LogOut size={14} />} onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="md" fullWidth onClick={() => navigate('/login')}>
                      Sign in
                    </Button>
                    <Button variant="primary" size="md" fullWidth onClick={() => navigate('/signup')}>
                      Get started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;