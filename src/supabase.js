import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.REACT_APP_DATABASE_URL, process.env.REACT_APP_DATABASE_SERVICE_ROLE_KEY);
