import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, Image, X, Download, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchStudyMaterial } from '../lib/supabase';
import { getDiagramUrl, generateDiagram } from '../lib/api';

interface ContentReviewProps {
  lessonId: string;
  onBack: () => void;
  onStartQuiz: () => void;
  userType?: 'premium' | 'free' | null;
  originalContent?: string;
}

export function ContentReview({ onBack, onStartQuiz, userType = 'free', originalContent, lessonId }: ContentReviewProps) {
  const [showDiagram, setShowDiagram] = useState(false);
  const [diagramsRemaining, setDiagramsRemaining] = useState(
    userType === 'premium' ? 30 : 5
  );
  const [showAfterContent, setShowAfterContent] = useState(true);
  const [lessonData, setLessonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [diagramUrl, setDiagramUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function loadLesson() {
      if (lessonId) {
        setIsLoading(true);
        try {
          const { data, error } = await fetchStudyMaterial(lessonId.toString());
          // Debug check for the user
          console.log('Fetched lesson data:', data);
          if (data) {
            setLessonData(data);
            // Strict check: Ensure image_path is actually a valid path string (case-insensitive)
            // Handle "NULL", "Null", "null", "undefined", etc.
            const imgPath = data.image_path ? String(data.image_path).trim() : "";
            const lowerPath = imgPath.toLowerCase();

            if (imgPath.length > 0 && lowerPath !== "null" && lowerPath !== "undefined") {
              console.log('Found diagram path:', data.image_path);
              setDiagramUrl(getDiagramUrl(data.image_path));
            } else {
              console.log('No valid diagram path found (invalid value:', data.image_path, ')');
              setDiagramUrl(null);
            }
          }
        } catch (err) {
          console.error("Failed to load lesson", err);
        } finally {
          setIsLoading(false);
        }
      }
    }
    loadLesson();
  }, [lessonId]);

  const handleGenerateDiagram = async () => {
    if (diagramsRemaining <= 0 || isGenerating) return;

    // If we already have a URL, just show it. 
    // BUT the user specifically wants to "connect to the new workflow".
    // If diagramUrl exists, maybe we shouldn't regenerate? 
    // The user said "connect Generate Diagram button to the new workflow". 
    // I will assume if no diagram exists, we generate. If it exists, we show.

    if (diagramUrl) {
      setShowDiagram(true);
      return;
    }

    setIsGenerating(true);
    try {
      if (!lessonData) {
        alert("Lesson data not loaded yet.");
        return;
      }

      // Construct payload from lessonData
      const payload = {
        userId: lessonData.user_id || 'unknown', // Fallback
        topic: lessonData.title || 'Untitled',
        htmlContent: lessonData.structured_content || '',
        textContent: lessonData.original_text || '',
        mcqs: lessonData.quiz_data || []
      };

      await generateDiagram(payload);

      setDiagramsRemaining(prev => prev - 1);
      alert("Diagram generation started! It will appear specifically in your dedicated diagrams dashboard (or verify via Supabase).");
      // We could poll for the new image or just show success. 
      // As per user "let user_diagram do it works... connect and make it working first"

    } catch (error) {
      console.error("Failed to generate diagram:", error);
      alert("Failed to trigger diagram generation. See console.");
    } finally {
      setIsGenerating(false);
    }
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{'⚡️'}</span>
                  <div>
                    <h1 className="text-xl lg:text-2xl text-white">
                      {isLoading ? 'Loading...' : (lessonData?.topic || lessonData?.title || 'Untitled Lesson')}
                    </h1>
                    <p className="text-sm text-gray-400">Lesson Review</p>
                  </div>
                </div>

                <motion.button
                  onClick={() => alert('Downloading PDF... (Mock Action)')}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1E1B4B] border border-[#06B6D4]/30 rounded-xl text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Toggle */}
      {originalContent && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <div className="flex justify-center">
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
      )}

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-4 lg:p-8 pb-8">
        {/* Show Original Content */}
        {originalContent && !showAfterContent ? (
          <motion.div
            className="bg-[#312E81] rounded-2xl p-6 lg:p-10 border-2 border-[#06B6D4]/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key="before-content"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-[#06B6D4]" />
              <h2 className="text-xl text-[#06B6D4]">Original Input</h2>
            </div>
            <div className="bg-[#1E1B4B] rounded-xl p-6 border border-[#06B6D4]/20">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                {originalContent}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-[#312E81] rounded-2xl p-6 lg:p-10 border-2 border-[#06B6D4]/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key="after-content"
          >
            {/* Rich Text Content */}
            <div className="prose prose-invert max-w-none">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
                </div>
              ) : (lessonData?.html_content || lessonData?.structured_content || "Content not available in this view. Please check the diagram.")
                .split('\n').map((line: string, idx: number) => {
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
        )}
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

              {/* Actual Diagram */}
              <div className="bg-[#1E1B4B] rounded-xl p-4 border-2 border-[#06B6D4]/30 flex items-center justify-center min-h-[400px] overflow-auto">
                {diagramUrl ? (
                  <img
                    src={diagramUrl}
                    alt="Lesson Diagram"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Diagram+Load+Error';
                    }}
                  />
                ) : (
                  <div className="text-center">
                    <Image className="w-24 h-24 text-[#06B6D4] mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400 text-lg">No Diagram Available</p>
                    <p className="text-gray-500 text-sm mt-2">
                      The diagram for this lesson could not be found.
                      <br />
                      Running generation workflow...
                    </p>
                  </div>
                )}
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
          onClick={handleGenerateDiagram}
          className={`px-6 py-4 rounded-2xl text-white shadow-xl flex items-center gap-3 relative overflow-hidden group ${diagramsRemaining > 0
            ? 'bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]'
            : 'bg-gray-600 cursor-not-allowed'
            }`}
          whileHover={diagramsRemaining > 0 ? { scale: 1.05, y: -2 } : undefined}
          whileTap={diagramsRemaining > 0 ? { scale: 0.95 } : undefined}
          disabled={diagramsRemaining === 0 || isGenerating}
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

          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin relative z-10" />
          ) : (
            <Image className="w-5 h-5 relative z-10" />
          )}

          <span className="relative z-10 flex flex-col items-start text-left">
            <span className="text-sm font-semibold">{diagramUrl ? 'View Diagram' : (isGenerating ? 'Generating...' : 'Generate Diagram')}</span>
            <span className={`text-xs ${diagramsRemaining > 0 ? 'text-white/80' : 'text-gray-400'}`}>
              {diagramsRemaining > 0 ? 'Click to reveal' : 'Limit reached'}
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
