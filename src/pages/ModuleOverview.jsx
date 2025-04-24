import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ModuleOverview = ({ modules }) => {
  const { moduleId } = useParams();
  const module = modules[moduleId];

  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{module.name}</h1>
      <p className="text-gray-600 mb-8">{module.description}</p>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Topics</h2>
        <div className="grid gap-4">
          {module.topics.map((topic, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/module/${moduleId}/${encodeURIComponent(topic)}`}
                className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-900">{topic}</h3>
                  <svg 
                    className="w-6 h-6 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleOverview; 