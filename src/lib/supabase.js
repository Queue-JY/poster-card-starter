import { createClient } from "@supabase/supabase-js";

/* 미리 설정해둔 값입니다. 건드리지 마세요. */
const SUPABASE_URL = "https://bijevqhxxiemyjijitga.supabase.co";
const SUPABASE_KEY = "sb_publishable_DWpeZNloHhFWWsACvBfssw_bPLFiguP";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const isConfigured =
  !SUPABASE_URL.includes("YOUR_PROJECT") && !SUPABASE_KEY.includes("YOUR_");
