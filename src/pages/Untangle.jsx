import { useState } from "react"

function Untangle() {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')

    return (
        <>
            <h1>Untangle</h1>

            <label htmlFor="name">Task Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="time">Deadline to complete:</label>
            <input type="datetime-local" id="time" value={time} onChange={(e) => setTime(e.target.value)} />

            <label htmlFor="notes">Notes:</label>
            <textarea type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </>
    )
}

export default Untangle