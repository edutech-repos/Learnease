// API service for LearnEase webhook calls

const WEBHOOK_BASE_URL = 'https://amrutpatankar.app.n8n.cloud/webhook';

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
    const response = await fetch(`${WEBHOOK_BASE_URL}/unstructured-input`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed: ${response.status} - ${errorText}`);
    }

    const text = await response.text();
    try {
        const data = JSON.parse(text);
        return data as WebhookResponse;
    } catch (e) {
        console.error('Failed to parse webhook response:', text);
        throw new Error(`Invalid response from webhook: ${text.substring(0, 100)}...`);
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
        htmlContent: `# Introduction to Thermodynamics

## The Four Laws

### Zeroth Law
Thermal equilibrium is transitive

### First Law
Energy cannot be created or destroyed
- ΔU = Q - W

### Second Law
Entropy always increases

### Third Law
As T → 0K, entropy → 0

## Applications
- Heat engines
- Refrigeration
- Weather patterns`,
        textContent: `Introduction to Thermodynamics

The Four Laws

Zeroth Law
Thermal equilibrium is transitive

First Law
Energy cannot be created or destroyed
- ΔU = Q - W

Second Law
Entropy always increases

Third Law
As T → 0K, entropy → 0

Applications
- Heat engines
- Refrigeration
- Weather patterns`,
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
