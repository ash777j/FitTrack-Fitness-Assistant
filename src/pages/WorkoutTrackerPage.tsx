import React, { useState, useEffect } from 'react';
 import { CheckCircle, Calendar } from 'lucide-react';
 import Card from '../components/ui/Card';
 import Button from '../components/ui/Button';
 

 interface Workout {
  id: string;
  name: string;
  sets: string;
  reps: string;
  completed: boolean;
 }
 

 interface DietTask {
  id: string;
  task: string;
  completed: boolean;
 }
 

 const WorkoutTrackerPage: React.FC = () => {
  const [fitnessPlan, setFitnessPlan] = useState<any>(null);
  const [dailyWorkouts, setDailyWorkouts] = useState<Workout[]>([]);
  const [dailyDietTasks, setDailyDietTasks] = useState<DietTask[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
 

  useEffect(() => {
  const storedPlan = localStorage.getItem('fitnessPlan');
  if (storedPlan) {
  const plan = JSON.parse(storedPlan);
  setFitnessPlan(plan);
  loadDailyTasks(plan);
  }
  }, []);
 

  const loadDailyTasks = (plan: any) => {
  if (plan) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysWorkout = plan.workouts?.find((workout: any) => workout.day === today);
  
  const workouts = todaysWorkout?.exercises?.map((exercise: any) => ({
  id: Date.now().toString() + exercise.name,
  name: exercise.name,
  sets: exercise.sets,
  reps: exercise.reps,
  completed: false,
  })) || [];
  
  setDailyWorkouts(workouts);
  
  const dietTasks = plan.nutrition?.map((item: string) => ({
  id: Date.now().toString() + item,
  task: item,
  completed: false,
  })) || [];
  
  setDailyDietTasks(dietTasks);
  }
  };
 

  useEffect(() => {
  if (dailyWorkouts.length > 0 || dailyDietTasks.length > 0) {
  const allWorkoutsCompleted = dailyWorkouts.every(workout => workout.completed);
  const allDietTasksCompleted = dailyDietTasks.every(task => task.completed);
  setAllTasksCompleted(allWorkoutsCompleted && allDietTasksCompleted);
  }
  }, [dailyWorkouts, dailyDietTasks]);
 

  useEffect(() => {
  if (allTasksCompleted) {
  setShowCongrats(true);
  setTimeout(() => setShowCongrats(false), 3000);
  }
  }, [allTasksCompleted]);
 

  const handleWorkoutComplete = (id: string) => {
  setDailyWorkouts(prev =>
  prev.map(workout =>
  workout.id === id ? { ...workout, completed: !workout.completed } : workout
  )
  );
  };
 

  const handleDietTaskComplete = (id: string) => {
  setDailyDietTasks(prev =>
  prev.map(task =>
  task.id === id ? { ...task, completed: !task.completed } : task
  )
  );
  };
 

  return (
  <div className="min-h-screen pt-20 pb-10 px-4">
  <div className="max-w-4xl mx-auto">
  <h1 className="text-3xl font-bold mb-6">Today's Plan</h1>
 

  {fitnessPlan ? (
  <>
  <Card className="p-6 mb-6">
  <h2 className="text-xl font-semibold mb-2">{fitnessPlan.title}</h2>
  <p className="text-text-secondary">{fitnessPlan.description}</p>
  </Card>
 

  <Card className="p-6 mb-6">
  <h3 className="text-lg font-semibold mb-4">Today's Workouts</h3>
  <ul>
  {dailyWorkouts.map(workout => (
  <li key={workout.id} className="flex justify-between items-center py-2 border-b border-metallic-dark">
  <span>{workout.name} ({workout.sets} sets, {workout.reps} reps)</span>
  <button
  onClick={() => handleWorkoutComplete(workout.id)}
  className="p-1.5 rounded-md bg-background-tertiary text-text-secondary hover:text-green-500"
  >
  <CheckCircle size={16} color={workout.completed ? 'green' : 'currentColor'} />
  </button>
  </li>
  ))}
  </ul>
  
  <h3 className="text-lg font-semibold mt-4 mb-2">Today's Diet</h3>
  <ul>
  {dailyDietTasks.map(task => (
  <li key={task.id} className="flex justify-between items-center py-2 border-b border-metallic-dark">
  <span>{task.task}</span>
  <button
  onClick={() => handleDietTaskComplete(task.id)}
  className="p-1.5 rounded-md bg-background-tertiary text-text-secondary hover:text-green-500"
  >
  <CheckCircle size={16} color={task.completed ? 'green' : 'currentColor'} />
  </button>
  </li>
  ))}
  </ul>
  </Card>
  </>
  ) : (
  <Card className="p-6 text-center">
  <p className="text-text-secondary">No fitness plan selected. Go to Fitness Plan page to generate one!</p>
  <Button onClick={() => {window.location.href = '/fitness-plan';}}>Go to Fitness Plan</Button>
  </Card>
  )}
 

  {showCongrats && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-secondary border border-neon-green text-neon-green p-4 rounded-md shadow-lg animate-pulse">
  Great job staying on track today! 💪
  </div>
  )}
  </div>
  </div>
  );
 };
 

 export default WorkoutTrackerPage;
