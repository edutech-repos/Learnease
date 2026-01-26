import { motion } from 'motion/react';
import { X, User, Zap, Infinity, Lock, Crown, Settings } from 'lucide-react';

interface ProfileOverlayProps {
  userName: string;
  userType: 'premium' | 'free' | null;
  onClose: () => void;
  onShowComparison?: () => void;
}

export function ProfileOverlay({ userName, userType, onClose, onShowComparison }: ProfileOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#312E81]/90 backdrop-blur-xl rounded-3xl p-6 lg:p-8 max-w-md w-full border-2 border-[#06B6D4]/30 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 via-transparent to-[#F472B6]/10" />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1E1B4B]/50 hover:bg-[#1E1B4B] transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-gray-400" />
        </motion.button>

        <div className="relative z-10">
          {/* User Avatar */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#F472B6] p-1 mb-4"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                  '0 0 40px rgba(6, 182, 212, 0.8)',
                  '0 0 20px rgba(6, 182, 212, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: 999999 }}
            >
              <div className="w-full h-full rounded-full bg-[#312E81] flex items-center justify-center">
                <User className="w-12 h-12 text-[#FBBF24]" />
              </div>
            </motion.div>

            <h2 className="text-2xl text-white mb-2">{userName}</h2>
            
            {userType === 'premium' ? (
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-full glow-yellow"
                whileHover={{ scale: 1.05 }}
              >
                <Crown className="w-4 h-4 text-[#1E1B4B]" />
                <span className="text-sm text-[#1E1B4B]">Premium Member</span>
                <Zap className="w-4 h-4 text-[#1E1B4B]" />
              </motion.div>
            ) : (
              <div className="px-4 py-2 bg-gray-600 rounded-full text-sm text-gray-300">
                Free Account
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Credits */}
            <motion.div
              className={`bg-[#1E1B4B]/50 rounded-xl p-5 border-2 ${
                userType === 'premium' 
                  ? 'border-[#10B981]/50' 
                  : 'border-[#FBBF24]/50'
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Credits Left</span>
                <Zap className={`w-4 h-4 ${
                  userType === 'premium' ? 'text-[#10B981]' : 'text-[#FBBF24]'
                }`} />
              </div>
              <div className={`text-2xl ${
                userType === 'premium' ? 'text-[#10B981]' : 'text-[#FBBF24]'
              } flex items-center gap-2`}>
                <span>{userType === 'premium' ? '500' : '5'}</span>
                <span className="text-lg">⚡️</span>
              </div>
              {userType === 'premium' && (
                <motion.div
                  className="mt-2 text-xs text-[#10B981]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Renews monthly
                </motion.div>
              )}
              {userType === 'free' && (
                <motion.div
                  className="mt-2 text-xs text-[#FBBF24]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: 999999 }}
                >
                  Running low!
                </motion.div>
              )}
            </motion.div>

            {/* Adjusted Quizzes */}
            <motion.div
              className={`bg-[#1E1B4B]/50 rounded-xl p-5 border-2 relative overflow-hidden ${
                userType === 'premium' 
                  ? 'border-[#06B6D4]/50' 
                  : 'border-gray-600'
              }`}
              whileHover={{ scale: 1.03 }}
            >
              {userType === 'free' && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <Lock className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">AI Quizzes</span>
                {userType === 'premium' ? (
                  <Infinity className="w-4 h-4 text-[#06B6D4]" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-500" />
                )}
              </div>
              <div className={`text-2xl ${
                userType === 'premium' ? 'text-[#06B6D4]' : 'text-gray-500'
              } flex items-center gap-2`}>
                {userType === 'premium' ? (
                  <>
                    <Infinity className="w-6 h-6" />
                    <span className="text-lg">♾️</span>
                  </>
                ) : (
                  <span className="text-sm flex items-center gap-2">
                    LOCKED <Lock className="w-4 h-4" />
                  </span>
                )}
              </div>
              {userType === 'premium' && (
                <motion.div
                  className="mt-2 text-xs text-[#06B6D4]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Unlimited access
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#1E1B4B]/50 rounded-lg p-3 text-center border border-[#312E81]">
              <div className="text-xl text-[#F472B6] mb-1">24</div>
              <div className="text-xs text-gray-400">Lessons</div>
            </div>
            <div className="bg-[#1E1B4B]/50 rounded-lg p-3 text-center border border-[#312E81]">
              <div className="text-xl text-[#FBBF24] mb-1">87%</div>
              <div className="text-xs text-gray-400">Avg Score</div>
            </div>
            <div className="bg-[#1E1B4B]/50 rounded-lg p-3 text-center border border-[#312E81]">
              <div className="text-xl text-[#06B6D4] mb-1">12</div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {userType === 'premium' ? (
              <>
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white flex items-center justify-center gap-2 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Settings className="w-5 h-5" />
                  <span className="relative">Manage Subscription</span>
                </motion.button>
                <motion.button
                  className="w-full py-3 bg-transparent border-2 border-[#312E81] rounded-xl text-gray-400 hover:border-[#06B6D4]/50 hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Account Settings
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => {
                    onClose();
                    onShowComparison?.();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] rounded-xl text-[#1E1B4B] flex items-center justify-center gap-2 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(251, 191, 36, 0.7)',
                        '0 0 0 10px rgba(251, 191, 36, 0)',
                        '0 0 0 0 rgba(251, 191, 36, 0)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: 999999 }}
                  />
                  <Crown className="w-5 h-5" />
                  <span className="relative">Upgrade to Premium</span>
                </motion.button>
                <motion.button
                  className="w-full py-3 bg-transparent border-2 border-[#312E81] rounded-xl text-gray-400 hover:border-[#06B6D4]/50 hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Account Settings
                </motion.button>
              </>
            )}
          </div>

          {/* Member Since */}
          <div className="mt-6 pt-6 border-t border-[#312E81] text-center">
            <p className="text-gray-400 text-sm">
              Member since <span className="text-[#06B6D4]">January 2025</span>
            </p>
          </div>
        </div>

        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FBBF24]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30]
            }}
            transition={{
              duration: 3,
              repeat: 999999,
              delay: Math.random() * 3
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}