import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Sample data - in a real app, this would come from an API or database
const weightData = [
  { name: '1 Jan', value: 82 },
  { name: '8 Jan', value: 81.2 },
  { name: '15 Jan', value: 80.5 },
  { name: '22 Jan', value: 79.8 },
  { name: '29 Jan', value: 79.3 },
  { name: '5 Feb', value: 78.9 },
  { name: '12 Feb', value: 78.4 },
];

const workoutData = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 0 },
  { name: 'Wed', value: 60 },
  { name: 'Thu', value: 30 },
  { name: 'Fri', value: 75 },
  { name: 'Sat', value: 90 },
  { name: 'Sun', value: 0 },
];

const caloriesData = [
  { name: 'Protein', value: 30 },
  { name: 'Carbs', value: 45 },
  { name: 'Fat', value: 25 },
];

const COLORS = ['#00FFFF', '#39FF14', '#FF4560'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-tertiary p-3 border border-metallic-dark rounded-md shadow-lg">
        <p className="text-text-primary font-medium">{`${label}`}</p>
        <p className="text-neon-blue">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const ProgressPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  // In a real app, this would filter the data based on timeframe
  const handleTimeframeChange = (newTimeframe: 'week' | 'month' | 'year') => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-text-secondary">Visualize your fitness journey</p>
        </div>
        
        <div className="mb-6">
          <div className="flex gap-2">
            <Button
              variant={timeframe === 'week' ? 'primary' : 'outline'}
              neonColor="blue"
              size="sm"
              onClick={() => handleTimeframeChange('week')}
            >
              Week
            </Button>
            <Button
              variant={timeframe === 'month' ? 'primary' : 'outline'}
              neonColor="blue"
              size="sm"
              onClick={() => handleTimeframeChange('month')}
            >
              Month
            </Button>
            <Button
              variant={timeframe === 'year' ? 'primary' : 'outline'}
              neonColor="blue"
              size="sm"
              onClick={() => handleTimeframeChange('year')}
            >
              Year
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Weight Progress Chart */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00FFFF"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#121212', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#00FFFF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-sm text-text-secondary">
              <span>Starting: 82 kg</span>
              <span>Current: 78.4 kg</span>
              <span>Change: -3.6 kg</span>
            </div>
          </Card>
          
          {/* Workout Duration Chart */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Workout Duration (mins)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={workoutData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#39FF14"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-sm text-text-secondary">
              <span>Total: 300 mins</span>
              <span>Average: 43 mins/day</span>
              <span>Peak: 90 mins</span>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Macro Distribution */}
          <Card className="p-4 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Macro Distribution</h2>
            <div className="h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={caloriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {caloriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {caloriesData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-text-secondary">{entry.name}</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Stats Summary */}
          <Card className="p-4 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Weekly Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Workouts" value="5" unit="sessions" icon="📈" color="blue" />
              <StatCard title="Total Duration" value="300" unit="minutes" icon="⏱️" color="green" />
              <StatCard title="Calories Burned" value="1,860" unit="kcal" icon="🔥" color="blue" />
              <StatCard title="Weight Change" value="-0.5" unit="kg" icon="⚖️" color="green" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: string;
  color: 'blue' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon, color }) => {
  return (
    <div className={`p-4 border border-metallic-dark rounded-lg hover:border-neon-${color} transition-colors duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-text-secondary text-sm">{title}</p>
          <p className={`text-2xl font-bold text-neon-${color}`}>{value}</p>
          <p className="text-text-secondary text-sm">{unit}</p>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
};

export default ProgressPage;
