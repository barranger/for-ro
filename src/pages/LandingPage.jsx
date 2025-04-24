import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import modules from '../config/modules';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Science Learning
          </h1>
          <p className="text-xl text-gray-600">
            Explore interactive modules to master chemistry, physics, and biology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(modules).map(([key, module]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage; 