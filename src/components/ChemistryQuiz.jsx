import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Mock data for chemistry questions based on the test image
const chemistryQuestions = {
  writeFormula: [
    { id: 1, name: 'lead(II) nitrate', formula: 'Pb(NO₃)₂' },
    { id: 2, name: 'oxygen difluoride', formula: 'OF₂' },
    { id: 3, name: 'tin(IV) sulfide', formula: 'SnS₂' },
    { id: 4, name: 'potassium sulfate', formula: 'K₂SO₄' },
    { id: 5, name: 'aluminum oxide', formula: 'Al₂O₃' },
    { id: 6, name: 'diphosphorous pentoxide', formula: 'P₂O₅' },
    { id: 7, name: 'calcium chloride', formula: 'CaCl₂' },
    { id: 8, name: 'iron(III) oxide', formula: 'Fe₂O₃' },
    { id: 9, name: 'copper(II) sulfate', formula: 'CuSO₄' },
    { id: 10, name: 'sodium hydroxide', formula: 'NaOH' },
  ],
  nameCompound: [
    { id: 1, formula: 'Na₂CO₃', name: 'sodium carbonate' },
    { id: 2, formula: 'CuCl', name: 'copper(I) chloride' },
    { id: 3, formula: 'Fe₃N₂', name: 'iron(II) nitride' },
    { id: 4, formula: 'P₂O₃', name: 'diphosphorus trioxide' },
    { id: 5, formula: 'NO₂', name: 'nitrogen dioxide' },
    { id: 6, formula: 'CaI₂', name: 'calcium iodide' },
    { id: 7, formula: 'MgSO₄', name: 'magnesium sulfate' },
    { id: 8, formula: 'KMnO₄', name: 'potassium permanganate' },
    { id: 9, formula: 'H₃PO₄', name: 'phosphoric acid' },
    { id: 10, formula: 'NH₄Cl', name: 'ammonium chloride' },
  ]
};

// Helper function to get random questions
const getRandomQuestions = (questionsArray, count) => {
  const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ChemistryQuiz = () => {
  const [formulaQuestions, setFormulaQuestions] = useState([]);
  const [nameQuestions, setNameQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showingAnswers, setShowingAnswers] = useState(false);

  // Generate random questions on component mount
  useEffect(() => {
    setFormulaQuestions(getRandomQuestions(chemistryQuestions.writeFormula, 6));
    setNameQuestions(getRandomQuestions(chemistryQuestions.nameCompound, 6));
    // Initialize empty answers object
    const initialAnswers = {};
    [...getRandomQuestions(chemistryQuestions.writeFormula, 6), 
     ...getRandomQuestions(chemistryQuestions.nameCompound, 6)].forEach(q => {
      initialAnswers[q.id] = '';
    });
    setAnswers(initialAnswers);
  }, []);

  const handleInputChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    
    formulaQuestions.forEach(q => {
      if (answers[q.id]?.toLowerCase().replace(/\s+/g, '') === q.formula.toLowerCase().replace(/\s+/g, '')) {
        correctCount++;
      }
    });
    
    nameQuestions.forEach(q => {
      if (answers[q.id]?.toLowerCase().replace(/\s+/g, '') === q.name.toLowerCase().replace(/\s+/g, '')) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
  };

  const resetQuiz = () => {
    // Generate new questions
    setFormulaQuestions(getRandomQuestions(chemistryQuestions.writeFormula, 6));
    setNameQuestions(getRandomQuestions(chemistryQuestions.nameCompound, 6));
    
    // Reset answers
    const initialAnswers = {};
    [...getRandomQuestions(chemistryQuestions.writeFormula, 6), 
     ...getRandomQuestions(chemistryQuestions.nameCompound, 6)].forEach(q => {
      initialAnswers[q.id] = '';
    });
    setAnswers(initialAnswers);
    
    // Reset state
    setSubmitted(false);
    setScore(0);
    setShowingAnswers(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Chemistry Nomenclature Quiz</h1>
        <p className="text-lg text-gray-600">Test your knowledge of chemical formulas and naming</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">1. Write the formula for each compound:</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {formulaQuestions.map((question, index) => (
              <motion.div 
                key={question.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg font-medium text-gray-700 mr-2">{String.fromCharCode(97 + index)})</span>
                  <motion.span 
                    className="transition-all duration-300 ease-in-out transform"
                    whileHover={{ scale: 1.02 }}
                  >
                    {question.name}
                  </motion.span>
                </div>
                
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  disabled={submitted}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter formula..."
                />
                
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mt-1 text-sm ${answers[question.id]?.toLowerCase().replace(/\s+/g, '') === question.formula.toLowerCase().replace(/\s+/g, '') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {answers[question.id]?.toLowerCase().replace(/\s+/g, '') === question.formula.toLowerCase().replace(/\s+/g, '') 
                      ? '✓ Correct!' 
                      : `✗ Incorrect. ${showingAnswers ? `Correct answer: ${question.formula}` : ''}`}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">2. Write the name for each formula:</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nameQuestions.map((question, index) => (
              <motion.div 
                key={question.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg font-medium text-gray-700 mr-2">{String.fromCharCode(97 + index)})</span>
                  <motion.span 
                    className="transition-all duration-300 ease-in-out transform font-mono"
                    whileHover={{ scale: 1.02 }}
                  >
                    {question.formula}
                  </motion.span>
                </div>
                
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  disabled={submitted}
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter name..."
                />
                
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mt-1 text-sm ${answers[question.id]?.toLowerCase().replace(/\s+/g, '') === question.name.toLowerCase().replace(/\s+/g, '') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {answers[question.id]?.toLowerCase().replace(/\s+/g, '') === question.name.toLowerCase().replace(/\s+/g, '') 
                      ? '✓ Correct!' 
                      : `✗ Incorrect. ${showingAnswers ? `Correct answer: ${question.name}` : ''}`}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {!submitted ? (
            <motion.button
              type="submit"
              className="px-4 py-2 rounded-md text-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Answers
            </motion.button>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={() => setShowingAnswers(!showingAnswers)}
                className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showingAnswers ? 'Hide Answers' : 'Show Answers'}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={resetQuiz}
                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try New Questions
              </motion.button>
            </>
          )}
        </div>
      </form>

      {submitted && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <h3 className="text-2xl font-bold">Your Score: {score}/{formulaQuestions.length + nameQuestions.length}</h3>
          <p className="text-lg text-gray-600 mt-2">
            {score === (formulaQuestions.length + nameQuestions.length) 
              ? 'Excellent work! Perfect score!' 
              : score >= (formulaQuestions.length + nameQuestions.length) * 0.7 
                ? 'Great job! You know your chemistry well!' 
                : 'Keep practicing. You\'ll master chemical nomenclature soon!'}
          </p>
        </motion.div>
      )}

      <motion.div 
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Created to help with chemistry homework</p>
        <p>Use this app to practice naming compounds and writing chemical formulas!</p>
      </motion.div>
    </div>
  );
};

export default ChemistryQuiz; 