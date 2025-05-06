import React, { useState, useEffect } from 'react';

// 30 multiple choice questions about Macbeth Act 1
const macbethQuestions = [
  {
    id: 1,
    question: 'Who is the first character to speak in Macbeth?',
    options: ['Macbeth', 'Banquo', 'A Witch', 'King Duncan'],
    answer: 'A Witch',
  },
  {
    id: 2,
    question: 'What title is Macbeth given after his victory in battle?',
    options: ['Thane of Cawdor', 'Thane of Fife', 'Prince of Cumberland', 'Earl of Northumberland'],
    answer: 'Thane of Cawdor',
  },
  {
    id: 3,
    question: 'Who is the King of Scotland at the start of the play?',
    options: ['Macbeth', 'Duncan', 'Malcolm', 'Banquo'],
    answer: 'Duncan',
  },
  {
    id: 4,
    question: 'What do the witches predict for Macbeth?',
    options: ['He will be king', 'He will die', 'He will be banished', 'He will marry Lady Macbeth'],
    answer: 'He will be king',
  },
  {
    id: 5,
    question: 'Who is sentenced to death by King Duncan?',
    options: ['The former Thane of Cawdor', 'Macbeth', 'Banquo', 'Macdonwald'],
    answer: 'The former Thane of Cawdor',
  },
  {
    id: 6,
    question: "Who is Macbeth's close friend and fellow general?",
    options: ['Banquo', 'Macduff', 'Ross', 'Lennox'],
    answer: 'Banquo',
  },
  {
    id: 7,
    question: 'What do the witches predict for Banquo?',
    options: ['His descendants will be kings', 'He will be king', 'He will die', 'He will betray Macbeth'],
    answer: 'His descendants will be kings',
  },
  {
    id: 8,
    question: "Who tells King Duncan about Macbeth's bravery in battle?",
    options: ['A sergeant', 'Banquo', 'Lady Macbeth', 'A witch'],
    answer: 'A sergeant',
  },
  {
    id: 9,
    question: 'Who is named Prince of Cumberland?',
    options: ['Malcolm', 'Donalbain', 'Macbeth', 'Banquo'],
    answer: 'Malcolm',
  },
  {
    id: 10,
    question: "Who is Lady Macbeth's husband?",
    options: ['Macbeth', 'Banquo', 'Duncan', 'Macduff'],
    answer: 'Macbeth',
  },
  {
    id: 11,
    question: "Where do the witches plan to meet Macbeth?",
    options: ['Upon the heath', "At Macbeth's castle", 'In a cave', 'At Forres'],
    answer: 'Upon the heath',
  },
  {
    id: 12,
    question: "What is Lady Macbeth's reaction to Macbeth's letter about the witches?",
    options: ['She wants Macbeth to become king', 'She is afraid', 'She ignores it', 'She tells Duncan'],
    answer: 'She wants Macbeth to become king',
  },
  {
    id: 13,
    question: "Who greets King Duncan at Macbeth's castle?",
    options: ['Lady Macbeth', 'Macbeth', 'Banquo', 'A servant'],
    answer: 'Lady Macbeth',
  },
  {
    id: 14,
    question: 'What does Lady Macbeth fear about her husband?',
    options: ['He is too kind', 'He is too ambitious', 'He is too weak', 'He is too cruel'],
    answer: 'He is too kind',
  },
  {
    id: 15,
    question: 'What does Lady Macbeth ask the spirits to do?',
    options: ['Unsex her', 'Make her beautiful', 'Give her riches', 'Protect Macbeth'],
    answer: 'Unsex her',
  },
  {
    id: 16,
    question: 'Who says, "Fair is foul, and foul is fair"?',
    options: ['The witches', 'Macbeth', 'Lady Macbeth', 'Banquo'],
    answer: 'The witches',
  },
  {
    id: 17,
    question: 'What does Macbeth see as a step he must overcome to become king?',
    options: ['Malcolm', 'Banquo', 'Lady Macbeth', 'Macduff'],
    answer: 'Malcolm',
  },
  {
    id: 18,
    question: 'Who says, "Look like the innocent flower, but be the serpent under\'t"?',
    options: ['Lady Macbeth', 'Macbeth', 'Banquo', 'The witches'],
    answer: 'Lady Macbeth',
  },
  {
    id: 19,
    question: 'What does Macbeth contemplate in his soliloquy in Act 1, Scene 7?',
    options: ['Killing Duncan', 'Running away', 'Becoming Thane of Cawdor', 'Telling Banquo'],
    answer: 'Killing Duncan',
  },
  {
    id: 20,
    question: "Who arrives at Macbeth's castle with King Duncan?",
    options: ['Banquo', 'Malcolm', 'Donalbain', 'All of the above'],
    answer: 'All of the above',
  },
  {
    id: 21,
    question: 'Who is the Thane of Glamis at the start of the play?',
    options: ['Macbeth', 'Banquo', 'Duncan', 'Macduff'],
    answer: 'Macbeth',
  },
  {
    id: 22,
    question: 'Who says, "If chance will have me king, why, chance may crown me"?',
    options: ['Macbeth', 'Banquo', 'Lady Macbeth', 'Duncan'],
    answer: 'Macbeth',
  },
  {
    id: 23,
    question: 'What does Lady Macbeth plan to do to Duncan?',
    options: ['Murder him', 'Warn him', 'Send him away', 'Make him king'],
    answer: 'Murder him',
  },
  {
    id: 24,
    question: 'Who is Donalbain?',
    options: ["Duncan's son", "Macbeth's friend", 'A witch', 'A servant'],
    answer: "Duncan's son",
  },
  {
    id: 25,
    question: 'Who says, "Yet do I fear thy nature; It is too full o\' the milk of human kindness"?',
    options: ['Lady Macbeth', 'Macbeth', 'Banquo', 'The witches'],
    answer: 'Lady Macbeth',
  },
  {
    id: 26,
    question: 'What does Macbeth call his ambition in Act 1, Scene 7?',
    options: ['Vaulting ambition', 'Deadly sin', 'Foolish hope', 'Noble desire'],
    answer: 'Vaulting ambition',
  },
  {
    id: 27,
    question: 'Who is the Thane of Fife?',
    options: ['Macduff', 'Banquo', 'Ross', 'Lennox'],
    answer: 'Macduff',
  },
  {
    id: 28,
    question: 'Who says, "Come, you spirits that tend on mortal thoughts, unsex me here"?',
    options: ['Lady Macbeth', 'Macbeth', 'Banquo', 'The witches'],
    answer: 'Lady Macbeth',
  },
  {
    id: 29,
    question: 'What does Macbeth mean by "false face must hide what the false heart doth know"?',
    options: ['He must hide his true intentions', 'He must be honest', 'He must confess', 'He must run away'],
    answer: 'He must hide his true intentions',
  },
  {
    id: 30,
    question: 'Who is the father of Malcolm and Donalbain?',
    options: ['Duncan', 'Macbeth', 'Banquo', 'Macduff'],
    answer: 'Duncan',
  },
];

function getRandomQuestions(questions, count) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const MacbethQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    setQuizQuestions(getRandomQuestions(macbethQuestions, 10));
  }, []);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let correct = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.answer) correct++;
    });
    setScore(correct);
  };

  const handleRetry = () => {
    setQuizQuestions(getRandomQuestions(macbethQuestions, 10));
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Macbeth Act 1 Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {quizQuestions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded shadow p-4">
            <div className="mb-2 font-medium">{idx + 1}. {q.question}</div>
            <div className="space-y-1">
              {q.options.map(opt => (
                <label key={opt} className="block">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    disabled={submitted}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {submitted && (
              <div className={
                answers[q.id] === q.answer
                  ? 'text-green-600 mt-2'
                  : 'text-red-600 mt-2'
              }>
                {answers[q.id] === q.answer
                  ? '✓ Correct!'
                  : `✗ Incorrect. Correct answer: ${q.answer}`}
              </div>
            )}
          </div>
        ))}
        <div className="flex gap-4 mt-4">
          {!submitted ? (
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit Answers
            </button>
          ) : (
            <>
              <div className="text-lg font-semibold">Score: {score}/{quizQuestions.length}</div>
              <button type="button" onClick={handleRetry} className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Try New Questions
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default MacbethQuiz; 