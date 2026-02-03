// We use dynamic imports to prevent loading the heavy PDF library on initial page load
// This prevents app crashes if there are environment issues with the library
// and improves initial load performance

/**
 * Extracts text content from a PDF file using pdfjs-dist
 * @param file - The PDF file to extract text from
 * @param maxChars - Maximum characters to extract (to respect user limits)
 * @returns Promise with extracted text
 */
export async function extractTextFromPDF(file: File, maxChars?: number): Promise<string> {
    try {
        // Dynamically import pdfjs-dist only when needed
        const pdfjsLib = await import('pdfjs-dist');

        // Initialize worker if not already done
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
            // Use the version from the imported library
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        }

        const arrayBuffer = await file.arrayBuffer();

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';

        // Iterate through all pages
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Extract text items and join them
            // Type casting to any to handle potential type discrepancies
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');

            fullText += pageText + ' ';

            // Optimization: Stop if we've already exceeded the limit significantly
            if (maxChars && fullText.length > maxChars * 1.5) {
                break;
            }
        }

        // Clean up the extracted text
        let cleanedText = fullText
            .replace(/\s+/g, ' ')  // Collapse whitespace
            .trim();

        // Truncate to max chars if specified
        if (maxChars && cleanedText.length > maxChars) {
            cleanedText = cleanedText.substring(0, maxChars);
        }

        if (cleanedText.length === 0) {
            throw new Error('No text content found in PDF');
        }

        return cleanedText;
    } catch (error) {
        console.error('PDF Extraction Error:', error);
        // Return a user-friendly error string or rethrow
        throw new Error('Failed to extract text from PDF. The file might be scanned (image-based) or password protected.');
    }
}

/**
 * Check if a file is a valid PDF
 */
export function isPDFFile(file: File): boolean {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
