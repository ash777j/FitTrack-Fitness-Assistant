import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, simulate login
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to continue your fitness journey</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="youremail@example.com"
            icon={<Mail className="h-5 w-5 text-metallic-light" />}
            required
            value={formData.email}
            onChange={handleChange}
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            icon={<Lock className="h-5 w-5 text-metallic-light" />}
            required
            value={formData.password}
            onChange={handleChange}
          />
          
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-metallic-dark bg-background-tertiary focus:ring-neon-blue"
              />
              <span className="ml-2 text-sm text-text-secondary">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-neon-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            neonColor="blue"
            fullWidth
            className="mb-4"
          >
            Sign In
          </Button>
          
          <p className="text-center text-text-secondary text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-neon-green hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
