import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wgwhuybqrjvdcuujzgxy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnd2h1eWJxcmp2ZGN1dWp6Z3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzODg0MzcsImV4cCI6MjA0MTk2NDQzN30.w-sGuTZOPOV_eapGIoo6lgpH4z2GJA1YeCR9KbnCDVo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
