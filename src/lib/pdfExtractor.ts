// Simple PDF text extraction using browser APIs
// This extracts text from PDFs by parsing the raw PDF structure

/**
 * Extracts text content from a PDF file
 * Uses a simple regex-based approach to extract text from PDF streams
 * @param file - The PDF file to extract text from
 * @param maxChars - Maximum characters to extract (to respect user limits)
 * @returns Promise with extracted text
 */
export async function extractTextFromPDF(file: File, maxChars?: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);

                // Convert to string for text extraction
                let pdfContent = '';
                for (let i = 0; i < uint8Array.length; i++) {
                    pdfContent += String.fromCharCode(uint8Array[i]);
                }

                // Extract text using multiple methods
                let extractedText = '';

                // Method 1: Extract text between BT and ET markers (PDF text objects)
                const btEtRegex = /BT\s*([\s\S]*?)\s*ET/g;
                let match;
                while ((match = btEtRegex.exec(pdfContent)) !== null) {
                    const textBlock = match[1];
                    // Extract text from Tj and TJ operators
                    const tjRegex = /\(([^)]*)\)\s*Tj/g;
                    let tjMatch;
                    while ((tjMatch = tjRegex.exec(textBlock)) !== null) {
                        extractedText += decodeEscapedText(tjMatch[1]) + ' ';
                    }

                    // Handle TJ arrays (multiple text segments)
                    const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
                    let tjArrayMatch;
                    while ((tjArrayMatch = tjArrayRegex.exec(textBlock)) !== null) {
                        const arrayContent = tjArrayMatch[1];
                        const stringRegex = /\(([^)]*)\)/g;
                        let stringMatch;
                        while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
                            extractedText += decodeEscapedText(stringMatch[1]);
                        }
                        extractedText += ' ';
                    }
                }

                // Method 2: Look for readable ASCII text sections
                if (extractedText.trim().length < 100) {
                    // If Method 1 didn't extract much, try to find raw text
                    const readableRegex = /[\x20-\x7E]{20,}/g;
                    const readableMatches = pdfContent.match(readableRegex) || [];
                    for (const readable of readableMatches) {
                        // Skip PDF syntax
                        if (!readable.includes('<<') && !readable.includes('>>') &&
                            !readable.includes('/Type') && !readable.includes('stream')) {
                            extractedText += readable + ' ';
                        }
                    }
                }

                // Clean up the extracted text
                let cleanedText = extractedText
                    .replace(/\s+/g, ' ')  // Collapse whitespace
                    .replace(/[^\x20-\x7E\n]/g, '')  // Remove non-printable
                    .trim();

                // If we still couldn't extract text, show a message
                if (cleanedText.length < 50) {
                    cleanedText = `[PDF text extraction limited - This PDF may use image-based text or complex encoding. ` +
                        `Extracted ${cleanedText.length} characters. For best results, copy and paste text manually.]`;
                }

                // Truncate to max chars if specified
                if (maxChars && cleanedText.length > maxChars) {
                    cleanedText = cleanedText.substring(0, maxChars);
                }

                resolve(cleanedText);
            } catch (error) {
                reject(new Error(`Failed to extract text from PDF: ${error}`));
            }
        };

        reader.onerror = () => {
            reject(new Error('Failed to read PDF file'));
        };

        reader.readAsArrayBuffer(file);
    });
}

/**
 * Decode escaped PDF text strings
 */
function decodeEscapedText(text: string): string {
    return text
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\\/g, '\\');
}

/**
 * Check if a file is a valid PDF
 */
export function isPDFFile(file: File): boolean {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
