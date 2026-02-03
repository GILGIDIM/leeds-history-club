import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pdxnfytciduyihqiphkz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkeG5meXRjaWR1eWlocWlwaGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMjE0NDgsImV4cCI6MjA4NTY5NzQ0OH0.P83SZ5VgPGbebMjG0GtNrumViBg3cxerjHiGuygBPLA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
