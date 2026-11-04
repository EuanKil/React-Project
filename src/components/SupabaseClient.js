import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.REACT_APP_SUPABASE_URL || 'https://kcorkawxusnhlapyfihh.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_Jh7RqOa5XfX8l0Xl4D7_cQ_W2fwCW_s';

export const supabase = createClient(supabaseURL, supabaseAnonKey);