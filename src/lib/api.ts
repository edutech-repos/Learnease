// API service for LearnEase webhook calls

const WEBHOOK_BASE_URL = import.meta.env.VITE_WEBHOOK_BASE_URL || 'https://your-n8n-instance.com/webhook';

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
        htmlContent: `<h2>Generated Content</h2>
<p>This is AI-generated content based on your input about: "${request.rawText.slice(0, 50)}..."</p>
<h3>Key Points</h3>
<ul>
  <li><strong>Point 1:</strong> Important concept extracted from your text</li>
  <li><strong>Point 2:</strong> Another key learning objective</li>
  <li><strong>Point 3:</strong> Critical information to remember</li>
</ul>
<blockquote>Key takeaway: Understanding these concepts is essential for mastery.</blockquote>
<h3>Summary</h3>
<p>This lesson covers the fundamental aspects of the topic you provided.</p>`,
        textContent: `Generated Content

This is AI-generated content based on your input.

Key Points:
- Point 1: Important concept extracted from your text
- Point 2: Another key learning objective
- Point 3: Critical information to remember

Summary:
This lesson covers the fundamental aspects of the topic you provided.`,
        mcqs: [
            {
                question: "What is the main topic of this lesson?",
                options: ["Option A", "Option B", "Option C", "Option D"],
                answer: "Option A"
            },
            {
                question: "Which concept is most important?",
                options: ["Concept 1", "Concept 2", "Concept 3", "Concept 4"],
                answer: "Concept 1"
            }
        ]
    };
}
