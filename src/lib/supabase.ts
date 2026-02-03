import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Missing Supabase environment variables. Using placeholder values to prevent crash.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
            },
        },
    });
    return { data, error };
};

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
};

// Study Materials CRUD
export const fetchStudyMaterials = async (userId: string) => {
    const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    return { data, error };
};

export const fetchStudyMaterial = async (materialId: string) => {
    const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .eq('id', materialId)
        .single();
    return { data, error };
};

export const createStudyMaterial = async (
    userId: string,
    title: string,
    originalText: string,
    structuredContent: string,
    quizData?: any[]
) => {
    const { data, error } = await supabase
        .from('study_materials')
        .insert({
            user_id: userId,
            title: title,
            original_text: originalText,
            structured_content: structuredContent,
            quiz_data: quizData || null,
        })
        .select()
        .single();
    return { data, error };
};

export const updateQuizResult = async (materialId: string, score: number, quizData?: any[]) => {
    const updatePayload: any = { quiz_score: score };
    if (quizData) {
        updatePayload.quiz_data = quizData;
    }

    const { error } = await supabase
        .from('study_materials')
        .update(updatePayload)
        .eq('id', materialId);
    return { error };
};

// Profile helpers
export const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
};

export const isUserPremium = async (userId: string): Promise<boolean> => {
    const { data } = await fetchUserProfile(userId);
    return data?.is_paid ?? false;
};
