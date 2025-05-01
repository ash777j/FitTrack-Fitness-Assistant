import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, LogOut } from 'lucide-react';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const navLinks = isAuthenticated ? [
    { path: '/fitness-plan', label: 'Fitness Plan' },
    { path: '/workout-tracker', label: 'Workout Tracker' },
    { path: '/progress', label: 'Progress' },
    { path: '/gamification', label: 'Rewards' },
  ] : [];

  return (
    <nav className="fixed top-0 w-full bg-background-secondary/95 backdrop-blur-sm z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center" onClick={closeMenu}>
              <Dumbbell className="h-8 w-8 text-neon-green mr-2" />
              <span className="text-xl font-bold text-text-primary">
                FitTrack
              </span>
            </NavLink>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 
                    ${isActive 
                      ? 'text-neon-green bg-background-tertiary shadow-none' 
                      : 'text-text-secondary hover:text-neon-blue hover:bg-background-tertiary'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              
              <div className="ml-4 border-l border-metallic-dark pl-4">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    neonColor="blue"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                ) : (
                  <NavLink
                    to="/login"
                    className="px-3 py-1.5 text-sm font-medium text-background-primary bg-neon-blue rounded-md hover:shadow-neon-blue transition-all duration-300"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-metallic-light hover:text-neon-blue hover:bg-background-tertiary focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background-secondary border-t border-metallic-dark">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300
                ${isActive 
                  ? 'text-neon-green bg-background-tertiary shadow-none' 
                  : 'text-text-secondary hover:text-neon-blue hover:bg-background-tertiary'}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          
          <div className="pt-2 border-t border-metallic-dark mt-2">
            {isAuthenticated ? (
              <Button
                variant="outline"
                neonColor="blue"
                onClick={handleLogout}
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <NavLink
                to="/login"
                className="flex justify-center w-full px-3 py-2 text-sm font-medium text-background-primary bg-neon-blue rounded-md hover:shadow-neon-blue transition-all duration-300"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
