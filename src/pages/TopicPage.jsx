import React from 'react';
import { useParams } from 'react-router-dom';
import ChemicalProperties from '../components/ChemicalProperties';
import MacbethQuiz from '../components/MacbethQuiz';

const TopicPage = ({ modules }) => {
  const { moduleId, topicId } = useParams();
  const module = modules[moduleId];

  if (!module) {
    return <div>Module not found</div>;
  }

  const topic = module.topics.find(t => t === decodeURIComponent(topicId));

  if (!topic) {
    return <div>Topic not found</div>;
  }

  // Render the appropriate component based on the topic
  if (topic === "Chemicals and their Properties") {
    return <ChemicalProperties />;
  }

  if (topic === "Macbeth Act 1") {
    return <MacbethQuiz />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{topic}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Content for this topic is coming soon...
        </p>
      </div>
    </div>
  );
};

export default TopicPage; 