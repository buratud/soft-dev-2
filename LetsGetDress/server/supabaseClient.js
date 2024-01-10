import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://buhervyilkyrcrruixvq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1aGVydnlpbGt5cmNycnVpeHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MjI0NzUsImV4cCI6MjAxMTM5ODQ3NX0.vl__M1qCPGcj8a00k9znlNhynDEEdKWLuHd6LEL67E0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);