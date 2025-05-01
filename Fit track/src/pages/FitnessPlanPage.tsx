import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FormData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
  fitnessGoal: string;
  workoutPreference: string;
}

interface PlanData {
  title: string;
  description: string;
  workouts: {
    day: string;
    exercises: {
      name: string;
      sets: string;
      reps: string;
      notes?: string;
    }[];
  }[];
  nutrition: string[];
}

const FitnessPlanPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    fitnessLevel: 'beginner',
    fitnessGoal: 'weight-loss',
    workoutPreference: 'cardio'
  });

  const [showPlan, setShowPlan] = useState(false);
  const [plan, setPlan] = useState<PlanData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a plan based on form data (simplified for demo)
    const newPlan = generatePlan(formData);
    setPlan(newPlan);
    setShowPlan(true);
  };

  // This would be an API call in a real application
  const generatePlan = (data: FormData): PlanData => {
    let planTitle = '';
    let planDescription = '';
    let workouts = [];
    let nutrition = [];

    // Basic logic to create different plans based on goals and preferences
    if (data.fitnessGoal === 'weight-loss') {
      planTitle = 'Weight Loss Focus Plan';
      planDescription = `A ${data.fitnessLevel} level program designed to help you lose weight through a combination of ${data.workoutPreference} exercises and nutritional guidance.`;
      
      if (data.workoutPreference === 'cardio') {
        workouts = [
          {
            day: 'Monday',
            exercises: [
              { name: 'Treadmill (Intervals)', sets: '1', reps: '30 mins' },
              { name: 'Jumping Jacks', sets: '3', reps: '1 min each' },
              { name: 'Mountain Climbers', sets: '3', reps: '30 sec each' }
            ]
          },
          {
            day: 'Wednesday',
            exercises: [
              { name: 'Cycling', sets: '1', reps: '25 mins' },
              { name: 'Burpees', sets: '3', reps: '10' },
              { name: 'High Knees', sets: '3', reps: '45 sec each' }
            ]
          },
          {
            day: 'Friday',
            exercises: [
              { name: 'Elliptical Machine', sets: '1', reps: '30 mins' },
              { name: 'Jump Rope', sets: '3', reps: '2 mins each' },
              { name: 'Boxing Drills', sets: '3', reps: '1 min each' }
            ]
          }
        ];
      } else {
        workouts = [
          {
            day: 'Monday',
            exercises: [
              { name: 'Squats', sets: '3', reps: '12' },
              { name: 'Push-ups', sets: '3', reps: '10' },
              { name: 'Lunges', sets: '3', reps: '10 each leg' }
            ]
          },
          {
            day: 'Wednesday',
            exercises: [
              { name: 'Dumbbell Rows', sets: '3', reps: '12' },
              { name: 'Plank', sets: '3', reps: '30 sec hold' },
              { name: 'Glute Bridges', sets: '3', reps: '15' }
            ]
          },
          {
            day: 'Friday',
            exercises: [
              { name: 'Deadlifts (Light)', sets: '3', reps: '10' },
              { name: 'Tricep Dips', sets: '3', reps: '12' },
              { name: 'Russian Twists', sets: '3', reps: '20 total' }
            ]
          }
        ];
      }
      
      nutrition = [
        'Maintain a caloric deficit of 500 calories below maintenance',
        'Focus on lean proteins (chicken, fish, tofu) and vegetables',
        'Limit processed carbohydrates and sugars',
        'Stay hydrated with at least 2-3 liters of water daily',
        'Consider intermittent fasting if appropriate for your lifestyle'
      ];
    } else if (data.fitnessGoal === 'muscle-gain') {
      planTitle = 'Muscle Building Program';
      planDescription = `A ${data.fitnessLevel} level program focused on progressive overload to build muscle mass through targeted strength training.`;
      
      workouts = [
        {
          day: 'Monday - Push Day',
          exercises: [
            { name: 'Bench Press', sets: '4', reps: '8-10' },
            { name: 'Shoulder Press', sets: '3', reps: '10-12' },
            { name: 'Tricep Extensions', sets: '3', reps: '12-15' }
          ]
        },
        {
          day: 'Wednesday - Pull Day',
          exercises: [
            { name: 'Pull-ups/Lat Pulldowns', sets: '4', reps: '8-10' },
            { name: 'Barbell Rows', sets: '3', reps: '10-12' },
            { name: 'Bicep Curls', sets: '3', reps: '12-15' }
          ]
        },
        {
          day: 'Friday - Leg Day',
          exercises: [
            { name: 'Squats', sets: '4', reps: '8-10' },
            { name: 'Romanian Deadlifts', sets: '3', reps: '10-12' },
            { name: 'Calf Raises', sets: '3', reps: '15-20' }
          ]
        }
      ];
      
      nutrition = [
        'Eat in a caloric surplus of 300-500 calories above maintenance',
        'Consume 1.6-2.2g of protein per kg of bodyweight',
        'Include complex carbohydrates to fuel workouts',
        'Focus on nutrient-dense foods rather than empty calories',
        'Consider a protein shake post-workout for recovery'
      ];
    } else {
      planTitle = 'General Fitness & Wellness Plan';
      planDescription = `A balanced ${data.fitnessLevel} level approach to improve overall fitness, combining cardio, strength, and flexibility training.`;
      
      workouts = [
        {
          day: 'Monday',
          exercises: [
            { name: 'Brisk Walking/Light Jogging', sets: '1', reps: '20 mins' },
            { name: 'Bodyweight Squats', sets: '3', reps: '12' },
            { name: 'Modified Push-ups', sets: '3', reps: '10' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Yoga Flow', sets: '1', reps: '20 mins' },
            { name: 'Plank', sets: '3', reps: '20 sec hold' },
            { name: 'Dumbbell Rows', sets: '3', reps: '12' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Swimming/Cycling', sets: '1', reps: '20 mins' },
            { name: 'Lunges', sets: '3', reps: '10 each leg' },
            { name: 'Stretching Routine', sets: '1', reps: '10 mins' }
          ]
        }
      ];
      
      nutrition = [
        'Eat at maintenance calories',
        'Focus on whole, unprocessed foods',
        'Include a variety of fruits and vegetables',
        'Stay hydrated throughout the day',
        'Practice mindful eating habits'
      ];
    }

    return {
      title: planTitle,
      description: planDescription,
      workouts,
      nutrition
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Personalized Fitness Plan</h1>
          <p className="text-text-secondary">Fill out the form below to get a custom fitness plan based on your goals</p>
        </div>
        
        {!showPlan ? (
          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Age"
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                />
                
                <Input
                  label="Weight (kg)"
                  type="number"
                  name="weight"
                  placeholder="Enter your weight"
                  required
                  value={formData.weight}
                  onChange={handleChange}
                />
                
                <Input
                  label="Height (cm)"
                  type="number"
                  name="height"
                  placeholder="Enter your height"
                  required
                  value={formData.height}
                  onChange={handleChange}
                />
                
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm font-medium">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-background-tertiary border border-metallic-dark text-text-primary rounded-md focus:outline-none focus:border-neon-blue py-2 px-3"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm font-medium">
                    Fitness Level
                  </label>
                  <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleChange}
                    className="w-full bg-background-tertiary border border-metallic-dark text-text-primary rounded-md focus:outline-none focus:border-neon-blue py-2 px-3"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm font-medium">
                    Fitness Goal
                  </label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className="w-full bg-background-tertiary border border-metallic-dark text-text-primary rounded-md focus:outline-none focus:border-neon-blue py-2 px-3"
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="general-fitness">General Fitness</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-text-secondary mb-2 text-sm font-medium">
                    Workout Preference
                  </label>
                  <select
                    name="workoutPreference"
                    value={formData.workoutPreference}
                    onChange={handleChange}
                    className="w-full bg-background-tertiary border border-metallic-dark text-text-primary rounded-md focus:outline-none focus:border-neon-blue py-2 px-3"
                  >
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength Training</option>
                    <option value="yoga">Yoga/Flexibility</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  neonColor="green"
                  fullWidth
                >
                  Generate Fitness Plan
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="animate-fade-in">
            {plan && (
              <>
                <Card neonBorder="green" className="p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-neon-green">{plan.title}</h2>
                  <p className="text-text-secondary mb-4">{plan.description}</p>
                  
                  <Button
                    variant="outline"
                    neonColor="blue"
                    onClick={() => setShowPlan(false)}
                    className="mt-2"
                  >
                    Return to Form
                  </Button>
                </Card>
                
                <h3 className="text-xl font-semibold mb-4">Workout Schedule</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {plan.workouts.map((workout, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium text-neon-blue mb-2">{workout.day}</h4>
                      <ul className="space-y-2">
                        {workout.exercises.map((exercise, i) => (
                          <li key={i} className="border-b border-metallic-dark pb-2">
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-text-secondary">
                              {exercise.sets} sets × {exercise.reps}
                            </p>
                            {exercise.notes && (
                              <p className="text-xs text-text-muted mt-1">{exercise.notes}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Nutrition Recommendations</h3>
                
                <Card className="p-4 mb-6">
                  <ul className="space-y-2">
                    {plan.nutrition.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-neon-green mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessPlanPage;
