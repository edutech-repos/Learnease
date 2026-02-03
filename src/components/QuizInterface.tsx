import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useState } from 'react';

interface QuizInterfaceProps {
  lessonId: string;
  onBack: () => void;
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizInterface({ lessonId, onBack, onComplete }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Mock quiz data
  const quiz = {
    title: 'Thermodynamics Quiz',
    icon: '🔥',
    questions: [
      {
        id: 1,
        question: 'What does the First Law of Thermodynamics state?',
        options: [
          'Energy cannot be created or destroyed',
          'Entropy always increases',
          'Heat flows from cold to hot',
          'Temperature is relative'
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: 'Which law introduces the concept of entropy?',
        options: [
          'Zeroth Law',
          'First Law',
          'Second Law',
          'Third Law'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What is the Carnot efficiency formula?',
        options: [
          'η = T_hot / T_cold',
          'η = 1 - (T_cold / T_hot)',
          'η = T_cold - T_hot',
          'η = (T_hot - T_cold) / 2'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'At absolute zero (0 K), what happens to entropy in a perfect crystal?',
        options: [
          'It increases infinitely',
          'It remains constant',
          'It approaches zero',
          'It becomes negative'
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'What does ΔU represent in the equation ΔU = Q - W?',
        options: [
          'Total energy',
          'Heat added',
          'Work done',
          'Change in internal energy'
        ],
        correctAnswer: 3
      }
    ] as Question[]
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quiz.questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setQuizStarted(true);
    } else {
      // Show results - quiz is complete
      setShowResults(true);
    }
  };

  const handleBackClick = () => {
    // Only allow back navigation if quiz hasn't been started or if showing results
    if (!quizStarted || showResults) {
      onBack();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, idx) => {
      if (answer === quiz.questions[idx].correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / quiz.questions.length) * 100);

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#1E1B4B] flex items-center justify-center p-4">
        <motion.div
          className="max-w-2xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Results Overlay */}
          <div className="bg-[#312E81] rounded-3xl p-8 lg:p-12 border-2 border-[#06B6D4]/50 relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.3), transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(244, 114, 182, 0.3), transparent 50%)',
                  'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.3), transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10 text-center">
              {/* Quiz Complete Icon */}
              <motion.div
                className="text-6xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
              </motion.div>

              <motion.h2
                className="text-3xl lg:text-4xl text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Quiz Complete!
              </motion.h2>

              <motion.p
                className="text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {quiz.title}
              </motion.p>

              {/* Large Glowing Score Ring */}
              <div className="flex justify-center mb-8">
                <motion.div
                  className="relative w-48 h-48"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
                >
                  {/* Background Circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#1E1B4B"
                      strokeWidth="12"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke={percentage >= 80 ? '#10B981' : percentage >= 60 ? '#FBBF24' : '#F472B6'}
                      strokeWidth="12"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: percentage / 100 }}
                      transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }}
                      style={{
                        filter: `drop-shadow(0 0 10px ${percentage >= 80 ? '#10B981' : percentage >= 60 ? '#FBBF24' : '#F472B6'
                          })`
                      }}
                    />
                  </svg>

                  {/* Score Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      className="text-5xl text-white mb-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                    >
                      {score}/{quiz.questions.length}
                    </motion.div>
                    <motion.div
                      className={`text-xl ${percentage >= 80 ? 'text-[#10B981]' : percentage >= 60 ? 'text-[#FBBF24]' : 'text-[#F472B6]'
                        }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      {percentage}%
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Performance Message */}
              <motion.p
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                {percentage >= 80
                  ? 'Excellent work! You\'ve mastered this topic! 🌟'
                  : percentage >= 60
                    ? 'Good job! Keep practicing to improve further. 📚'
                    : 'Don\'t worry, review the notes and try again! 💡'
                }
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <motion.button
                  onClick={onComplete}
                  className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl text-white relative overflow-hidden group"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">Save Progress</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setAnswers([null, null, null, null, null]);
                    setShowResults(false);
                  }}
                  className="px-8 py-3 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-xl text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retake Quiz
                </motion.button>
              </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#06B6D4' : '#F472B6',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -30]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1B4B]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1E1B4B]/95 backdrop-blur-md border-b-2 border-[#06B6D4]/30">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={handleBackClick}
              className="p-2 rounded-lg bg-[#312E81] border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              <span className="text-2xl">{quiz.icon}</span>
              <h1 className="text-lg lg:text-xl text-white">{quiz.title}</h1>
            </div>

            <div className="w-10" /> {/* Spacer for centering */}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#06B6D4]">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-gray-400">
                {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-[#1E1B4B] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                style={{
                  boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Card */}
            <div className="bg-[#312E81] rounded-2xl p-6 lg:p-10 border-2 border-[#06B6D4]/30 mb-6">
              <h2 className="text-2xl lg:text-3xl text-white mb-8 leading-relaxed">
                {quiz.questions[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {quiz.questions[currentQuestion].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full p-5 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${selectedAnswer === idx
                        ? 'border-[#06B6D4] bg-[#06B6D4]/10 glow-cyan'
                        : 'border-[#06B6D4]/30 bg-[#1E1B4B] hover:border-[#06B6D4]/60 hover:bg-[#06B6D4]/5'
                      }`}
                    whileHover={{ scale: 1.01, x: 5 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Selection Indicator */}
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAnswer === idx
                          ? 'border-[#06B6D4] bg-[#06B6D4]'
                          : 'border-gray-500'
                        }`}>
                        {selectedAnswer === idx && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>

                      <span className={`text-base lg:text-lg ${selectedAnswer === idx ? 'text-white' : 'text-gray-300'
                        }`}>
                        {option}
                      </span>
                    </div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#06B6D4]/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <motion.button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full py-4 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-xl text-white text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: selectedAnswer !== null ? 1.02 : 1 }}
              whileTap={{ scale: selectedAnswer !== null ? 0.98 : 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative">
                {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}