/**
 * SafeContentRenderer - Renders HTML content from Supabase with failsafe handling
 * 
 * EXPECTED HTML MARKUP FORMAT:
 * The backend should generate HTML with these elements:
 * 
 * - <h1>, <h2>, <h3> for headings
 * - <p> for paragraphs
 * - <ul>, <ol>, <li> for lists
 * - <strong>, <em> for emphasis
 * - <blockquote> for quotes/highlights
 * - <code> for inline code
 * - <pre><code> for code blocks
 * - <table>, <thead>, <tbody>, <tr>, <th>, <td> for tables
 * 
 * Example structured_content:
 * ```html
 * <h2>Introduction to Thermodynamics</h2>
 * <p>Thermodynamics is the study of heat and energy transfer.</p>
 * <h3>The Four Laws</h3>
 * <ul>
 *   <li><strong>Zeroth Law:</strong> Thermal equilibrium is transitive</li>
 *   <li><strong>First Law:</strong> Energy cannot be created or destroyed</li>
 *   <li><strong>Second Law:</strong> Entropy always increases</li>
 *   <li><strong>Third Law:</strong> As T → 0K, entropy → 0</li>
 * </ul>
 * <blockquote>Key Formula: ΔU = Q - W</blockquote>
 * ```
 */

import DOMPurify from 'dompurify';

interface SafeContentRendererProps {
    htmlContent: string | null | undefined;
    fallbackMessage?: string;
    className?: string;
}

// Allowed HTML tags for DOMPurify
const ALLOWED_TAGS = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'strong', 'b', 'em', 'i', 'u', 's',
    'blockquote', 'q',
    'code', 'pre',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'a', 'span', 'div',
    'img', 'figure', 'figcaption',
    'sup', 'sub',
    'mark'
];

const ALLOWED_ATTR = ['href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel'];

export function SafeContentRenderer({
    htmlContent,
    fallbackMessage = 'No content available',
    className = ''
}: SafeContentRendererProps) {
    // Failsafe: Handle null, undefined, or empty content
    if (!htmlContent || htmlContent.trim() === '') {
        return (
            <div className={`text-gray-400 italic ${className}`}>
                {fallbackMessage}
            </div>
        );
    }

    // Failsafe: If content is plain text (no HTML tags), wrap in paragraph
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(htmlContent);
    const contentToRender = hasHtmlTags
        ? htmlContent
        : `<p>${htmlContent.replace(/\n/g, '<br/>')}</p>`;

    // Sanitize HTML to prevent XSS attacks
    const cleanHTML = DOMPurify.sanitize(contentToRender, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
        KEEP_CONTENT: true, // Keep text content even if tag is removed
    });

    // Failsafe: If sanitization removed everything, show fallback
    if (!cleanHTML || cleanHTML.trim() === '') {
        return (
            <div className={`text-gray-400 italic ${className}`}>
                Content could not be displayed. Please try again.
            </div>
        );
    }

    return (
        <div
            className={`
        prose prose-invert max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-6
        prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-5 prose-h2:text-[#06B6D4]
        prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-[#F472B6]
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-3
        prose-ul:text-gray-300 prose-ul:my-2
        prose-ol:text-gray-300 prose-ol:my-2
        prose-li:my-1
        prose-strong:text-white prose-strong:font-semibold
        prose-em:text-[#FBBF24]
        prose-blockquote:border-l-4 prose-blockquote:border-[#06B6D4] 
        prose-blockquote:bg-[#312E81]/50 prose-blockquote:py-2 prose-blockquote:px-4
        prose-blockquote:text-gray-300 prose-blockquote:italic
        prose-code:bg-[#312E81] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:text-[#06B6D4] prose-code:text-sm
        prose-pre:bg-[#1E1B4B] prose-pre:border prose-pre:border-[#06B6D4]/30
        prose-pre:rounded-lg prose-pre:p-4
        prose-table:border-collapse prose-table:w-full
        prose-th:bg-[#312E81] prose-th:text-white prose-th:p-2 prose-th:border prose-th:border-[#06B6D4]/30
        prose-td:p-2 prose-td:border prose-td:border-[#06B6D4]/20 prose-td:text-gray-300
        prose-a:text-[#06B6D4] prose-a:no-underline hover:prose-a:underline
        ${className}
      `}
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
    );
}

// Markdown to HTML converter for cases where backend sends markdown
export function markdownToHtml(markdown: string): string {
    if (!markdown) return '';

    let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold and Italic
        .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Lists
        .replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
        // Code blocks
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        // Blockquotes
        .replace(/^>\s*(.*)$/gim, '<blockquote>$1</blockquote>')
        // Line breaks
        .replace(/\n\n/gim, '</p><p>')
        .replace(/\n/gim, '<br/>');

    // Wrap list items in ul
    html = html.replace(/(<li>.*<\/li>)/gis, '<ul>$1</ul>');
    // Clean up consecutive ul tags
    html = html.replace(/<\/ul>\s*<ul>/gim, '');

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
        html = `<p>${html}</p>`;
    }

    return html;
}
