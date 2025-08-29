
import { createClient } from '@supabase/supabase-js'

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzYWlxYXlqbHphZ2R1dXNwbGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0NTk2NzcsImV4cCI6MjA3MjAzNTY3N30.mGdoaG63hGhHZ7HoYJhJPids4jlWk_Id2sMx6tJhr84`
export const supabaseUrl = `https://bsaiqayjlzagduusplha.supabase.co`


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase