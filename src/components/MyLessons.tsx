import { motion, AnimatePresence } from 'motion/react';
import { Eye, Gamepad2, Download, ArrowLeftRight, X, FileText, Sparkles } from 'lucide-react';
import { NavigationLayout } from './NavigationLayout';
import { useState } from 'react';

interface MyLessonsProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  onViewLesson?: (lessonId: number) => void;
  onStartQuiz?: (lessonId: number) => void;
}

export function MyLessons({
  userName,
  userType,
  onNavigate,
  onShowProfile,
  onLogout,
  onViewLesson,
  onStartQuiz
}: MyLessonsProps) {
  const lessons = [
    {
      id: 1,
      title: 'Introduction to Thermodynamics',
      subject: 'Physics',
      icon: '🔥',
      quizTaken: true,
      score: 4,
      total: 5,
      color: '#06B6D4',
      originalContent: 'Thermodynamics is the study of heat, work, temperature, and energy. The four laws govern how energy moves and transforms in physical systems.',
      generatedContent: `# Introduction to Thermodynamics

## The Four Laws

### Zeroth Law
Thermal equilibrium is transitive

### First Law
Energy cannot be created or destroyed
- ΔU = Q - W

### Second Law
Entropy always increases

### Third Law
As T → 0K, entropy → 0

## Applications
- Heat engines
- Refrigeration
- Weather patterns`
    },
    {
      id: 2,
      title: 'Photosynthesis & Plant Biology',
      subject: 'Biology',
      icon: '🌱',
      quizTaken: true,
      score: 5,
      total: 5,
      color: '#10B981',
      originalContent: 'Plants convert sunlight, water, and carbon dioxide into glucose and oxygen through photosynthesis. This process occurs in chloroplasts.',
      generatedContent: `# Photosynthesis & Plant Biology

## The Process

### Light Reactions
- Occur in thylakoid membranes
- Produce ATP and NADPH

### Calvin Cycle
- Occurs in stroma
- Fixes CO2 into glucose

## Key Equation
6CO2 + 6H2O + light → C6H12O6 + 6O2

## Importance
- Produces oxygen
- Base of food chains`
    },
    {
      id: 3,
      title: 'The French Revolution',
      subject: 'History',
      icon: '🇫🇷',
      quizTaken: true,
      score: 5,
      total: 5,
      color: '#F472B6',
      originalContent: 'The French Revolution (1789-1799) was a period of political and societal change in France. It began with the Estates General of 1789 and ended with the formation of the French Consulate.',
      generatedContent: `# The French Revolution

## Causes
- Financial crisis
- Social inequality
- Enlightenment ideas

## Key Events

### 1789
- Storming of the Bastille
- Declaration of Rights of Man

### 1793-1794
- Reign of Terror
- Execution of Louis XVI

## Outcomes
- End of absolute monarchy
- Rise of Napoleon`
    },
    {
      id: 4,
      title: 'Quadratic Equations Fundamentals',
      subject: 'Mathematics',
      icon: '📐',
      quizTaken: true,
      score: 3,
      total: 5,
      color: '#FBBF24',
      originalContent: 'A quadratic equation is a second-degree polynomial equation in a single variable x: ax² + bx + c = 0, where a ≠ 0.',
      generatedContent: `# Quadratic Equations

## Standard Form
ax² + bx + c = 0 (where a ≠ 0)

## Solution Methods

### Quadratic Formula
x = (-b ± √(b²-4ac)) / 2a

### Factoring
- Find two numbers that multiply to ac and add to b

### Completing the Square
- Rewrite in vertex form

## Discriminant
- b²-4ac > 0: Two real solutions
- b²-4ac = 0: One solution
- b²-4ac < 0: Complex solutions`
    },
    {
      id: 5,
      title: 'Python Functions & Methods',
      subject: 'Programming',
      icon: '🐍',
      quizTaken: true,
      score: 3,
      total: 5,
      color: '#8B5CF6',
      originalContent: 'Functions in Python are defined using the def keyword. They can accept parameters, have default values, and return values using the return statement.',
      generatedContent: `# Python Functions & Methods

## Defining Functions
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

## Parameters
- Positional arguments
- Keyword arguments
- *args and **kwargs

## Lambda Functions
\`\`\`python
square = lambda x: x**2
\`\`\`

## Built-in Methods
- len(), type(), print()
- List methods: append(), pop()`
    },
    {
      id: 6,
      title: 'Shakespeare\'s Tragedies',
      subject: 'Literature',
      icon: '📚',
      quizTaken: true,
      score: 4,
      total: 5,
      color: '#EC4899',
      originalContent: 'Hamlet, Macbeth, Othello, and King Lear represent Shakespeare\'s greatest tragic works. These plays explore themes of ambition, jealousy, betrayal, and the human condition.',
      generatedContent: `# Shakespeare's Tragedies

## Overview
Shakespeare wrote four major tragedies that are considered masterpieces of English literature.

### Hamlet
- Theme: Revenge, mortality, and madness
- Famous quote: "To be or not to be"

### Macbeth
- Theme: Ambition, guilt, and fate
- The corrupting power of unchecked ambition

### Othello
- Theme: Jealousy, race, and manipulation
- Iago's manipulation leads to tragedy

### King Lear
- Theme: Family, power, and aging
- A father's tragic misjudgment

## Key Takeaways
- All tragedies feature a fatal flaw in the protagonist
- Themes remain relevant to modern audiences`
    }
  ];

  const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<number | null>(null);
  const [showAfterContent, setShowAfterContent] = useState(true);

  const selectedLesson = lessons.find(l => l.id === selectedLessonForPreview);

  return (
    <NavigationLayout
      userName={userName}
      userType={userType}
      currentScreen="lessons"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl text-white mb-2">Your Knowledge Vault ⚡️</h2>
            <p className="text-gray-400 text-sm lg:text-base">
              {lessons.length} lessons generated • Review notes or test your knowledge
            </p>
          </div>
          <motion.button
            onClick={() => alert('Downloading all lessons as PDF bundle... (Mock Action)')}
            className="flex items-center gap-2 px-6 py-3 bg-[#312E81] border border-[#06B6D4]/50 rounded-xl text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Download All Notes</span>
          </motion.button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              className="bg-[#312E81] rounded-xl p-6 border-2 border-[#06B6D4]/30 hover:border-[#06B6D4] transition-all relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${lesson.color}15, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                {/* Icon & Subject Badge */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#1E1B4B] flex items-center justify-center text-3xl border-2 border-transparent group-hover:border-[#06B6D4]/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {lesson.icon}
                  </motion.div>

                  {/* Status Badge */}
                  {lesson.quizTaken ? (
                    <div className="px-3 py-1.5 bg-[#10B981]/20 border border-[#10B981] rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-sm text-[#10B981]">
                        Score: {lesson.score}/{lesson.total}
                      </span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-[#FBBF24]/20 border border-[#FBBF24] rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
                      <span className="text-sm text-[#FBBF24]">Pending Quiz</span>
                    </div>
                  )}
                </div>

                {/* Title & Subject */}
                <h3 className="text-white text-lg mb-2 group-hover:text-[#06B6D4] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5">{lesson.subject}</p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => onViewLesson?.(lesson.id)}
                    className="flex-1 py-2.5 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-lg text-[#06B6D4] flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.02,
                      borderColor: '#06B6D4',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Review</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setSelectedLessonForPreview(lesson.id)}
                    className="p-2.5 bg-[#1E1B4B] border-2 border-[#F472B6]/50 rounded-lg text-[#F472B6] flex items-center justify-center relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#F472B6',
                      boxShadow: '0 0 15px rgba(244, 114, 182, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    title="Compare Before/After"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={() => alert(`Downloading PDF for ${lesson.title}...`)}
                    className="p-2.5 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-lg text-[#06B6D4] flex items-center justify-center relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.05,
                      borderColor: '#06B6D4',
                      boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    onClick={() => onStartQuiz?.(lesson.id)}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-lg text-white flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 20px rgba(244, 114, 182, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <Gamepad2 className="w-4 h-4 relative z-10" />
                    <span className="text-sm relative z-10">
                      {lesson.quizTaken ? 'Retake' : 'Quiz'}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Corner Accent */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                style={{ backgroundColor: lesson.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-8 bg-[#312E81] rounded-xl p-6 border border-[#06B6D4]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl text-[#10B981] mb-1">
                {lessons.filter(l => l.quizTaken).length}
              </div>
              <div className="text-gray-400 text-sm">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#FBBF24] mb-1">
                {lessons.filter(l => !l.quizTaken).length}
              </div>
              <div className="text-gray-400 text-sm">Pending Quizzes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-[#F472B6] mb-1">
                {Math.round(
                  lessons
                    .filter(l => l.quizTaken)
                    .reduce((acc, l) => acc + (l.score! / l.total!) * 100, 0) /
                  lessons.filter(l => l.quizTaken).length
                )}%
              </div>
              <div className="text-gray-400 text-sm">Average Score</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Before/After Comparison Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLessonForPreview(null)}
          >
            <motion.div
              className="bg-[#312E81] rounded-3xl max-w-4xl w-full border-2 border-[#06B6D4]/50 relative flex flex-col max-h-[85vh] min-h-0 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex-shrink-0 bg-[#312E81] border-b border-[#06B6D4]/30 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedLesson.icon}</span>
                    <div>
                      <h2 className="text-xl text-white">{selectedLesson.title}</h2>
                      <p className="text-sm text-gray-400">{selectedLesson.subject} • Before/After Comparison</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedLessonForPreview(null)}
                    className="p-2 rounded-full bg-[#1E1B4B]/80 hover:bg-[#1E1B4B] transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {/* Toggle */}
                <div className="flex justify-center mt-4">
                  <div className="bg-[#1E1B4B] p-1.5 rounded-2xl border border-[#06B6D4]/30 inline-flex items-center gap-1 relative">
                    <motion.div
                      className="absolute inset-y-1.5 rounded-xl"
                      initial={false}
                      animate={{
                        left: showAfterContent ? 'calc(50% + 2px)' : '6px',
                        right: showAfterContent ? '6px' : 'calc(50% + 2px)',
                        background: showAfterContent
                          ? 'linear-gradient(135deg, #F472B6, #EC4899)'
                          : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                        boxShadow: showAfterContent
                          ? '0 0 20px rgba(244, 114, 182, 0.4)'
                          : '0 0 20px rgba(6, 182, 212, 0.4)'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.button
                      onClick={() => setShowAfterContent(false)}
                      className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${!showAfterContent ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">Original Input</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setShowAfterContent(true)}
                      className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${showAfterContent ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">AI Generated</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 lg:p-6">
                <motion.div
                  key={showAfterContent ? 'after' : 'before'}
                  initial={{ opacity: 0, x: showAfterContent ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: showAfterContent ? -20 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {showAfterContent ? (
                    <div className="prose prose-invert max-w-none">
                      {selectedLesson.generatedContent?.split('\n').map((line, idx) => {
                        if (line.startsWith('# ')) {
                          return (
                            <h1 key={idx} className="text-2xl text-white mb-4 mt-6 first:mt-0">
                              {line.replace('# ', '')}
                            </h1>
                          );
                        }
                        if (line.startsWith('## ')) {
                          return (
                            <h2 key={idx} className="text-xl text-[#06B6D4] mb-3 mt-5 flex items-center gap-2">
                              <span className="w-1.5 h-6 bg-[#06B6D4] rounded-full" />
                              {line.replace('## ', '')}
                            </h2>
                          );
                        }
                        if (line.startsWith('### ')) {
                          return (
                            <h3 key={idx} className="text-lg text-[#F472B6] mb-2 mt-4">
                              {line.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <div key={idx} className="flex items-start gap-2 mb-2 ml-4">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] mt-2" />
                              <p className="text-gray-300">{line.replace('- ', '')}</p>
                            </div>
                          );
                        }
                        if (line.trim()) {
                          return (
                            <p key={idx} className="text-gray-300 mb-3 leading-relaxed">
                              {line}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <div className="bg-[#1E1B4B] rounded-xl p-6 border border-[#06B6D4]/20">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-[#06B6D4]" />
                        <span className="text-sm text-[#06B6D4] font-medium">Original Input</span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {selectedLesson.originalContent || 'No original content available'}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Footer Actions */}
              <div className="flex-shrink-0 bg-[#312E81] border-t border-[#06B6D4]/30 p-4 flex justify-end gap-3">
                <motion.button
                  onClick={() => setSelectedLessonForPreview(null)}
                  className="px-6 py-2 bg-[#1E1B4B] border border-[#06B6D4]/30 rounded-lg text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
                <motion.button
                  onClick={() => {
                    onViewLesson?.(selectedLesson.id);
                    setSelectedLessonForPreview(null);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-lg text-white"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Lesson
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavigationLayout>
  );
}