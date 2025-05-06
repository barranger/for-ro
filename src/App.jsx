import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import LandingPage from './pages/LandingPage';
import ModuleOverview from './pages/ModuleOverview';
import TopicPage from './pages/TopicPage';
import ChemistryQuiz from './components/ChemistryQuiz';
import Header from './components/ModuleSelector';
import './App.css';
import modules from './config/modules';
import { auth, onAuthStateChanged } from './config/firebase';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (user === undefined) return null; // or a loading spinner
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function App() {
  const [currentModule, setCurrentModule] = useState('science');

  return (
    <AuthProvider>
      <Router basename="/for-ro">
        <div className="min-h-screen bg-gray-50">
          <Header 
            modules={modules} 
            currentModule={currentModule} 
            onModuleChange={setCurrentModule} 
          />
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<RequireAuth><LandingPage /></RequireAuth>} />
            <Route path="/module/:moduleId" element={<RequireAuth><ModuleOverview modules={modules} /></RequireAuth>} />
            <Route path="/module/:moduleId/:topicId" element={<RequireAuth><TopicPage modules={modules} /></RequireAuth>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
