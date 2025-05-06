import { Link, useLocation } from 'react-router-dom';

const ModuleSelector = ({ modules, currentModule, onModuleChange }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-blue-600">
              My Learning
            </span>
          </Link>
          
          {!isHome && (
            <div className="flex space-x-4">
              {Object.entries(modules).map(([id, module]) => (
                <Link
                  key={id}
                  to={`/module/${id}`}
                  onClick={() => onModuleChange(id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${currentModule === id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {module.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ModuleSelector; 