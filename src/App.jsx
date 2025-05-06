import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ModuleOverview from './pages/ModuleOverview';
import TopicPage from './pages/TopicPage';
import ChemistryQuiz from './components/ChemistryQuiz';
import ModuleSelector from './components/ModuleSelector';
import './App.css';
import modules from './config/modules';

function App() {
  const [currentModule, setCurrentModule] = useState('science');

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
