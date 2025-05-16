import React, { useState } from 'react';
import { Search, Filter, BookOpen, FileText, Video, Podcast } from 'lucide-react';
import ResourceCard from '../components/Resources/ResourceCard';

const resourceCategories = [
  { id: 'all', label: 'All Resources' },
  { id: 'substance', label: 'Substance Addiction' },
  { id: 'alcohol', label: 'Alcohol Addiction' },
  { id: 'gambling', label: 'Gambling Addiction' },
  { id: 'technology', label: 'Technology Addiction' },
  { id: 'coping', label: 'Coping Strategies' },
  { id: 'relapse', label: 'Relapse Prevention' }
];

const resourceTypes = [
  { id: 'all', label: 'All Types', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'article', label: 'Articles', icon: <FileText className="w-4 h-4" /> },
  { id: 'video', label: 'Videos', icon: <Video className="w-4 h-4" /> },
  { id: 'audio', label: 'Podcasts', icon: <Podcast className="w-4 h-4" /> }
];

// Sample resources data
const resources = [
  {
    id: 1,
    title: 'Understanding the Addiction Cycle',
    description: 'Learn about the neurological and psychological aspects of addiction and how they form a cycle.',
    category: 'substance',
    type: 'article',
    time: '8 min read',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Identifying and Managing Triggers',
    description: 'Practical techniques to identify personal triggers and develop strategies to manage them effectively.',
    category: 'coping',
    type: 'article',
    time: '12 min read',
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Mindfulness Meditation for Recovery',
    description: 'Guided meditation practices specifically designed to help during recovery and craving moments.',
    category: 'coping',
    type: 'video',
    time: '15 min watch',
    difficulty: 'Beginner'
  },
  {
    id: 4,
    title: 'Building a Sober Support Network',
    description: 'How to create and maintain relationships that support your recovery journey.',
    category: 'relapse',
    type: 'article',
    time: '10 min read',
    difficulty: 'Intermediate'
  },
  {
    id: 5,
    title: 'The Science of Alcohol Addiction',
    description: 'An in-depth look at how alcohol affects the brain and body, and why addiction develops.',
    category: 'alcohol',
    type: 'video',
    time: '22 min watch',
    difficulty: 'Advanced'
  },
  {
    id: 6,
    title: 'Digital Detox Strategies',
    description: 'Practical steps to reduce technology dependence and create healthier digital habits.',
    category: 'technology',
    type: 'article',
    time: '7 min read',
    difficulty: 'Beginner'
  },
  {
    id: 7,
    title: 'Recovery Stories: From Gambling to Freedom',
    description: 'Personal accounts of recovery from gambling addiction and the strategies that worked.',
    category: 'gambling',
    type: 'audio',
    time: '35 min listen',
    difficulty: 'Beginner'
  },
  {
    id: 8,
    title: 'Creating a Relapse Prevention Plan',
    description: 'Step-by-step guide to developing a personalized plan to prevent relapse.',
    category: 'relapse',
    type: 'article',
    time: '15 min read',
    difficulty: 'Intermediate'
  }
];

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Filter resources based on search, category, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
      <p className="text-gray-600 mb-8">Explore our library of expert-reviewed content to support your recovery journey.</p>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {resourceCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {resourceTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No resources found matching your criteria.</p>
            <button 
              className="mt-2 text-blue-600 hover:underline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Need Help Banner */}
      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Can't Find What You Need?</h2>
        <p className="text-gray-700 mb-4">Our team can help you find specific resources or connect you with additional support.</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
          Contact Support Team
        </button>
      </div>
    </div>
  );
};

export default Resources;