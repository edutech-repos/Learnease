// Database types based on supabase.md schema

export interface StudyMaterial {
    id: string;
    user_id: string;
    title: string;
    original_text: string | null;
    structured_content: string | null;
    quiz_data: QuizQuestion[] | null;
    quiz_score: number;
    image_path: string | null;
    created_at: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: string;
}

export interface Profile {
    id: string;
    email: string;
    is_paid: boolean;
}

export type UserType = 'premium' | 'free';
