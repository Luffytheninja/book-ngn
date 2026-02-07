import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xk0K3-RDoR6Y7eC_32Eg_xnjkKjvA.supabase.co'; // Placeholder sub-domain based on key
const supabaseAnonKey = 'sb_publishable_R_xk0K3-RDoR6Y7eC_32Eg_xnjkKjvA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
