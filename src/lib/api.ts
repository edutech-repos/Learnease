// API service for LearnEase webhook calls

const WEBHOOK_BASE_URL = 'https://amrutpatankar.app.n8n.cloud/webhook';

/**
 * Sanitizes text to ensure it's plain text without special characters
 * that could cause JSON formatting issues in the n8n webhook
 */
function sanitizeText(text: string): string {
    return text
        // Normalize Unicode characters to their ASCII equivalents
        .normalize('NFKD')
        // IMPORTANT: Replace ALL double quotes with single quotes to prevent JSON breaking in n8n
        .replace(/[""\u201C\u201D]/g, "'")  // All types of double quotes → single quote
        // Replace smart/curly single quotes with straight single quotes
        .replace(/[\u2018\u2019]/g, "'")  // Single curly quotes
        // Replace em-dash and en-dash with regular hyphen
        .replace(/[\u2013\u2014]/g, '-')
        // Replace ellipsis with three dots
        .replace(/\u2026/g, '...')
        // Replace non-breaking spaces with regular spaces
        .replace(/\u00A0/g, ' ')
        // Remove other problematic Unicode characters
        .replace(/[\u2022\u2023\u25E6\u2043\u2219]/g, '-')  // Various bullet points
        // Remove zero-width characters
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
        // Normalize line breaks to spaces (newlines can also break JSON in templates)
        .replace(/\r\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\n/g, ' ')
        // Remove control characters
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        // Collapse multiple spaces
        .replace(/\s+/g, ' ')
        // Trim whitespace
        .trim();
}

export interface WebhookResponse {
    userId: string;
    htmlContent: string;
    textContent: string;
    mcqs: {
        question: string;
        options: string[];
        answer: string;
    }[];
}

export interface IgniteLessonRequest {
    userId: string;
    rawText: string;
}

/**
 * Calls the plainToHtml webhook to process unstructured text
 * and returns structured HTML content with MCQs
 */
export async function igniteLesson(request: IgniteLessonRequest): Promise<WebhookResponse> {
    // Sanitize the raw text to remove special characters that could cause JSON issues
    const sanitizedText = sanitizeText(request.rawText);

    // Log sanitization for debugging
    console.log('=== Text Sanitization ===');
    console.log('Original text (first 200 chars):', request.rawText.substring(0, 200));
    console.log('Sanitized text (first 200 chars):', sanitizedText.substring(0, 200));

    // Check for quote characters specifically
    const origQuotes = request.rawText.match(/["'\u201C\u201D\u2018\u2019]/g) || [];
    const sanitizedQuotes = sanitizedText.match(/["'\u201C\u201D\u2018\u2019]/g) || [];
    console.log('Original quote chars:', origQuotes.map(c => `"${c}" (code: ${c.charCodeAt(0)})`));
    console.log('Sanitized quote chars:', sanitizedQuotes.map(c => `"${c}" (code: ${c.charCodeAt(0)})`));

    // Check for em-dashes
    const origDashes = request.rawText.match(/[—–\u2013\u2014-]/g) || [];
    console.log('Dash chars found:', origDashes.map(c => `"${c}" (code: ${c.charCodeAt(0)})`));

    console.log('Length change:', request.rawText.length, '→', sanitizedText.length);

    // Build the request payload
    const payload = {
        userId: request.userId,
        rawText: sanitizedText,
    };

    // Log what we're sending for debugging
    console.log('Sending to webhook:', {
        url: `${WEBHOOK_BASE_URL}/unstructured-input`,
        payload: {
            userId: payload.userId,
            rawTextLength: payload.rawText.length,
            rawTextPreview: payload.rawText.substring(0, 100) + '...',
        }
    });

    try {
        const response = await fetch(`${WEBHOOK_BASE_URL}/unstructured-input`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Webhook response status:', response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Webhook error response:', errorText);
            throw new Error(`Webhook failed: ${response.status} - ${errorText || 'No error message'}`);
        }

        const responseText = await response.text();
        console.log('Webhook raw response:', responseText.substring(0, 200));

        // Handle empty response
        if (!responseText || responseText.trim() === '') {
            throw new Error('Webhook returned empty response');
        }

        try {
            const data = JSON.parse(responseText);
            return data as WebhookResponse;
        } catch (parseError) {
            console.error('Failed to parse webhook response as JSON:', responseText);
            throw new Error(`Invalid JSON response from webhook: ${responseText.substring(0, 100)}`);
        }
    } catch (fetchError) {
        // Network or fetch errors
        if (fetchError instanceof TypeError) {
            console.error('Network error:', fetchError);
            throw new Error(`Network error calling webhook: ${fetchError.message}`);
        }
        throw fetchError;
    }
}

/**
 * Mock version for development/testing when webhook is unavailable
 */
export async function igniteLessonMock(request: IgniteLessonRequest): Promise<WebhookResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        userId: request.userId,
        htmlContent: `<h2>Introduction to Thermodynamics</h2>
<p>Thermodynamics is the branch of physics that deals with the relationships between heat and other forms of energy. In particular, it describes how thermal energy is converted to and from other forms of energy and how it affects matter.</p>

<h3>The Four Laws of Thermodynamics</h3>
<p>The fundamental principles of thermodynamics are expressed in four laws:</p>

<h4><strong>Zeroth Law: Thermal Equilibrium</strong></h4>
<p>If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law forms the basis for temperature measurement.</p>

<h4><strong>First Law: Conservation of Energy</strong></h4>
<p>Energy cannot be created or destroyed, only transformed. The change in internal energy of a closed system is equal to the heat supplied to the system minus the work done by the system.</p>
<blockquote>Formula: <strong>ΔU = Q - W</strong></blockquote>

<h4><strong>Second Law: Entropy</strong></h4>
<p>In any cyclic process, the entropy will either increase or remain the same. It establishes the concept of irreversibility and the "arrow of time". Heat cannot spontaneously flow from a colder location to a hotter location.</p>

<h4><strong>Third Law: Absolute Zero</strong></h4>
<p>As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of the system approaches a constant minimum. Ideally, the entropy of a perfect crystal at absolute zero is exactly equal to zero.</p>

<h3>Real-World Applications</h3>
<ul>
  <li><strong>Heat Engines:</strong> Car engines and power plants convert heat into mechanical work.</li>
  <li><strong>Refrigerators & AC:</strong> These devices use work to move heat from a cool space to a warm space (against the natural flow).</li>
  <li><strong>Biological Systems:</strong> Living organisms are open systems that constantly exchange energy and matter with their surroundings to maintain low entropy (order).</li>
</ul>

<h3>Summary</h3>
<p>Thermodynamics governs the behavior of energy in the universe, from the smallest engine to the stars themselves. Understanding these laws is crucial for engineering, chemistry, and environmental science.</p>`,
        textContent: `Introduction to Thermodynamics

Thermodynamics is the branch of physics that deals with the relationships between heat and other forms of energy. In particular, it describes how thermal energy is converted to and from other forms of energy and how it affects matter.

The Four Laws of Thermodynamics:

Zeroth Law: Thermal Equilibrium
If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other. This law forms the basis for temperature measurement.

First Law: Conservation of Energy
Energy cannot be created or destroyed, only transformed. The change in internal energy of a closed system is equal to the heat supplied to the system minus the work done by the system.
Formula: ΔU = Q - W

Second Law: Entropy
In any cyclic process, the entropy will either increase or remain the same. It establishes the concept of irreversibility and the "arrow of time". Heat cannot spontaneously flow from a colder location to a hotter location.

Third Law: Absolute Zero
As the temperature of a system approaches absolute zero (0 Kelvin), the entropy of the system approaches a constant minimum. Ideally, the entropy of a perfect crystal at absolute zero is exactly equal to zero.

Real-World Applications:
- Heat Engines: Car engines and power plants convert heat into mechanical work.
- Refrigerators & AC: These devices use work to move heat from a cool space to a warm space.
- Biological Systems: Living organisms exchange energy to maintain low entropy.

Summary
Thermodynamics governs the behavior of energy in the universe. Understanding these laws is crucial for engineering, chemistry, and environmental science.`,
        mcqs: [
            {
                question: "What does the First Law of Thermodynamics state?",
                options: ["Energy cannot be created or destroyed", "Entropy always increases", "Thermal equilibrium is transitive", "Absolute zero is unattainable"],
                answer: "Energy cannot be created or destroyed"
            },
            {
                question: "Which law is related to 'Entropy always increases'?",
                options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
                answer: "Second Law"
            },
            {
                question: "What is the formula for the First Law?",
                options: ["ΔU = Q - W", "F = ma", "E = mc^2", "PV = nRT"],
                answer: "ΔU = Q - W"
            },
            {
                question: "As Temperature approaches 0 Kelvin, what happens to entropy according to the Third Law?",
                options: ["It approaches infinity", "It approaches zero", "It becomes constant but non-zero", "It fluctuates wildly"],
                answer: "It approaches zero"
            },
            {
                question: "Which of these is an application of thermodynamics?",
                options: ["Heat engines", "Social structures", "Abstract algebra", "Grammar rules"],
                answer: "Heat engines"
            }
        ]
    };
}

// Quiz API Types and Functions

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option (0-3)
}

export interface QuizResponse {
    userId: string;
    questions: QuizQuestion[];
}

export interface GenerateQuizRequest {
    userId: string;
    textContent: string;
}

/**
 * Calls the quiz webhook to generate MCQs from text content
 */
export async function generateQuiz(request: GenerateQuizRequest): Promise<QuizResponse> {
    // Sanitize the text content
    const sanitizedText = sanitizeText(request.textContent);

    const payload = {
        userId: request.userId,
        textContent: sanitizedText,
    };

    console.log('Generating quiz for content length:', sanitizedText.length);

    try {
        const response = await fetch(`${WEBHOOK_BASE_URL}/generate-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Quiz webhook failed with status: ${response.status}`);
        }

        const responseText = await response.text();

        if (!responseText || responseText.trim() === '') {
            throw new Error('Quiz webhook returned empty response');
        }

        const data = JSON.parse(responseText) as QuizResponse;
        console.log('Quiz generated:', data.questions?.length, 'questions');
        return data;
    } catch (error) {
        console.error('Quiz generation failed:', error);
        throw error;
    }
}

/**
 * Mock quiz generator for development/fallback
 */
export function generateQuizMock(request: GenerateQuizRequest): QuizResponse {
    return {
        userId: request.userId,
        questions: [
            {
                id: 1,
                question: "What is the main topic of this content?",
                options: ["Topic A", "Topic B", "Topic C", "Topic D"],
                correctAnswer: 0
            },
            {
                id: 2,
                question: "Which concept is most important?",
                options: ["Concept 1", "Concept 2", "Concept 3", "Concept 4"],
                correctAnswer: 1
            },
            {
                id: 3,
                question: "What can be concluded from the content?",
                options: ["Conclusion A", "Conclusion B", "Conclusion C", "Conclusion D"],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "Which statement is true based on the content?",
                options: ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
                correctAnswer: 0
            },
            {
                id: 5,
                question: "What is a key application of this topic?",
                options: ["Application A", "Application B", "Application C", "Application D"],
                correctAnswer: 3
            }
        ]
    };
}

// Save Study Material API Types and Functions

export interface SaveStudyMaterialRequest {
    userId: string;
    title: string;
    textContent: string;
    htmlContent: string;
    mcqs: {
        question: string;
        options: string[];
        answer: string;
    }[];
    topic?: string;
}

export interface SaveStudyMaterialResponse {
    success: boolean;
    imagePath?: string;
    message?: string;
}

/**
 * Saves study material to Supabase and generates a Mermaid diagram
 * Calls the EduTech workflow which:
 * 1. Generates a Mermaid diagram from the content
 * 2. Uploads the diagram to Supabase Storage
 * 3. Saves all content to the study_materials table
 */
export async function saveStudyMaterial(request: SaveStudyMaterialRequest): Promise<SaveStudyMaterialResponse> {
    const payload = {
        userId: request.userId,
        title: sanitizeText(request.title),
        textContent: sanitizeText(request.textContent),
        htmlContent: request.htmlContent,
        mcqs: request.mcqs,
        topic: request.topic || request.title,
    };

    console.log('Saving study material for user:', request.userId);

    try {
        const response = await fetch(`${WEBHOOK_BASE_URL}/generate-diagram`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Save webhook failed with status: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('Save response:', responseText);

        // The webhook returns the inserted study_materials row
        if (responseText && responseText.trim()) {
            const data = JSON.parse(responseText);
            // Response is an array with the inserted row
            const insertedRow = Array.isArray(data) ? data[0] : data;
            return {
                success: true,
                imagePath: insertedRow?.image_path,
                message: 'Content saved successfully!'
            };
        }

        return {
            success: true,
            message: 'Content saved!'
        };
    } catch (error) {
        console.error('Save study material failed:', error);
        throw error;
    }
}

// Supabase Storage configuration
const SUPABASE_URL = 'https://mpesgdkzwfthszeopavy.supabase.co';
const SUPABASE_STORAGE_BUCKET = 'user-diagrams';

/**
 * Gets the public URL for a diagram from Supabase Storage
 * @param imagePath - The path stored in the database (e.g., "userId/timestamp.mmd")
 * @returns The full URL to the diagram image
 */
export function getDiagramUrl(imagePath: string): string {
    return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/${imagePath}`;
}

/**
 * Fetches a diagram from Supabase Storage
 * Returns the diagram content or null if not found
 */
export async function fetchDiagram(imagePath: string): Promise<string | null> {
    try {
        const url = getDiagramUrl(imagePath);
        console.log('Fetching diagram from:', url);

        const response = await fetch(url);

        if (!response.ok) {
            console.warn('Diagram fetch failed:', response.status);
            return null;
        }

        const content = await response.text();
        return content;
    } catch (error) {
        console.error('Error fetching diagram:', error);
        return null;
    }
}

// Default fallback diagram path (in public folder)
export const DEFAULT_DIAGRAM_PATH = '/default-diagram.svg';
