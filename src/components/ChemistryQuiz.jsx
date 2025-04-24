import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Helper component to display text with subscripts
const FormulaDisplay = ({ formula }) => {
  // Split the formula into segments with subscripts
  if (!formula) return null;
  
  const segments = [];
  let currentText = '';
  let currentNum = '';
  let inSubscript = false;
  
  // Parse the formula
  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];
    // Check if we're dealing with a number that should be subscript
    if (/[0-9]/.test(char)) {
      if (currentText) {
        segments.push({ text: currentText, isSubscript: false });
        currentText = '';
      }
      currentNum += char;
      inSubscript = true;
    } else {
      if (inSubscript && currentNum) {
        segments.push({ text: currentNum, isSubscript: true });
        currentNum = '';
        inSubscript = false;
      }
      currentText += char;
    }
  }
  
  // Add any remaining text
  if (currentText) {
    segments.push({ text: currentText, isSubscript: false });
  }
  
  // Add any remaining number
  if (currentNum) {
    segments.push({ text: currentNum, isSubscript: true });
  }
  
  return (
    <span className="inline-flex items-baseline">
      {segments.map((segment, index) => (
        segment.isSubscript ? (
          <sub key={index} className="relative text-xs bottom-[-0.25em]">{segment.text}</sub>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      ))}
    </span>
  );
};

// Helper function to normalize formula input
const normalizeFormula = (input) => {
  // Convert unicode subscripts to regular numbers for comparison
  const subscriptMap = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', 
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
  };
  
  return input.replace(/[₀-₉]/g, m => subscriptMap[m])
              .toLowerCase()
              .replace(/\s+/g, '');
};

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
  // We use answersMap to keep track of the mapping between keys and question IDs
  // but we don't actively reference it, so we can suppress the linter warning
  // eslint-disable-next-line no-unused-vars
  const [answersMap, setAnswersMap] = useState({});

  // Generate random questions on component mount
  useEffect(() => {
    const newFormulaQuestions = getRandomQuestions(chemistryQuestions.writeFormula, 6);
    const newNameQuestions = getRandomQuestions(chemistryQuestions.nameCompound, 6);
    
    setFormulaQuestions(newFormulaQuestions);
    setNameQuestions(newNameQuestions);
    
    // Initialize empty answers object with unique keys for each question
    const initialAnswers = {};
    const initialAnswersMap = {};
    
    newFormulaQuestions.forEach((q, index) => {
      const key = `formula_${q.id}_${index}`;
      initialAnswers[key] = '';
      initialAnswersMap[key] = q.id;
    });
    
    newNameQuestions.forEach((q, index) => {
      const key = `name_${q.id}_${index}`;
      initialAnswers[key] = '';
      initialAnswersMap[key] = q.id;
    });
    
    setAnswers(initialAnswers);
    setAnswersMap(initialAnswersMap);
  }, []);

  const handleInputChange = (key, value) => {
    setAnswers({
      ...answers,
      [key]: value
    });
  };

  const handleSubscriptKey = (e, key) => {
    // Convert numbers to subscripts when user presses Ctrl+number
    if (e.ctrlKey && e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
      };
      
      const cursorPos = e.target.selectionStart;
      const value = answers[key] || '';
      const newValue = 
        value.substring(0, cursorPos) + 
        subscriptMap[e.key] + 
        value.substring(cursorPos);
      
      handleInputChange(key, newValue);
      
      // Set cursor position after the inserted character
      setTimeout(() => {
        e.target.selectionStart = cursorPos + 1;
        e.target.selectionEnd = cursorPos + 1;
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Calculate score
    let correctCount = 0;
    
    // Check formula answers
    formulaQuestions.forEach((q, index) => {
      const key = `formula_${q.id}_${index}`;
      const userAnswer = answers[key] || '';
      const correctAnswer = q.formula;
      
      if (normalizeFormula(userAnswer) === normalizeFormula(correctAnswer)) {
        correctCount++;
      }
    });
    
    // Check name answers
    nameQuestions.forEach((q, index) => {
      const key = `name_${q.id}_${index}`;
      const userAnswer = answers[key] || '';
      const correctAnswer = q.name;
      
      if (userAnswer.toLowerCase().replace(/\s+/g, '') === correctAnswer.toLowerCase().replace(/\s+/g, '')) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
  };

  const resetQuiz = () => {
    // Generate new questions
    const newFormulaQuestions = getRandomQuestions(chemistryQuestions.writeFormula, 6);
    const newNameQuestions = getRandomQuestions(chemistryQuestions.nameCompound, 6);
    
    setFormulaQuestions(newFormulaQuestions);
    setNameQuestions(newNameQuestions);
    
    // Reset answers with unique keys
    const initialAnswers = {};
    const initialAnswersMap = {};
    
    newFormulaQuestions.forEach((q, index) => {
      const key = `formula_${q.id}_${index}`;
      initialAnswers[key] = '';
      initialAnswersMap[key] = q.id;
    });
    
    newNameQuestions.forEach((q, index) => {
      const key = `name_${q.id}_${index}`;
      initialAnswers[key] = '';
      initialAnswersMap[key] = q.id;
    });
    
    setAnswers(initialAnswers);
    setAnswersMap(initialAnswersMap);
    
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
        {!submitted && (
          <div className="mt-3 text-sm bg-blue-50 p-3 rounded-md text-blue-800">
            <p>Pro tip: Use Ctrl+Number to enter subscripts (e.g., Ctrl+2 for ₂)</p>
          </div>
        )}
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
            {formulaQuestions.map((question, index) => {
              const key = `formula_${question.id}_${index}`;
              return (
                <motion.div 
                  key={key}
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
                    value={answers[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    onKeyDown={(e) => handleSubscriptKey(e, key)}
                    disabled={submitted}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500 font-mono"
                    placeholder="Enter formula (Ctrl+number for subscripts)..."
                  />
                  
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`mt-1 text-sm ${normalizeFormula(answers[key] || '') === normalizeFormula(question.formula) ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {normalizeFormula(answers[key] || '') === normalizeFormula(question.formula) 
                        ? '✓ Correct!' 
                        : `✗ Incorrect. ${showingAnswers ? 'Correct answer: ' : ''}`}
                      {showingAnswers && !normalizeFormula(answers[key] || '') === normalizeFormula(question.formula) && (
                        <FormulaDisplay formula={question.formula} />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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
            {nameQuestions.map((question, index) => {
              const key = `name_${question.id}_${index}`;
              return (
                <motion.div 
                  key={key}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-medium text-gray-700 mr-2">{String.fromCharCode(97 + index)})</span>
                    <motion.span 
                      className="transition-all duration-300 ease-in-out transform font-mono"
                      whileHover={{ scale: 1.02 }}
                    >
                      <FormulaDisplay formula={question.formula} />
                    </motion.span>
                  </div>
                  
                  <input
                    type="text"
                    value={answers[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    disabled={submitted}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Enter name..."
                  />
                  
                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`mt-1 text-sm ${(answers[key] || '').toLowerCase().replace(/\s+/g, '') === question.name.toLowerCase().replace(/\s+/g, '') ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {(answers[key] || '').toLowerCase().replace(/\s+/g, '') === question.name.toLowerCase().replace(/\s+/g, '') 
                        ? '✓ Correct!' 
                        : `✗ Incorrect. ${showingAnswers ? `Correct answer: ${question.name}` : ''}`}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
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