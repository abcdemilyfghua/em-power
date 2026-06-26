require('dotenv').config()

const express = require('express')
const app = express()

const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
})

app.listen(3000, () => {
    console.log('server running on port 3000')
})
