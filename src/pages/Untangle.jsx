import { useEffect, useState } from "react"
import './Untangle.css'

function Untangle() {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')
    const [tasks, setTasks] = useState([])
    const [emResponse, setEmResponse] = useState('')

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()
            setTasks(data)
        }
        fetchTasks()
    }, [])

    async function handleSubmit() {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, deadline: time, notes: notes })
        })
        setTasks(prevTasks => [...prevTasks, {name, time, notes}])
        setName('')
        setTime('')
        setNotes('')
    }

    async function askEm() {
        const reply = await fetch('http://localhost:3000/prioritize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks: tasks })
        })
        const emReply = await reply.json()
        setEmResponse(emReply)
    }

    return (
        <div className="untangle">
            <h1>Untangle</h1>

            <div className="form-group">
                <label htmlFor="name">Task Name:</label>
                <input className="form-input" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="form-group">
                <label htmlFor="time">Deadline to complete:</label>
                <input className="form-input" type="date" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            
            <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea className="form-input" type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            
            <div className="button-row">
                <button className="btn-primary" onClick={handleSubmit}>Add Task</button>
                <button className="btn-em" onClick={askEm}>Ask Em</button>
            </div>

            <div>
                {tasks.map((task, index) => <p key={index}>{task.name}, {task.deadline}, {task.notes}</p>)}
            </div>

            <div>
                <label>Em's Response:</label>
                {emResponse}
            </div>
        </div>
    )
}

export default Untangle