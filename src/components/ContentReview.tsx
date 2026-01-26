import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2 } from 'lucide-react';

interface ContentReviewProps {
  lessonId: number;
  onBack: () => void;
  onStartQuiz: () => void;
}

export function ContentReview({ lessonId, onBack, onStartQuiz }: ContentReviewProps) {
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
      <div className="max-w-4xl mx-auto p-4 lg:p-8 pb-32">
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

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={onStartQuiz}
        className="fixed bottom-8 right-8 px-6 py-4 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-2xl text-white shadow-2xl flex items-center gap-3 relative overflow-hidden group"
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          boxShadow: [
            '0 10px 40px rgba(244, 114, 182, 0.4)',
            '0 10px 60px rgba(244, 114, 182, 0.6)',
            '0 10px 40px rgba(244, 114, 182, 0.4)'
          ]
        }}
        transition={{ 
          scale: { delay: 0.5, type: 'spring', stiffness: 200 },
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

        {/* Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <Gamepad2 className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Ready for Quiz? 🎮</span>
      </motion.button>
    </div>
  );
}
