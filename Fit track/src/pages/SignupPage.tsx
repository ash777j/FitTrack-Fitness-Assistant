import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    // For demo purposes, just log the data
    console.log('Signup attempt:', formData);
    // In a real app, you would handle registration here
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-text-secondary">Join FitTrack and start your fitness journey</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            icon={<User className="h-5 w-5 text-metallic-light" />}
            required
            value={formData.name}
            onChange={handleChange}
          />
          
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
          
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="********"
            icon={<Lock className="h-5 w-5 text-metallic-light" />}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-metallic-dark bg-background-tertiary focus:ring-neon-blue"
                required
              />
              <span className="ml-2 text-sm text-text-secondary">
                I agree to the{' '}
                <Link to="#" className="text-neon-blue hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="#" className="text-neon-blue hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            neonColor="green"
            fullWidth
            className="mb-4"
          >
            Create Account
          </Button>
          
          <p className="text-center text-text-secondary text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-blue hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
