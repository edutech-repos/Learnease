import { motion, AnimatePresence } from 'motion/react';
import { CloudUpload, Zap, Shield, TrendingUp, BookOpen, GraduationCap, RotateCcw, Sparkles, Save, Loader2, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { NavigationLayout } from './NavigationLayout';
import { ContentComparison } from './ContentToggle';
import { igniteLesson, igniteLessonMock } from '../lib/api';
import { LoadingOverlay } from './LoadingOverlay';
interface DashboardPremiumProps {
  userName: string;
  userId?: string;
  onNavigate: (screen: any) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  onIgniteLesson?: () => void;
  onShowComparison?: () => void;
}

export function DashboardPremium({ userName, userId = 'USR_TEST_001', onNavigate, onShowProfile, onLogout, onShowComparison }: DashboardPremiumProps) {
  const [textInput, setTextInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [learningMode, setLearningMode] = useState<'learning' | 'exam'>('learning');
  const [showContentComparison, setShowContentComparison] = useState(false);
  const [showAfterContent, setShowAfterContent] = useState(true);
  const [showDiagram, setShowDiagram] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const maxChars = 4000; // Premium user limit
  const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
  const isAtLimit = textInput.length >= maxChars;

  const handleFileSelect = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError('');

    let file: File | null = null;

    if ('dataTransfer' in e) {
      // Drag and drop event
      file = e.dataTransfer.files[0];
    } else if ('target' in e && e.target.files) {
      // File input event
      file = e.target.files[0];
    }

    if (file) {
      // Validate file size
      if (file.size > maxFileSize) {
        setUploadError(`File size exceeds 10 MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)} MB.`);
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Only PDF, DOCX, and TXT files are supported.');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setTextInput(e.target.value);
    }
  };

  const handleIgniteLesson = async () => {
    if (textInput.length > 0 || selectedFile) {
      // Store original content
      const rawText = textInput || (selectedFile ? `File: ${selectedFile.name}` : '');
      setOriginalContent(rawText);
      setApiError(null);
      setIsLoading(true);

      try {
        // Call the webhook API
        const response = await igniteLesson({
          userId: userId,
          rawText: rawText,
        });

        // Use htmlContent for the generated content display
        setGeneratedContent(response.htmlContent);
        // Store MCQs for the quiz
        console.log('MCQs for quiz:', response.mcqs);

        setShowContentComparison(true);
        setShowAfterContent(true);
      } catch (error) {
        console.error('Ignite lesson failed:', error);
        setApiError(error instanceof Error ? error.message : 'Failed to process content. Please try again.');

        // Fallback to mock if webhook fails
        try {
          const mockResponse = await igniteLessonMock({
            userId: userId,
            rawText: rawText,
          });
          setGeneratedContent(mockResponse.htmlContent);
          setShowContentComparison(true);
          setShowAfterContent(true);
          setApiError('Using offline mode - webhook unavailable');
        } catch (mockError) {
          console.error('Mock also failed:', mockError);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetContent = () => {
    setShowContentComparison(false);
    setTextInput('');
    setSelectedFile(null);
    setOriginalContent('');
    setGeneratedContent('');
    setApiError(null);
  };

  const weaknessTopics = [
    {
      title: 'Photosynthesis: Dark Reactions',
      tag: 'Biology',
      attempts: 3,
      avgScore: '40%',
      icon: '🌱'
    },
    {
      title: 'Quadratic Equations',
      tag: 'Math',
      attempts: 5,
      avgScore: '52%',
      icon: '📐'
    },
    {
      title: 'French Revolution Causes',
      tag: 'History',
      attempts: 2,
      avgScore: '45%',
      icon: '📚'
    }
  ];

  return (
    <NavigationLayout
      userName={userName}
      userType="premium"
      currentScreen="dashboard"
      onNavigate={onNavigate}
      onShowProfile={onShowProfile}
      onLogout={onLogout}
    >
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>

      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Hero Split Input Zone */}
        <div className="mb-8">
          {/* Top Half - PDF Upload Area */}
          <motion.div
            className={`relative bg-[#1E1B4B] rounded-t-2xl p-8 lg:p-12 border-2 transition-all cursor-pointer ${uploadError
              ? 'border-[#EF4444] glow-red'
              : selectedFile
                ? 'border-[#10B981] glow-green'
                : isDragging
                  ? 'border-solid border-[#06B6D4] glow-cyan'
                  : 'border-dashed border-[#06B6D4]/60'
              }`}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileSelect}
            onClick={() => document.getElementById('file-input-premium')?.click()}
            whileHover={{ borderColor: uploadError ? '#EF4444' : selectedFile ? '#10B981' : '#06B6D4' }}
            animate={uploadError ? {
              x: [0, -10, 10, -10, 10, 0],
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.6)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.6)'
              ]
            } : selectedFile ? {
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.4)',
                '0 0 30px rgba(16, 185, 129, 0.6)',
                '0 0 20px rgba(16, 185, 129, 0.4)'
              ]
            } : undefined}
            transition={uploadError ? { duration: 0.5 } : selectedFile ? { duration: 2, repeat: Infinity } : undefined}
          >
            {/* Hidden File Input */}
            <input
              id="file-input-premium"
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  filter: [
                    `drop-shadow(0 0 10px ${uploadError ? 'rgba(239, 68, 68, 0.5)' : selectedFile ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)'})`,
                    `drop-shadow(0 0 20px ${uploadError ? 'rgba(239, 68, 68, 0.8)' : selectedFile ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.8)'})`,
                    `drop-shadow(0 0 10px ${uploadError ? 'rgba(239, 68, 68, 0.5)' : selectedFile ? 'rgba(16, 185, 129, 0.5)' : 'rgba(6, 182, 212, 0.5)'})`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <CloudUpload className={`w-16 h-16 lg:w-20 lg:h-20 mb-4 ${uploadError ? 'text-[#EF4444]' : selectedFile ? 'text-[#10B981]' : 'text-[#06B6D4]'
                  }`} />
              </motion.div>

              {selectedFile ? (
                <>
                  <p className="text-lg lg:text-xl text-[#10B981] font-semibold mb-2">✓ File Selected</p>
                  <p className="text-base text-gray-300 mb-1">{selectedFile.name}</p>
                  <p className="text-sm text-[#10B981]">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </>
              ) : uploadError ? (
                <>
                  <p className="text-lg lg:text-xl text-[#EF4444] font-semibold mb-2">✗ Upload Failed</p>
                  <p className="text-sm text-gray-300">Click to try again</p>
                </>
              ) : (
                <>
                  <p className="text-lg lg:text-xl text-gray-300">Drop PDF here or click to browse</p>
                  <p className="text-gray-500 text-xs mt-2">Max file size: 10 MB • Unlimited lessons</p>
                </>
              )}
            </div>
          </motion.div>

          {/* Divider - OR - with lightning */}
          <div className="relative flex items-center justify-center py-4 bg-[#312E81]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"></div>
            <div className="relative flex items-center gap-3 text-[#06B6D4]">
              <Zap className="w-5 h-5" fill="#06B6D4" />
              <span className="text-lg tracking-wider text-glow-cyan">- OR -</span>
              <Zap className="w-5 h-5" fill="#06B6D4" />
            </div>
          </div>

          {/* Bottom Half - Text Input Area */}
          <motion.div
            className={`relative ${isAtLimit ? 'glow-red' : isFocused ? 'glow-cyan' : ''
              }`}
            animate={isAtLimit ? {
              boxShadow: [
                '0 0 20px rgba(239, 68, 68, 0.6)',
                '0 0 40px rgba(239, 68, 68, 0.8)',
                '0 0 20px rgba(239, 68, 68, 0.6)'
              ]
            } : undefined}
            transition={isAtLimit ? { duration: 1, repeat: Infinity } : undefined}
          >
            <textarea
              value={textInput}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste your study text here..."
              className="w-full h-48 lg:h-64 bg-[#1E1B4B] rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none border-2 border-transparent focus:border-[#06B6D4]/50 transition-all"
              style={{
                filter: isFocused ? 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' : 'none'
              }}
            />

            {/* Character Counter */}
            <div className="mt-3 flex justify-end">
              <motion.span
                className={`text-sm ${isAtLimit
                  ? 'text-[#EF4444]'
                  : textInput.length > 0
                    ? 'text-[#FBBF24]'
                    : 'text-gray-500'
                  }`}
                animate={isAtLimit ? {
                  scale: [1, 1.1, 1]
                } : undefined}
                transition={isAtLimit ? { duration: 0.5, repeat: Infinity } : undefined}
              >
                {textInput.length} / {maxChars} chars
              </motion.span>
            </div>
          </motion.div>

          {/* Learning Mode Selector */}
          <div className="mt-6 flex justify-center">
            <div className="bg-[#1E1B4B] p-1 rounded-xl border border-[#06B6D4]/30 inline-flex">
              <button
                onClick={() => setLearningMode('learning')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${learningMode === 'learning'
                  ? 'bg-[#06B6D4] text-white shadow-lg shadow-[#06B6D4]/20'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Learning Purpose</span>
              </button>
              <button
                onClick={() => setLearningMode('exam')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${learningMode === 'exam'
                  ? 'bg-[#F472B6] text-white shadow-lg shadow-[#F472B6]/20'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Exam Prep</span>
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <motion.button
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] rounded-2xl text-white text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: textInput.length > 0 || isDragging ? 1.02 : 1 }}
            whileTap={{ scale: textInput.length > 0 || isDragging ? 0.98 : 1 }}
            disabled={textInput.length === 0 && !selectedFile}
            onClick={handleIgniteLesson}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <span>Ignite Lesson</span>
              <span>🚀</span>
            </span>
          </motion.button>

          {/* Upload Error Message */}
          {uploadError && (
            <p className="text-sm text-[#EF4444] mt-2 text-center">
              {uploadError}
            </p>
          )}
        </div>

        {/* Content Comparison Section */}
        {showContentComparison && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header with Action Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#FBBF24]" />
                <h3 className="text-xl text-white">Premium Lesson Generated ⚡️</h3>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleResetContent}
                  className="flex items-center gap-2 px-4 py-2 bg-[#312E81] border border-[#FBBF24]/30 rounded-lg text-[#FBBF24] hover:bg-[#FBBF24]/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm">New Lesson</span>
                </motion.button>
                <motion.button
                  onClick={() => alert('Lesson saved to My Lessons! 🎉')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#312E81] border border-[#10B981]/50 rounded-lg text-[#10B981] hover:bg-[#10B981]/10 transition-colors"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm">Save Lesson</span>
                </motion.button>
                {/* Ignite Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(244, 114, 182, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleIgniteLesson}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-[#F472B6] to-[#EC4899] p-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-[#F472B6]/20 border border-[#F472B6]/20 group relative overflow-hidden ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shine" />
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Igniting...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:animate-pulse" />
                      <span className="tracking-wide">IGNITE LESSON (PREMIUM)</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Error Message */}
              {apiError && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-200 text-sm animate-in fade-in slide-in-from-top-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {apiError}
                </div>
              )}
            </div>
            {/* Content Comparison */}
            <ContentComparison
              beforeContent={originalContent}
              afterContent={generatedContent}
              showAfter={showAfterContent}
            />

            {/* Action Buttons Row */}
            {generatedContent && (
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <motion.button
                  onClick={() => setShowDiagram(!showDiagram)}
                  className="flex-1 py-3 bg-[#1E1B4B] border-2 border-[#06B6D4]/50 rounded-xl text-[#06B6D4] flex items-center justify-center gap-2 relative overflow-hidden group"
                  whileHover={{
                    scale: 1.02,
                    borderColor: '#06B6D4',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">
                    {showDiagram ? 'Hide Diagram' : 'Generate Diagram'}
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => alert('Starting quiz... (Feature coming soon!)')}
                  className="flex-1 py-3 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-xl text-white flex items-center justify-center gap-2 relative overflow-hidden group"
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
                  <Gamepad2 className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">Take Quiz</span>
                </motion.button>
              </div>
            )}

            {/* Diagram Display - Controlled by button */}
            <AnimatePresence>
              {showDiagram && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="rounded-2xl overflow-hidden border border-[#06B6D4]/30 shadow-lg shadow-[#06B6D4]/10 bg-white"
                >
                  <div className="bg-[#1E1B4B] p-4 border-b border-[#06B6D4]/30 flex items-center justify-between">
                    <h3 className="text-white font-medium flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F472B6]" />
                      AI Concept Visualization
                    </h3>
                    <motion.button
                      onClick={() => setShowDiagram(false)}
                      className="p-1 rounded-full hover:bg-[#312E81] transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-400" />
                    </motion.button>
                  </div>
                  <div className="flex justify-center bg-white p-4">
                    <img
                      src="/placeholder-diagram.svg"
                      alt="AI Generated Diagram"
                      className="max-w-full h-auto max-h-[400px] object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Weakness Breakers Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#F472B6]" />
            <h3 className="text-xl lg:text-2xl text-white">Weakness Breakers 🛡️</h3>
          </div>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">
            AI-identified topics where you need more practice
          </p>

          <div className="relative">
            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {weaknessTopics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 w-72 lg:w-80 bg-[#312E81] rounded-xl p-6 border-2 border-[#F472B6]/50 relative overflow-hidden snap-start"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: '#F472B6',
                    boxShadow: '0 0 30px rgba(244, 114, 182, 0.5), 0 0 60px rgba(244, 114, 182, 0.2)'
                  }}
                >
                  {/* Urgent Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F472B6]/10 to-[#EF4444]/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{topic.icon}</span>
                      <div className="px-3 py-1 bg-[#F472B6]/20 border border-[#F472B6] rounded-full text-xs text-[#F472B6]">
                        Weak Topic
                      </div>
                    </div>

                    <h4 className="text-white mb-3">{topic.title}</h4>

                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-400">Attempts: </span>
                        <span className="text-[#FBBF24]">{topic.attempts}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Avg Score: </span>
                        <span className="text-[#EF4444]">{topic.avgScore}</span>
                      </div>
                    </div>

                    <motion.button
                      className="w-full py-2 bg-gradient-to-r from-[#F472B6] to-[#EC4899] rounded-lg text-white text-sm relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Improve Now
                      </span>
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-[#F472B6]/20 rounded-bl-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {weaknessTopics.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-[#F472B6]/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Premium Features Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#312E81] to-[#1E1B4B] rounded-xl p-6 border border-[#FBBF24]/30 glow-yellow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1">
              <h4 className="text-white mb-2 flex items-center gap-2">
                <span>⚡️</span>
                <span>You're using Premium Features</span>
              </h4>
              <p className="text-gray-400 text-sm">
                Unlimited lessons, weakness analysis, and personalized learning paths
              </p>
            </div>
            <motion.button
              onClick={onShowComparison}
              className="px-6 py-3 bg-[#FBBF24] rounded-lg text-[#1E1B4B]"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Benefits
            </motion.button>
          </div>
        </motion.div>
      </div>
    </NavigationLayout>
  );
}