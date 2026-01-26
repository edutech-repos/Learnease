import { motion } from 'motion/react';
import { Zap, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

interface AuthenticationProps {
  onLogin: (email: string) => void;
}

export function Authentication({ onLogin }: AuthenticationProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-[#1E1B4B] flex flex-col lg:flex-row">
      {/* Left Side - Illustration */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#312E81] to-[#1E1B4B]" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#06B6D4]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#F472B6]/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Brain Illustration */}
        <div className="relative z-10 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Brain Shape */}
            <motion.div 
              className="w-48 h-48 lg:w-64 lg:h-64 mx-auto relative"
              animate={{ 
                filter: [
                  'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))',
                  'drop-shadow(0 0 40px rgba(6, 182, 212, 0.8))',
                  'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Simplified Brain SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="50%" stopColor="#F472B6" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>
                <path
                  d="M100,40 Q120,30 130,40 Q150,40 150,60 Q160,70 155,85 Q160,100 150,115 Q150,130 140,140 Q130,150 115,145 Q105,150 100,160 Q95,150 85,145 Q70,150 60,140 Q50,130 50,115 Q40,100 45,85 Q40,70 50,60 Q50,40 70,40 Q80,30 100,40 Z"
                  fill="url(#brainGradient)"
                  opacity="0.8"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />
                {/* Brain details */}
                <path
                  d="M80,70 Q90,65 100,70 Q110,65 120,70"
                  fill="none"
                  stroke="#1E1B4B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M75,90 Q85,85 95,90 Q105,85 115,90 Q125,85 135,90"
                  fill="none"
                  stroke="#1E1B4B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M80,110 Q90,105 100,110 Q110,105 120,110"
                  fill="none"
                  stroke="#1E1B4B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Lightning Bolts */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 120;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: -12,
                    marginTop: -12
                  }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    rotate: angle * (180 / Math.PI) + 90,
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  <Zap className="w-6 h-6 text-[#FBBF24]" fill="#FBBF24" />
                </motion.div>
              );
            })}

            {/* Connecting Lines */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 120;
              return (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-20 origin-top"
                  style={{
                    left: '50%',
                    top: '50%',
                    background: 'linear-gradient(to bottom, #06B6D4, transparent)',
                    transform: `rotate(${angle * (180 / Math.PI)}deg) translateX(-50%)`
                  }}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scaleY: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              );
            })}
          </motion.div>

          <motion.h2 
            className="text-2xl lg:text-3xl text-white text-center mt-8 lg:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Power Your Learning with AI ⚡️
          </motion.h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl text-white mb-2">
            Ignite Your Mind ⚡️
          </h1>
          <p className="text-gray-400 mb-8">Sign in to start your learning journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#312E81] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all"
                  animate={{
                    borderColor: focusedInput === 'email' ? '#06B6D4' : '#312E81',
                    boxShadow: focusedInput === 'email' 
                      ? '0 0 20px rgba(6, 182, 212, 0.5)' 
                      : '0 0 0 rgba(6, 182, 212, 0)'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[#312E81] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all"
                  animate={{
                    borderColor: focusedInput === 'password' ? '#06B6D4' : '#312E81',
                    boxShadow: focusedInput === 'password' 
                      ? '0 0 20px rgba(6, 182, 212, 0.5)' 
                      : '0 0 0 rgba(6, 182, 212, 0)'
                  }}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl text-white relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%', opacity: 0.2 }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Log In to Spark</span>
              
              {/* Glitch Effect on Hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: [0, 0.3, 0],
                  x: [0, -2, 2, -2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-[#F472B6] mix-blend-screen" />
              </motion.div>
            </motion.button>

            {/* Mock Credentials */}
            <div className="bg-[#312E81]/50 border border-[#06B6D4]/30 rounded-lg p-3 text-xs text-gray-400">
              <p className="mb-1">Mock Credentials:</p>
              <p>📧 <span className="text-[#06B6D4]">premium@spark.com</span> (Pass: 123)</p>
              <p>📧 <span className="text-gray-300">free@spark.com</span> (Pass: 123)</p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}