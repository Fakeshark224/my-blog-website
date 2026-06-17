import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Post = {
  id:          string
  title:       string
  content:     string
  category:    string
  author:      string
  excerpt:     string | null
  cover_image: string | null
  created_at:  string
  published:   boolean
}