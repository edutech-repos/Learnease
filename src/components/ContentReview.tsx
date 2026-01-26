import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, Image, X } from 'lucide-react';
import { useState } from 'react';

interface ContentReviewProps {
  lessonId: number;
  onBack: () => void;
  onStartQuiz: () => void;
  userType?: 'premium' | 'free' | null;
}

export function ContentReview({ lessonId, onBack, onStartQuiz, userType = 'free' }: ContentReviewProps) {
  const [showDiagram, setShowDiagram] = useState(false);
  const [diagramsRemaining, setDiagramsRemaining] = useState(
    userType === 'premium' ? 30 : 5
  );
  // Mock lesson data - in real app this would come from props or API
  const lessonContent = {
    title: 'Introduction to Thermodynamics',
    subject: 'Physics',
    icon: '🔥',
    content: `
# What is Thermodynamics?

Thermodynamics is the branch of physics that deals with heat, work, temperature, and the statistical behavior of systems with a large number of particles.

## The Four Laws of Thermodynamics

### Zeroth Law
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law helps define the notion of temperature.

### First Law (Conservation of Energy)
Energy cannot be created or destroyed in an isolated system. The total energy of an isolated system remains constant.

**Key Points:**
- Energy can only be transformed from one form to another
- ΔU = Q - W (Change in internal energy = Heat added - Work done)
- This is essentially the law of conservation of energy

### Second Law (Entropy)
The entropy of any isolated system always increases over time. Heat naturally flows from hot to cold objects.

**Important Concepts:**
- Entropy measures the disorder or randomness in a system
- Natural processes are irreversible
- Heat engines cannot be 100% efficient
- Carnot efficiency sets the theoretical maximum

### Third Law
As temperature approaches absolute zero (0 Kelvin), the entropy of a perfect crystal approaches zero.

## Real-World Applications

- **Heat Engines**: Cars, power plants, jet engines
- **Refrigeration**: Air conditioners, refrigerators
- **Weather Patterns**: Understanding atmospheric thermodynamics
- **Chemical Reactions**: Predicting reaction spontaneity

## Key Formulas

1. **First Law**: ΔU = Q - W
2. **Carnot Efficiency**: η = 1 - (T_cold / T_hot)
3. **Ideal Gas Law**: PV = nRT

## Summary

Thermodynamics governs how energy moves and transforms in physical systems. Understanding these principles is crucial for engineering, chemistry, and understanding natural phenomena.
    `
  };

  return (
    <div className="min-h-screen bg-[#1E1B4B] relative">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-[#1E1B4B]/95 backdrop-blur-md border-b-2 border-[#06B6D4]/30">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="p-2 rounded-lg bg-[#312E81] border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{lessonContent.icon}</span>
                <div>
                  <h1 className="text-xl lg:text-2xl text-white">{lessonContent.title}</h1>
                  <p className="text-sm text-gray-400">{lessonContent.subject} Notes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8 pb-8">
        <motion.div
          className="bg-[#312E81] rounded-2xl p-6 lg:p-10 border-2 border-[#06B6D4]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Rich Text Content */}
          <div className="prose prose-invert max-w-none">
            {lessonContent.content.split('\n').map((line, idx) => {
              // H1
              if (line.startsWith('# ')) {
                return (
                  <motion.h1
                    key={idx}
                    className="text-3xl lg:text-4xl text-white mb-6 mt-8 first:mt-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace('# ', '')}
                  </motion.h1>
                );
              }

              // H2
              if (line.startsWith('## ')) {
                return (
                  <motion.h2
                    key={idx}
                    className="text-2xl lg:text-3xl text-[#06B6D4] mb-4 mt-8 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <span className="w-2 h-8 bg-[#06B6D4] rounded-full glow-cyan" />
                    {line.replace('## ', '')}
                  </motion.h2>
                );
              }

              // H3
              if (line.startsWith('### ')) {
                return (
                  <motion.h3
                    key={idx}
                    className="text-xl lg:text-2xl text-[#F472B6] mb-3 mt-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace('### ', '')}
                  </motion.h3>
                );
              }

              // Bold text
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <motion.p
                    key={idx}
                    className="text-[#FBBF24] mb-3 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    {line.replace(/\*\*/g, '')}
                  </motion.p>
                );
              }

              // Bullet points
              if (line.startsWith('- ')) {
                return (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3 mb-2 ml-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#06B6D4] mt-2 flex-shrink-0" />
                    <p className="text-gray-300 flex-1">
                      {line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}
                    </p>
                  </motion.div>
                );
              }

              // Regular paragraph
              if (line.trim() && !line.startsWith('#')) {
                return (
                  <motion.p
                    key={idx}
                    className="text-gray-300 mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    dangerouslySetInnerHTML={{
                      __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    }}
                  />
                );
              }

              return null;
            })}
          </div>
        </motion.div>
      </div>

      {/* Diagram Modal */}
      {showDiagram && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowDiagram(false)}
        >
          <motion.div
            className="bg-[#312E81] rounded-3xl max-w-4xl w-full border-2 border-[#06B6D4]/50 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setShowDiagram(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#1E1B4B]/80 hover:bg-[#1E1B4B] transition-colors z-50 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>

            <div className="p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl text-white mb-4 flex items-center gap-3">
                <Image className="w-8 h-8 text-[#06B6D4]" />
                Thermodynamics Diagram
              </h2>
              <p className="text-gray-400 mb-6">AI-generated visual representation of the lesson concepts</p>

              {/* Mock Diagram - Replace with actual diagram */}
              <div className="bg-[#1E1B4B] rounded-xl p-8 border-2 border-[#06B6D4]/30 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Image className="w-24 h-24 text-[#06B6D4] mx-auto mb-4 opacity-50" />
                  <p className="text-gray-400 text-lg">Mock Diagram Placeholder</p>
                  <p className="text-gray-500 text-sm mt-2">
                    In production, this would display an AI-generated diagram<br />
                    illustrating the thermodynamics concepts
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-400">
                  Diagrams remaining this week: <span className={userType === 'premium' ? 'text-[#10B981]' : 'text-[#FBBF24]'}>{diagramsRemaining}</span>
                </p>
                <motion.button
                  onClick={() => setShowDiagram(false)}
                  className="px-6 py-2 bg-[#06B6D4] rounded-lg text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Action Bar */}
      <div className="mt-12 mb-12 flex justify-center gap-6">
        {/* Generate Diagram Button */}
        <motion.button
          onClick={() => {
            if (diagramsRemaining > 0) {
              setShowDiagram(true);
              setDiagramsRemaining(prev => prev - 1);
            }
          }}
          className={`px-6 py-4 rounded-2xl text-white shadow-xl flex items-center gap-3 relative overflow-hidden group ${diagramsRemaining > 0
            ? 'bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]'
            : 'bg-gray-600 cursor-not-allowed'
            }`}
          whileHover={diagramsRemaining > 0 ? { scale: 1.05, y: -2 } : undefined}
          whileTap={diagramsRemaining > 0 ? { scale: 0.95 } : undefined}
          disabled={diagramsRemaining === 0}
        >
          {diagramsRemaining > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}

          <Image className="w-5 h-5 relative z-10" />
          <span className="relative z-10 flex flex-col items-start text-left">
            <span className="text-sm font-semibold">Generate Diagram</span>
            <span className={`text-xs ${diagramsRemaining > 0 ? 'text-white/80' : 'text-gray-400'}`}>
              {diagramsRemaining > 0 ? `${diagramsRemaining} left this week` : 'Limit reached'}
            </span>
          </span>
        </motion.button>

        {/* Start Quiz Button */}
        <motion.button
          onClick={onStartQuiz}
          className="px-6 py-4 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-2xl text-white shadow-xl flex items-center gap-3 relative overflow-hidden group"
          initial={{ scale: 0.9 }}
          animate={{
            scale: 1,
            boxShadow: [
              '0 10px 20px rgba(244, 114, 182, 0.3)',
              '0 10px 30px rgba(244, 114, 182, 0.5)',
              '0 10px 20px rgba(244, 114, 182, 0.3)'
            ]
          }}
          transition={{
            scale: { duration: 0.2 },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated Background Shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
            animate={{
              x: ['-200%', '200%']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          <Gamepad2 className="w-5 h-5 relative z-10" />
          <span className="relative z-10 font-bold">Ready for Quiz? 🎮</span>
        </motion.button>
      </div>
    </div>
  );
}
