import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import FitnessPlanPage from '../pages/FitnessPlanPage';
import WorkoutTrackerPage from '../pages/WorkoutTrackerPage';
import ProgressPage from '../pages/ProgressPage';
import GamificationPage from '../pages/GamificationPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/fitness-plan" element={<FitnessPlanPage />} />
      <Route path="/workout-tracker" element={<WorkoutTrackerPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/gamification" element={<GamificationPage />} />
    </Routes>
  );
};

export default AppRoutes;
