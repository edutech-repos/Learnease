import { motion } from 'motion/react';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';
import { SafeContentRenderer } from './SafeContentRenderer';

interface ContentToggleProps {
    showAfter: boolean;
    onToggle: (showAfter: boolean) => void;
    beforeLabel?: string;
    afterLabel?: string;
}

export function ContentToggle({
    showAfter,
    onToggle,
    beforeLabel = 'Original Input',
    afterLabel = 'AI Generated'
}: ContentToggleProps) {
    return (
        <div className="flex justify-center mb-6">
            <div className="bg-[#1E1B4B] p-1.5 rounded-2xl border border-[#06B6D4]/30 inline-flex items-center gap-1 relative">
                {/* Animated Background Slider */}
                <motion.div
                    className="absolute inset-y-1.5 rounded-xl"
                    initial={false}
                    animate={{
                        left: showAfter ? 'calc(50% + 2px)' : '6px',
                        right: showAfter ? '6px' : 'calc(50% + 2px)',
                        background: showAfter
                            ? 'linear-gradient(135deg, #F472B6, #EC4899)'
                            : 'linear-gradient(135deg, #06B6D4, #3B82F6)',
                        boxShadow: showAfter
                            ? '0 0 20px rgba(244, 114, 182, 0.4)'
                            : '0 0 20px rgba(6, 182, 212, 0.4)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />

                {/* Before Button */}
                <motion.button
                    onClick={() => onToggle(false)}
                    className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${!showAfter ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    whileTap={{ scale: 0.98 }}
                >
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">{beforeLabel}</span>
                </motion.button>

                {/* Animated Arrow */}
                <motion.div
                    className="relative z-10 text-gray-500"
                    animate={{
                        x: showAfter ? 2 : -2,
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 1.5, repeat: Infinity }
                    }}
                >
                    <ArrowRight className="w-4 h-4" />
                </motion.div>

                {/* After Button */}
                <motion.button
                    onClick={() => onToggle(true)}
                    className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors ${showAfter ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    whileTap={{ scale: 0.98 }}
                >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">{afterLabel}</span>
                </motion.button>
            </div>
        </div>
    );
}

interface ContentComparisonProps {
    beforeContent: string;
    afterContent: string;
    showAfter: boolean;
    beforeLabel?: string;
    afterLabel?: string;
}

export function ContentComparison({
    beforeContent,
    afterContent,
    showAfter,
    beforeLabel = 'Original Input',
    afterLabel = 'AI Generated Lesson'
}: ContentComparisonProps) {
    return (
        <motion.div
            className="bg-[#312E81] rounded-2xl p-6 border-2 border-[#06B6D4]/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Content Label */}
            <div className="flex items-center gap-2 mb-4">
                <motion.div
                    className={`w-2 h-2 rounded-full ${showAfter ? 'bg-[#F472B6]' : 'bg-[#06B6D4]'}`}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className={`text-sm font-medium ${showAfter ? 'text-[#F472B6]' : 'text-[#06B6D4]'}`}>
                    {showAfter ? afterLabel : beforeLabel}
                </span>
            </div>

            {/* Content Area with Animation */}
            <motion.div
                key={showAfter ? 'after' : 'before'}
                initial={{ opacity: 0, x: showAfter ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showAfter ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px]"
            >
                {showAfter ? (
                    <SafeContentRenderer htmlContent={afterContent} />
                ) : (
                    <div className="bg-[#1E1B4B] rounded-xl p-4 border border-[#06B6D4]/20">
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {beforeContent || 'No original content available'}
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Decorative Corner Glow */}
            <motion.div
                className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl ${showAfter ? 'bg-[#F472B6]' : 'bg-[#06B6D4]'
                    }`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15]
                }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </motion.div>
    );
}
