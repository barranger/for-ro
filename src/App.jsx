import { useState } from 'react'
import ChemistryQuiz from './components/ChemistryQuiz'
import './App.css'

function App() {
  const [page, setPage] = useState('chemistry')

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600">Chemistry Learning</span>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setPage('chemistry')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${page === 'chemistry' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Nomenclature Quiz
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-10">
        {page === 'chemistry' && <ChemistryQuiz />}
      </main>
      
      <footer className="bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Chemistry Learning App
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
