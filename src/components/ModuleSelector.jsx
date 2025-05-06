import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { auth, provider, signInWithPopup, signOut } from '../config/firebase';

const Header = ({ modules, currentModule, onModuleChange }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-600">
              My Learning
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {modules[currentModule]?.name || 'Select Module'} ▼
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  {Object.entries(modules).map(([id, module]) => (
                    <button
                      key={id}
                      onClick={() => {
                        onModuleChange(id);
                        setMenuOpen(false);
                        navigate(`/module/${id}`);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${currentModule === id ? 'font-bold text-blue-700' : ''}`}
                    >
                      {module.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {user && (
              <span className="text-gray-700 font-medium">{user.displayName}</span>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 