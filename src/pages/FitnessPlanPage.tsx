import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Check, ChevronLeft, Dumbbell, Apple, Target, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FormData {
  age: string; weight: string; height: string;
  gender: string; fitnessLevel: string; fitnessGoal: string;
  workoutPreference: string; customDescription: string;
  exerciseTypes: string; weightLossTarget: string;
  strengthGainTarget: string; enduranceTarget: string;
}

interface PlanData {
  title: string; description: string;
  workouts: { day: string; exercises: { name: string; sets: string; reps: string; notes?: string }[] }[];
  nutrition: string[];
}

const selectClass =
  'w-full bg-white/3 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-all backdrop-blur-xl appearance-none';
const labelClass = 'block text-xs uppercase tracking-wider text-white/55 mb-2 font-medium';
const textareaClass =
  'w-full bg-white/3 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/60 focus:bg-primary/5 transition-all backdrop-blur-xl';

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const FitnessPlanPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '', weight: '', height: '',
    gender: 'male', fitnessLevel: 'beginner', fitnessGoal: 'weight-loss',
    workoutPreference: 'cardio', customDescription: '',
    exerciseTypes: '', weightLossTarget: '', strengthGainTarget: '', enduranceTarget: ''
  });
  const [showPlan, setShowPlan] = useState(false);
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [step] = useState(1);

  useEffect(() => {
    if (formData.customDescription) {
      const a = analyzeDescription(formData.customDescription);
      if (a.strength) setFormData(prev => ({ ...prev, workoutPreference: 'strength', fitnessGoal: 'muscle-gain' }));
      else if (a.cardio) setFormData(prev => ({ ...prev, workoutPreference: 'cardio', fitnessGoal: 'weight-loss' }));
      else if (a.fatLoss) setFormData(prev => ({ ...prev, fitnessGoal: 'weight-loss' }));
    }
  }, [formData.customDescription]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlan(generatePlan(formData));
    setShowPlan(true);
  };

  const handleSelectPlan = () => {
    if (plan) {
      localStorage.setItem('fitnessPlan', JSON.stringify(plan));
      alert('Fitness plan saved to Workout Tracker');
    }
  };

  const handleRegeneratePlan = () => {
    setPlan(generatePlan(formData));
  };

  const generatePlan = (data: FormData): PlanData => {
    let planTitle = '', planDescription = '';
    let workouts: any[] = [], nutrition: string[] = [];

    if (data.fitnessGoal === 'weight-loss') {
      planTitle = 'Weight Loss Focus Plan';
      planDescription = `A ${data.fitnessLevel} level program designed to help you lose weight through a combination of ${data.workoutPreference} exercises and nutritional guidance.`;
      workouts = data.workoutPreference === 'cardio'
        ? [
            { day: 'Monday', exercises: [
              { name: 'Treadmill (Intervals)', sets: '1', reps: '30 mins' },
              { name: 'Jumping Jacks',         sets: '3', reps: '1 min each' },
              { name: 'Mountain Climbers',     sets: '3', reps: '30 sec each' }
            ]},
            { day: 'Wednesday', exercises: [
              { name: 'Cycling',    sets: '1', reps: '25 mins' },
              { name: 'Burpees',    sets: '3', reps: '10' },
              { name: 'High Knees', sets: '3', reps: '45 sec each' }
            ]},
            { day: 'Friday', exercises: [
              { name: 'Elliptical Machine', sets: '1', reps: '30 mins' },
              { name: 'Jump Rope',          sets: '3', reps: '2 mins each' },
              { name: 'Boxing Drills',      sets: '3', reps: '1 min each' }
            ]}
          ]
        : [
            { day: 'Monday', exercises: [
              { name: 'Squats',   sets: '3', reps: '12' },
              { name: 'Push-ups', sets: '3', reps: '10' },
              { name: 'Lunges',   sets: '3', reps: '10 each leg' }
            ]},
            { day: 'Wednesday', exercises: [
              { name: 'Dumbbell Rows',  sets: '3', reps: '12' },
              { name: 'Plank',          sets: '3', reps: '30 sec hold' },
              { name: 'Glute Bridges',  sets: '3', reps: '15' }
            ]},
            { day: 'Friday', exercises: [
              { name: 'Deadlifts (Light)', sets: '3', reps: '10' },
              { name: 'Tricep Dips',       sets: '3', reps: '12' },
              { name: 'Russian Twists',    sets: '3', reps: '20 total' }
            ]}
          ];
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
        { day: 'Monday - Push Day', exercises: [
          { name: 'Bench Press',         sets: '4', reps: '8-10' },
          { name: 'Shoulder Press',      sets: '3', reps: '10-12' },
          { name: 'Tricep Extensions',   sets: '3', reps: '12-15' }
        ]},
        { day: 'Wednesday - Pull Day', exercises: [
          { name: 'Pull-ups/Lat Pulldowns', sets: '4', reps: '8-10' },
          { name: 'Barbell Rows',           sets: '3', reps: '10-12' },
          { name: 'Bicep Curls',            sets: '3', reps: '12-15' }
        ]},
        { day: 'Friday - Leg Day', exercises: [
          { name: 'Squats',              sets: '4', reps: '8-10' },
          { name: 'Romanian Deadlifts',  sets: '3', reps: '10-12' },
          { name: 'Calf Raises',         sets: '3', reps: '15-20' }
        ]}
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
        { day: 'Monday', exercises: [
          { name: 'Brisk Walking/Light Jogging', sets: '1', reps: '20 mins' },
          { name: 'Bodyweight Squats',           sets: '3', reps: '12' },
          { name: 'Modified Push-ups',           sets: '3', reps: '10' }
        ]},
        { day: 'Wednesday', exercises: [
          { name: 'Yoga Flow',      sets: '1', reps: '20 mins' },
          { name: 'Plank',          sets: '3', reps: '20 sec hold' },
          { name: 'Dumbbell Rows',  sets: '3', reps: '12' }
        ]},
        { day: 'Friday', exercises: [
          { name: 'Swimming/Cycling',  sets: '1', reps: '20 mins' },
          { name: 'Lunges',            sets: '3', reps: '10 each leg' },
          { name: 'Stretching Routine',sets: '1', reps: '10 mins' }
        ]}
      ];
      nutrition = [
        'Eat at maintenance calories',
        'Focus on whole, unprocessed foods',
        'Include a variety of fruits and vegetables',
        'Stay hydrated throughout the day',
        'Practice mindful eating habits'
      ];
    }

    return { title: planTitle, description: planDescription, workouts, nutrition };
  };

  const analyzeDescription = (description: string) => {
    const l = description.toLowerCase();
    return {
      strength: l.includes('strength') || l.includes('muscle'),
      cardio:   l.includes('cardio')   || l.includes('running'),
      fatLoss:  l.includes('fat loss') || l.includes('lose fat')
    };
  };

  return (
    <div className="relative pt-32 pb-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-12">
            <div className="chip mx-auto mb-5">
              <Sparkles size={12} className="text-primary-200" />
              AI plan generator
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tightest mb-4">
              Build your <span className="text-gradient-blue">perfect plan</span>
            </h1>
            <p className="text-white/55 max-w-xl mx-auto">Tell us about yourself. We'll generate an adaptive training program tailored to your goals.</p>
          </div>
        </FadeUp>

        <AnimatePresence mode="wait">
          {!showPlan ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="strong" className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-wider text-white/50">
                  <span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>Profile</span>
                  <div className="h-px flex-1 bg-white/8" />
                  <span>Step {step} of 1</span>
                </div>

                <form onSubmit={handleSubmit}>
                  <FadeUp>
                    <div className="mb-6">
                      <label className={labelClass}>Tell us what you want</label>
                      <textarea
                        name="customDescription"
                        value={formData.customDescription}
                        onChange={handleChange}
                        placeholder="e.g. I want to build muscle and lose 5kg in 12 weeks while improving my endurance…"
                        className={textareaClass}
                        rows={3}
                      />
                    </div>
                  </FadeUp>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                    <FadeUp delay={0.05}><Input label="Age"     type="number" name="age"     placeholder="28"     required value={formData.age}     onChange={handleChange} /></FadeUp>
                    <FadeUp delay={0.10}><Input label="Weight (kg)" type="number" name="weight" placeholder="75"   required value={formData.weight}  onChange={handleChange} /></FadeUp>
                    <FadeUp delay={0.15}><Input label="Height (cm)" type="number" name="height" placeholder="180"  required value={formData.height}  onChange={handleChange} /></FadeUp>

                    <FadeUp delay={0.20}>
                      <div className="mb-4">
                        <label className={labelClass}>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </FadeUp>

                    <FadeUp delay={0.25}>
                      <div className="mb-4">
                        <label className={labelClass}>Fitness level</label>
                        <select name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className={selectClass}>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </FadeUp>

                    <FadeUp delay={0.30}>
                      <div className="mb-4">
                        <label className={labelClass}>Goal</label>
                        <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className={selectClass}>
                          <option value="weight-loss">Weight loss</option>
                          <option value="muscle-gain">Muscle gain</option>
                          <option value="general-fitness">General fitness</option>
                        </select>
                      </div>
                    </FadeUp>

                    <FadeUp delay={0.35}>
                      <div className="mb-4">
                        <label className={labelClass}>Workout preference</label>
                        <select name="workoutPreference" value={formData.workoutPreference} onChange={handleChange} className={selectClass}>
                          <option value="cardio">Cardio</option>
                          <option value="strength">Strength training</option>
                          <option value="yoga">Yoga / flexibility</option>
                          <option value="mixed">Mixed</option>
                        </select>
                      </div>
                    </FadeUp>

                    <FadeUp delay={0.40}><Input label="Preferred equipment" type="text" name="exerciseTypes" placeholder="Dumbbells, bodyweight…" value={formData.exerciseTypes} onChange={handleChange} /></FadeUp>
                    <FadeUp delay={0.45}><Input label="Weight loss target (kg)" type="number" name="weightLossTarget" placeholder="e.g. 5" value={formData.weightLossTarget} onChange={handleChange} /></FadeUp>
                    <FadeUp delay={0.50}><Input label="Strength target — bench (kg)" type="number" name="strengthGainTarget" placeholder="e.g. 10" value={formData.strengthGainTarget} onChange={handleChange} /></FadeUp>
                    <FadeUp delay={0.55}><Input label="5k run target (minutes)" type="number" name="enduranceTarget" placeholder="e.g. 30" value={formData.enduranceTarget} onChange={handleChange} /></FadeUp>
                  </div>

                  <FadeUp delay={0.6}>
                    <div className="mt-8">
                      <Button type="submit" variant="primary" size="lg" fullWidth iconRight={<Sparkles size={16} />}>
                        Generate my plan
                      </Button>
                    </div>
                  </FadeUp>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <FadeUp>
                <Button variant="ghost" size="sm" icon={<ChevronLeft size={14} />} onClick={() => setShowPlan(false)}>
                  Edit profile
                </Button>
              </FadeUp>

              {plan && (
                <>
                  <FadeUp>
                    <Card variant="strong" glow className="p-8 md:p-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider text-primary-200">
                          <Target size={12} /> Your plan
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3 text-gradient-blue">{plan.title}</h2>
                        <p className="text-white/60 max-w-2xl">{plan.description}</p>

                        <div className="flex flex-wrap gap-3 mt-8">
                          <Button variant="primary" icon={<Check size={14} />} onClick={handleSelectPlan}>Select plan</Button>
                          <Button variant="ghost"   icon={<RefreshCw size={14} />} onClick={handleRegeneratePlan}>Regenerate</Button>
                        </div>
                      </div>
                    </Card>
                  </FadeUp>

                  <FadeUp delay={0.1}>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <Dumbbell size={16} className="text-primary-300" />
                      <h3 className="text-xl font-medium">Workout schedule</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {plan.workouts.map((workout, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                        >
                          <Card className="p-5 h-full hover:shadow-glow transition-shadow">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/8">
                              <h4 className="font-medium text-primary-200">{workout.day}</h4>
                              <span className="text-xs font-mono text-white/40">D{index + 1}</span>
                            </div>
                            <ul className="space-y-3">
                              {workout.exercises.map((exercise, i) => (
                                <li key={i}>
                                  <p className="text-sm text-white">{exercise.name}</p>
                                  <p className="text-xs text-white/45 font-mono mt-0.5">{exercise.sets} × {exercise.reps}</p>
                                </li>
                              ))}
                            </ul>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <div className="flex items-center gap-3 mb-4 mt-8">
                      <Apple size={16} className="text-primary-300" />
                      <h3 className="text-xl font-medium">Nutrition</h3>
                    </div>
                    <Card className="p-6">
                      <ul className="grid md:grid-cols-2 gap-3">
                        {plan.nutrition.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6"
                          >
                            <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center mt-0.5">
                              <Activity size={12} className="text-primary-200" />
                            </div>
                            <span className="text-sm text-white/75 leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  </FadeUp>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FitnessPlanPage;