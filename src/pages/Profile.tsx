import React, { useState } from 'react';
import { User, Bell, Shield, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { logout } = useUser();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'privacy':
        return <PrivacyTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ProfileTab />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 md:border-r border-gray-200">
            <nav className="p-4">
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-5 h-5 mr-3" />
                <span>Profile Information</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="w-5 h-5 mr-3" />
                <span>Privacy & Security</span>
              </button>
              
              <button 
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Account Settings</span>
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>
      
      {/* Profile Avatar */}
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 rounded-full p-6 mr-4">
          <User className="w-12 h-12 text-blue-600" />
        </div>
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition duration-300">
            Change Profile Picture
          </button>
        </div>
      </div>
      
      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            defaultValue="Alex"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            defaultValue="Johnson"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            defaultValue="alex.johnson@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
          <input 
            type="tel" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Goals</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            placeholder="Describe your recovery goals..."
            defaultValue="I want to maintain sobriety and develop healthier coping mechanisms. My goal is to rebuild relationships with my family and improve my overall well-being."
          />
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const NotificationsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">App Notifications</h3>
              <p className="text-sm text-gray-600">Control how you receive notifications within the app</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="ml-4 space-y-2">
            <div className="flex items-center">
              <input id="check-daily" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="check-daily" className="ml-2 text-sm text-gray-700">Daily check-in reminders</label>
            </div>
            <div className="flex items-center">
              <input id="check-milestones" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="check-milestones" className="ml-2 text-sm text-gray-700">Milestone achievements</label>
            </div>
            <div className="flex items-center">
              <input id="check-support" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="check-support" className="ml-2 text-sm text-gray-700">Support session reminders</label>
            </div>
            <div className="flex items-center">
              <input id="check-resources" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="check-resources" className="ml-2 text-sm text-gray-700">New resources alerts</label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Email Notifications</h3>
              <p className="text-sm text-gray-600">Control the emails you receive</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="ml-4 space-y-2">
            <div className="flex items-center">
              <input id="email-weekly" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="email-weekly" className="ml-2 text-sm text-gray-700">Weekly progress summary</label>
            </div>
            <div className="flex items-center">
              <input id="email-milestones" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="email-milestones" className="ml-2 text-sm text-gray-700">Milestone achievements</label>
            </div>
            <div className="flex items-center">
              <input id="email-resources" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="email-resources" className="ml-2 text-sm text-gray-700">New resources in your areas of interest</label>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Text Message Notifications</h3>
              <p className="text-sm text-gray-600">Receive text messages for critical updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const PrivacyTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold mb-2">Data Privacy</h3>
          <p className="text-sm text-gray-600 mb-4">
            Control how your personal information is used and shared within the platform.
          </p>
          
          <div className="space-y-3 ml-2">
            <div className="flex items-center">
              <input id="privacy-profile" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="privacy-profile" className="ml-2 text-sm text-gray-700">Show my progress on community dashboard</label>
            </div>
            <div className="flex items-center">
              <input id="privacy-stories" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="privacy-stories" className="ml-2 text-sm text-gray-700">Allow anonymous sharing of my recovery story</label>
            </div>
            <div className="flex items-center">
              <input id="privacy-data" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="privacy-data" className="ml-2 text-sm text-gray-700">Allow anonymous data use for platform improvement</label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold mb-2">Account Security</h3>
          <p className="text-sm text-gray-600 mb-4">
            Manage your account security settings.
          </p>
          
          <div className="space-y-4">
            <div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Change Password
              </button>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Session Timeout</h4>
                  <p className="text-xs text-gray-500">Automatically log out after period of inactivity</p>
                </div>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Data Management</h3>
          <p className="text-sm text-gray-600 mb-4">
            Manage your personal data stored on our platform.
          </p>
          
          <div className="space-y-3">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
              Download My Data
            </button>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium block">
              Delete My Account
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SettingsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold mb-2">Language Preferences</h3>
          <div className="max-w-xs">
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Chinese (Simplified)</option>
            </select>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold mb-2">Accessibility</h3>
          <div className="space-y-3 ml-2">
            <div className="flex items-center">
              <input id="high-contrast" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="high-contrast" className="ml-2 text-sm text-gray-700">High contrast mode</label>
            </div>
            <div className="flex items-center">
              <input id="large-text" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="large-text" className="ml-2 text-sm text-gray-700">Larger text size</label>
            </div>
            <div className="flex items-center">
              <input id="reduce-motion" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="reduce-motion" className="ml-2 text-sm text-gray-700">Reduce motion</label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Recovery Focus</h3>
          <p className="text-sm text-gray-600 mb-2">
            Select the addiction types you'd like to focus on. This helps us customize your experience.
          </p>
          
          <div className="space-y-2 ml-2">
            <div className="flex items-center">
              <input id="focus-substance" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="focus-substance" className="ml-2 text-sm text-gray-700">Substance addiction</label>
            </div>
            <div className="flex items-center">
              <input id="focus-alcohol" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="focus-alcohol" className="ml-2 text-sm text-gray-700">Alcohol addiction</label>
            </div>
            <div className="flex items-center">
              <input id="focus-gambling" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="focus-gambling" className="ml-2 text-sm text-gray-700">Gambling addiction</label>
            </div>
            <div className="flex items-center">
              <input id="focus-technology" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="focus-technology" className="ml-2 text-sm text-gray-700">Technology addiction</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Profile;