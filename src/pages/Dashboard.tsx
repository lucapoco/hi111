import React from 'react';
import { CalendarDays, MessageCircle, BarChart, Award } from 'lucide-react';
import ProgressChart from '../components/Dashboard/ProgressChart';
import MilestoneCard from '../components/Dashboard/MilestoneCard';
import ActionCard from '../components/Dashboard/ActionCard';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Recovery Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <CalendarDays className="w-5 h-5 text-green-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Days Sober</h3>
          </div>
          <p className="text-3xl font-bold">32</p>
          <p className="text-green-600 text-sm mt-1">↑ 7 days from last week</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Support Sessions</h3>
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-blue-600 text-sm mt-1">3 scheduled this week</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <BarChart className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Cravings Managed</h3>
          </div>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-purple-600 text-sm mt-1">↑ 12% from last month</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-yellow-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Achievements</h3>
          </div>
          <p className="text-3xl font-bold">8</p>
          <p className="text-yellow-600 text-sm mt-1">2 new this week!</p>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Recovery Progress</h2>
            <ProgressChart />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Next Milestones</h2>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <MilestoneCard 
                title="45 Days Sober" 
                description="You're almost there! Just 13 more days to reach this significant milestone."
                progress={71}
              />
              <MilestoneCard 
                title="Complete 5 Educational Modules" 
                description="You've completed 3 of 5 educational modules. Keep learning!"
                progress={60}
              />
              <MilestoneCard 
                title="Attend 10 Support Sessions" 
                description="You've attended 7 support sessions so far. 3 more to go!"
                progress={70}
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Actions and Resources */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Recommended Actions</h2>
            <div className="space-y-4">
              <ActionCard 
                title="Complete Your Daily Check-in"
                description="Track your mood and triggers to gain insights."
                buttonText="Check In Now"
                buttonLink="/profile"
                priority="high"
              />
              <ActionCard 
                title="Schedule Support Session"
                description="Talk to a trained volunteer or specialist."
                buttonText="Schedule"
                buttonLink="/chat"
                priority="medium"
              />
              <ActionCard 
                title="Read Recovery Story"
                description="Get inspired by others on similar journeys."
                buttonText="Read Story"
                buttonLink="/resources"
                priority="low"
              />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Need Immediate Help?</h2>
            <p className="text-gray-700 mb-4">Our AI support assistant is available 24/7 for guidance and coping strategies.</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300">
              Talk to AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;