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
