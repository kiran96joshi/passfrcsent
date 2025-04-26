// scripts/seed.mjs  –  plain JavaScript / ESM
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });                       // loads .env.local / .env automatically

// 1) fetch env-vars (no TypeScript bang)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON;
if (!url || !key) {
  console.error('❌  Supabase env vars missing');
  process.exit(1);
}

const supabase = createClient(url, key);

// 2) read JSON
const raw = readFileSync('data/seed.json', 'utf8');
const questions = JSON.parse(raw);

// 3) insert in batches
(async () => {
  const batch = 500;
  for (let i = 0; i < questions.length; i += batch) {
    const slice = questions.slice(i, i + batch);
    const { error } = await supabase.from('questions').insert(slice);
    if (error) {
      console.error('❌  Insert failed:', error);
      process.exit(1);
    }
    console.log(`Inserted rows ${i + 1}-${i + slice.length}`);
  }
  console.log('Done ✅');
  process.exit(0);
})();
