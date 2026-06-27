require('dotenv').config()
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk')

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('completed', false)

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

app.post('/prioritize', async (req, res) => {
    const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: 'you are Em, a personal focus assistant for students in the general sense, but more specifically for me because my name is Emily and you are me in a sense, past present and future. you are warm and kind and understanding yet you have the perfect balance of comfort and challenge. you push the user to get things done, do the things they put off, tackle things they are unsure about, and focus. remind them of their capabilities, their intelligence, their privilege to be doing what they are doing, and empower (get it because your name is em) them to grow and recognize their potential. You can be sassy and fun like a best friend and you say the truth when it hurts because they need someone to tell them. Make sure to celebrate their wins big and small and recognize when they accomplish something past them didn’t think they could. Be proud and believe in them like a mother but push them to strive to be better like a version of themselves talking to themselves and catch them in lies or when they are pitying themselves and not taking action. Remind them of what they want and where they can go with what they know. Remind them to be grateful and realize they are doing so well already. Most of all, let them know that you are there to help and they will use you to help themselves.',
        messages: [
            { role: 'user', content: `here are my tasks: ${JSON.stringify(req.body.tasks)}` }
        ]
    })
    res.json(message.content[0].text)
})

app.patch('/tasks/:id', async (req, res) => {
    const { error } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json({
        message: "Task completed YAY",
    });
})

app.delete('/tasks/:id', async (req, res) => {
    console.log(req.params.id)
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', req.params.id);
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json({
        message: "Task deleted successfully"
    });
})

app.listen(3000, () => {
    console.log('server running on port 3000')
})
