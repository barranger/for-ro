import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ModuleOverview from './pages/ModuleOverview';
import TopicPage from './pages/TopicPage';
import ChemistryQuiz from './components/ChemistryQuiz';
import ModuleSelector from './components/ModuleSelector';
import './App.css';
import modules from './config/modules';

// Define our available modules
const MODULES = {
  chemistry: {
    name: 'Chemistry',
    description: 'Learn about atoms, molecules, and chemical reactions',
    topics: [
      {
        id: 'nomenclature',
        name: 'Chemical Nomenclature',
        description: 'Learn how to name chemical compounds and write chemical formulas',
        component: ChemistryQuiz
      },
      // More topics will be added here
    ]
  },
  // More modules will be added here
};

function App() {
  const [currentModule, setCurrentModule] = useState('chemical_reactions');

  return (
    <Router basename="/for-ro">
      <div className="min-h-screen bg-gray-50">
        <ModuleSelector 
          modules={modules} 
          currentModule={currentModule} 
          onModuleChange={setCurrentModule} 
        />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/module/:moduleId" element={<ModuleOverview modules={modules} />} />
          <Route path="/module/:moduleId/:topicId" element={<TopicPage modules={modules} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
