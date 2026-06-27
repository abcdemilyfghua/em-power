import { useState } from "react"

function Rant() {
    const [rant, setRant] = useState('')

    async function handleSubmit() {
        await fetch('http://localhost:3000/rants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rant: rant })
        })
        setRant('')
    }

    return (
        <div className="rant">
            <h1>Rant</h1>
                <textarea type="text" id="rant" value={rant} onChange={(e) => setRant(e.target.value)} />
                <button className="btn-primary" onClick={handleSubmit}>Bye bad thoughts!</button>
        </div>
    )
}

export default Rant