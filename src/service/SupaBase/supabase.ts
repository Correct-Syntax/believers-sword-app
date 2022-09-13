import { createClient } from "@supabase/supabase-js";

const isDevelopment = process.env.NODE_ENV !== "production";
const supabaseUrl = isDevelopment ? process.env.VUE_APP_SUPABASE_TEST_URL : process.env.VUE_APP_SUPABASE_PROD_URL;
const supabaseAnonKey = isDevelopment
    ? process.env.VUE_APP_SUPABASE_ANON_TEST_KEY
    : process.env.VUE_APP_SUPABASE_ANON_PROD_KEY;

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);
