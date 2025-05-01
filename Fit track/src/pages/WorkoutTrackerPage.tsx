import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface WorkoutLog {
  id: string;
  exercise: string;
  sets: string;
  reps: string;
  weight: string;
  date: string;
  calories: string;
  duration: string;
}

const WorkoutTrackerPage: React.FC = () => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<WorkoutLog>({
    id: '',
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().slice(0, 10),
    calories: '',
    duration: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('workoutLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save to localStorage when logs change
  useEffect(() => {
    localStorage.setItem('workoutLogs', JSON.stringify(logs));
  }, [logs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing log
      setLogs(logs.map(log => 
        log.id === editingId ? { ...formData, id: editingId } : log
      ));
      setEditingId(null);
    } else {
      // Add new log
      const newLog: WorkoutLog = {
        ...formData,
        id: Date.now().toString()
      };
      setLogs([...logs, newLog]);
    }
    
    // Reset form
    setFormData({
      id: '',
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
      date: new Date().toISOString().slice(0, 10),
      calories: '',
      duration: ''
    });
    
    setShowForm(false);
  };

  const handleEdit = (log: WorkoutLog) => {
    setFormData(log);
    setEditingId(log.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      id: '',
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
      date: new Date().toISOString().slice(0, 10),
      calories: '',
      duration: ''
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workout Tracker</h1>
            <p className="text-text-secondary">Log and track your exercise progress</p>
          </div>
          
          <Button
            variant={showForm ? "outline" : "primary"}
            neonColor={showForm ? "blue" : "green"}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
          >
            {showForm ? (
              <>
                <X size={18} /> Hide Form
              </>
            ) : (
              <>
                <Plus size={18} /> Add Workout
              </>
            )}
          </Button>
        </div>
        
        {showForm && (
          <Card className="p-6 mb-6 animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Exercise Name"
                  type="text"
                  name="exercise"
                  placeholder="e.g., Bench Press, Running"
                  required
                  value={formData.exercise}
                  onChange={handleChange}
                />
                
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
                
                <Input
                  label="Sets"
                  type="number"
                  name="sets"
                  placeholder="Number of sets"
                  value={formData.sets}
                  onChange={handleChange}
                />
                
                <Input
                  label="Reps"
                  type="text"
                  name="reps"
                  placeholder="e.g., 12 or 8-10"
                  value={formData.reps}
                  onChange={handleChange}
                />
                
                <Input
                  label="Weight (kg/lbs)"
                  type="text"
                  name="weight"
                  placeholder="e.g., 50kg or 100lbs"
                  value={formData.weight}
                  onChange={handleChange}
                />
                
                <Input
                  label="Duration (minutes)"
                  type="number"
                  name="duration"
                  placeholder="e.g., 30"
                  value={formData.duration}
                  onChange={handleChange}
                />
                
                <Input
                  label="Calories Burned (estimated)"
                  type="number"
                  name="calories"
                  placeholder="e.g., 250"
                  value={formData.calories}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  neonColor="green"
                  className="flex items-center gap-2"
                >
                  <Save size={18} />
                  {editingId ? 'Update Workout' : 'Save Workout'}
                </Button>
                
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    neonColor="blue"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        )}
        
        {logs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logs.map(log => (
              <Card 
                key={log.id} 
                className="p-4 hover:translate-y-[-2px] transition-transform duration-300"
                neonBorder={log.id === editingId ? 'green' : 'none'}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{log.exercise}</h3>
                    <p className="text-text-secondary text-sm">{new Date(log.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(log)}
                      className="p-1.5 rounded-md bg-background-tertiary text-text-secondary hover:text-neon-blue"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(log.id)}
                      className="p-1.5 rounded-md bg-background-tertiary text-text-secondary hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {log.sets && (
                    <div className="bg-background-tertiary rounded-md p-2">
                      <p className="text-xs text-text-secondary">Sets</p>
                      <p className="font-medium">{log.sets}</p>
                    </div>
                  )}
                  
                  {log.reps && (
                    <div className="bg-background-tertiary rounded-md p-2">
                      <p className="text-xs text-text-secondary">Reps</p>
                      <p className="font-medium">{log.reps}</p>
                    </div>
                  )}
                  
                  {log.weight && (
                    <div className="bg-background-tertiary rounded-md p-2">
                      <p className="text-xs text-text-secondary">Weight</p>
                      <p className="font-medium">{log.weight}</p>
                    </div>
                  )}
                  
                  {log.duration && (
                    <div className="bg-background-tertiary rounded-md p-2">
                      <p className="text-xs text-text-secondary">Duration</p>
                      <p className="font-medium">{log.duration} mins</p>
                    </div>
                  )}
                  
                  {log.calories && (
                    <div className="bg-background-tertiary rounded-md p-2 col-span-2">
                      <p className="text-xs text-text-secondary">Calories Burned</p>
                      <p className="font-medium">{log.calories} kcal</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-text-secondary mb-4">No workout logs yet. Start tracking your progress!</p>
            {!showForm && (
              <Button
                variant="primary"
                neonColor="green"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2"
              >
                <Plus size={18} /> Add First Workout
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkoutTrackerPage;
