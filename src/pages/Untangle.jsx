import { useState } from "react"

function Untangle() {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')
    const [tasks, setTasks] = useState([])

    function handleSubmit() {
        setTasks(prevTasks => [...prevTasks, {name:name, time:time, notes:notes}]);
    }

    return (
        <>
            <h1>Untangle</h1>

            <label htmlFor="name">Task Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="time">Deadline to complete:</label>
            <input type="datetime-local" id="time" value={time} onChange={(e) => setTime(e.target.value)} />

            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            
            <button onClick={handleSubmit}>Add Task</button>

            <div>
                {tasks.map((task, index) => <p key={index}>{task.name}, {task.time}, {task.notes}</p>)}
            </div>
        </>
    )
}

export default Untangle