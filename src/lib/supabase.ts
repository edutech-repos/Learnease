import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Please check your .env file.');
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
    quizData?: any[],
    mermaidCode?: string
) => {
    const { data, error } = await supabase
        .from('study_materials')
        .insert({
            user_id: userId,
            title,
            original_text: originalText,
            structured_content: structuredContent,
            quiz_data: quizData || null,
            mermaid_code: mermaidCode || null,
        })
        .select()
        .single();
    return { data, error };
};

export const updateQuizScore = async (materialId: string, score: number) => {
    const { error } = await supabase
        .from('study_materials')
        .update({ quiz_score: score })
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
