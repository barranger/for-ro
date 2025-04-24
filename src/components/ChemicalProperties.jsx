import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChemicalProperties = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = {
    basicFormulas: {
      id: 1,
      text: "Name these basic chemical compounds:",
      compounds: [
        { 
          id: 'a', 
          formula: "NaCl",
          answer: "sodium chloride",
          type: "ionic",
          explanation: "Forms between metal (Na) and non-metal (Cl)"
        },
        { 
          id: 'b', 
          formula: "H₂O",
          answer: "water",
          type: "molecular",
          explanation: "Forms between non-metals only"
        },
        { 
          id: 'c', 
          formula: "CO₂",
          answer: "carbon dioxide",
          type: "molecular",
          explanation: "Forms between non-metals only"
        },
        { 
          id: 'd', 
          formula: "MgO",
          answer: "magnesium oxide",
          type: "ionic",
          explanation: "Forms between metal (Mg) and non-metal (O)"
        }
      ]
    },
    intermediateFormulas: {
      id: 2,
      text: "Name these intermediate-level compounds:",
      compounds: [
        { 
          id: 'a', 
          formula: "FeCl₃",
          answer: "iron(III) chloride",
          type: "ionic",
          explanation: "Forms between metal (Fe) and non-metal (Cl)"
        },
        { 
          id: 'b', 
          formula: "CuSO₄",
          answer: "copper(II) sulfate",
          type: "ionic",
          explanation: "Forms between metal (Cu) and polyatomic ion (SO₄)"
        },
        { 
          id: 'c', 
          formula: "NH₃",
          answer: "ammonia",
          type: "molecular",
          explanation: "Forms between non-metals only"
        },
        { 
          id: 'd', 
          formula: "PbO₂",
          answer: "lead(IV) oxide",
          type: "ionic",
          explanation: "Forms between metal (Pb) and non-metal (O)"
        }
      ]
    },
    writeFormulas: {
      id: 3,
      text: "Write the chemical formulas for these compounds:",
      compounds: [
        { 
          id: 'a', 
          text: "calcium carbonate",
          answer: "CaCO₃",
          type: "ionic",
          explanation: "Forms between metal (Ca) and polyatomic ion (CO₃)"
        },
        { 
          id: 'b', 
          text: "carbon tetrabromide",
          answer: "CBr₄",
          type: "molecular",
          explanation: "Forms between non-metals only"
        },
        { 
          id: 'c', 
          text: "aluminum sulfate",
          answer: "Al₂(SO₄)₃",
          type: "ionic",
          explanation: "Forms between metal (Al) and polyatomic ion (SO₄)"
        },
        { 
          id: 'd', 
          text: "phosphorus trichloride",
          answer: "PCl₃",
          type: "molecular",
          explanation: "Forms between non-metals only"
        }
      ]
    },
    advancedFormulas: {
      id: 4,
      text: "Name these advanced compounds and identify their types:",
      compounds: [
        { 
          id: 'a', 
          formula: "Fe(NO₃)₃",
          answer: "iron(III) nitrate",
          type: "ionic",
          explanation: "Forms between metal (Fe) and polyatomic ion (NO₃)"
        },
        { 
          id: 'b', 
          formula: "K₂Cr₂O₇",
          answer: "potassium dichromate",
          type: "ionic",
          explanation: "Forms between metal (K) and polyatomic ion (Cr₂O₇)"
        },
        { 
          id: 'c', 
          formula: "SF₆",
          answer: "sulfur hexafluoride",
          type: "molecular",
          explanation: "Forms between non-metals only"
        },
        { 
          id: 'd', 
          formula: "Ca(ClO₃)₂",
          answer: "calcium chlorate",
          type: "ionic",
          explanation: "Forms between metal (Ca) and polyatomic ion (ClO₃)"
        }
      ]
    }
  };

  const checkAnswer = (questionId, subQuestionId, userAnswer, correctAnswer) => {
    if (!showFeedback) return null;
    
    const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase());
    return (
      <div className={`mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
        {isCorrect ? '✓ Correct!' : (
          <>
            <span>✗ Incorrect. </span>
            <span className="font-medium">Correct answer: </span>
            {correctAnswer}
          </>
        )}
      </div>
    );
  };

  const renderQuestion = (question) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {question.compounds.map((compound) => (
            <div key={compound.id} className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium mb-2">({compound.id}) {compound.formula || compound.text}</p>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder={compound.formula ? "Enter the name..." : "Enter the formula..."}
                value={selectedAnswers[`${question.id}_${compound.id}`] || ''}
                onChange={(e) => setSelectedAnswers({
                  ...selectedAnswers,
                  [`${question.id}_${compound.id}`]: e.target.value
                })}
              />
              <select
                className="w-full mt-2 p-2 border rounded-md bg-white"
                value={selectedAnswers[`${question.id}_${compound.id}_type`] || ''}
                onChange={(e) => setSelectedAnswers({
                  ...selectedAnswers,
                  [`${question.id}_${compound.id}_type`]: e.target.value
                })}
              >
                <option value="">Select compound type...</option>
                <option value="ionic">Ionic Compound</option>
                <option value="molecular">Molecular Compound</option>
              </select>
              {showFeedback && (
                <div className="mt-2 text-sm">
                  {checkAnswer(question.id, compound.id, 
                    selectedAnswers[`${question.id}_${compound.id}`] || '', 
                    compound.answer)}
                  {selectedAnswers[`${question.id}_${compound.id}_type`] === compound.type ? (
                    <div className="text-green-600">✓ Correct compound type!</div>
                  ) : (
                    <div className="text-red-600">
                      ✗ Incorrect compound type. This is a {compound.type} compound: {compound.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Chemicals and their Properties</h1>
      
      <div className="space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Chemical Formulas Practice</h2>
          <p className="text-gray-600">
            Practice naming chemical compounds, writing chemical formulas, and identifying compound types.
            Start with basic compounds and work your way up to more advanced ones.
          </p>
        </div>

        {renderQuestion(questions.basicFormulas)}
        {renderQuestion(questions.intermediateFormulas)}
        {renderQuestion(questions.writeFormulas)}
        {renderQuestion(questions.advancedFormulas)}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={() => setShowFeedback(true)}
        >
          Check Answers
        </motion.button>
      </div>
    </div>
  );
};

export default ChemicalProperties; 