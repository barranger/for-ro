import React from 'react';
import { Link } from 'react-router-dom';
import modules from '../config/modules';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to My Learning
          </h1>
          <p className="text-xl text-gray-600">
            Explore interactive modules to master science, English, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(modules).map(([key, module]) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {module.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {module.description}
                </p>
                <div className="space-y-2">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <div key={index} className="text-sm text-gray-500">
                      • {topic}
                    </div>
                  ))}
                </div>
                <Link
                  to={`/module/${key}`}
                  className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Explore Module
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 