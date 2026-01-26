import { motion } from 'motion/react';
import { Check, X, Crown, Sparkles, ArrowLeft } from 'lucide-react';

interface ComparisonCardsProps {
  onClose: () => void;
  onUpgrade?: () => void;
}

export function ComparisonCards({ onClose, onUpgrade }: ComparisonCardsProps) {
  const features = [
    { name: 'Lesson Credits', free: '5 per month', premium: 'Unlimited' },
    { name: 'Character Limit', free: '1,000 chars', premium: '4,000 chars' },
    { name: 'File Upload Size', free: '10 MB', premium: '10 MB' },
    { name: 'AI Diagram Generation', free: '5 per week', premium: '30 per week' },
    { name: 'AI Quiz Generation', free: 'Basic', premium: 'Advanced' },
    { name: 'Weakness Analysis', free: false, premium: true },
    { name: 'Personalized Learning Paths', free: false, premium: true },
    { name: 'Quiz Adjustments', free: 'Limited', premium: 'Unlimited' },
    { name: 'Priority Support', free: false, premium: true },
    { name: 'Export Notes as PDF', free: false, premium: true },
    { name: 'Ad-Free Experience', free: false, premium: true }
  ];

  return (
    <div className="min-h-screen bg-[#1E1B4B] p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#312E81] border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-2xl lg:text-3xl text-white">Compare Plans</h1>
            <p className="text-gray-400 text-sm">Choose the plan that's right for you</p>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Free Plan Card */}
          <motion.div
            className="bg-[#312E81] rounded-2xl p-6 lg:p-8 border-2 border-gray-600 relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative z-10">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl text-white">Free</h2>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-[#FBBF24]">₹0</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Perfect for getting started</p>
              </div>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
                    {feature.free === false ? (
                      <X className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                    ) : (
                      <Check className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-gray-300">{feature.name}</p>
                      {feature.free !== false && feature.free !== true && (
                        <p className="text-sm text-gray-500">{feature.free}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full mt-8 py-3 bg-gray-700 rounded-xl text-white opacity-50 cursor-not-allowed"
                disabled
              >
                Current Plan
              </motion.button>
            </div>
          </motion.div>

          {/* Premium Plan Card */}
          <motion.div
            className="bg-gradient-to-br from-[#312E81] to-[#1E1B4B] rounded-2xl p-6 lg:p-8 border-2 border-[#FBBF24] relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              boxShadow: '0 0 40px rgba(251, 191, 36, 0.3), 0 0 80px rgba(251, 191, 36, 0.1)'
            }}
          >
            {/* Popular Badge */}
            <motion.div
              className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#1E1B4B] text-xs rounded-bl-xl rounded-tr-2xl"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(251, 191, 36, 0.5)',
                  '0 0 20px rgba(251, 191, 36, 0.8)',
                  '0 0 10px rgba(251, 191, 36, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>MOST POPULAR</span>
              </div>
            </motion.div>

            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.4), transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.4), transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.4), transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="mb-6 mt-8">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-[#FBBF24]" />
                  <h2 className="text-2xl text-white">Premium</h2>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-[#FBBF24]">₹799</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Unlock your full learning potential</p>
              </div>

              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white">{feature.name}</p>
                      {feature.premium !== true && (
                        <p className="text-sm text-[#FBBF24]">{feature.premium}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={onUpgrade}
                className="w-full mt-8 py-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-xl text-[#1E1B4B] relative overflow-hidden group"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Upgrade to Premium</span>
                </span>
              </motion.button>
            </div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#FBBF24]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -30]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Additional Benefits Section */}
        <motion.div
          className="bg-[#312E81] rounded-2xl p-6 lg:p-8 border-2 border-[#06B6D4]/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FBBF24]" />
            Why Choose Premium?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="text-white mb-1">Personalized Learning</h4>
              <p className="text-sm text-gray-400">
                AI-powered weakness analysis helps you focus on what matters most
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡️</div>
              <h4 className="text-white mb-1">Unlimited Access</h4>
              <p className="text-sm text-gray-400">
                Generate as many lessons and quizzes as you need, no restrictions
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="text-white mb-1">Learn Faster</h4>
              <p className="text-sm text-gray-400">
                Advanced features help you master topics 3x faster than traditional methods
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}