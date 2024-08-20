
import { createClient } from '@supabase/supabase-js'

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdnpqcnN5dWNlYmhuc2tqZWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMTM2MDUsImV4cCI6MjAzODU4OTYwNX0.BR6E8QonSPUhlTG_I-zEoeGe-V8LDvjn5AQswTtIkEg`
export const supabaseUrl = 'https://cqvzjrsyucebhnskjecr.supabase.co'


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase