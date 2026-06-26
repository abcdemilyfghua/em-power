require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());

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

app.post('/tasks', async (req, res) => {
    console.log(req.body)
    const { name, deadline, notes } = req.body;
    const { data, error} = await supabase
        .from('tasks')
        .insert({ name, deadline, notes});

    console.log(error)
    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json({
        message: "Task added successfully",
        receivedData: { name, deadline, notes }
    });
});

app.listen(3000, () => {
    console.log('server running on port 3000')
})
