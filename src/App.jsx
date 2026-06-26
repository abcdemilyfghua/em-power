import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Untangle from './pages/Untangle'
import Focus from './pages/Focus'
import Rant from './pages/Rant'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/untangle" element={<Untangle />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/rant" element={<Rant />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
