import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Untangle from './pages/Untangle'
import Focus from './pages/Focus'
import Rant from './pages/Rant'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/untangle"> Untangle </Link>
        <Link to="/focus"> Focus </Link>
        <Link to="/rant"> Rant </Link>
      </nav>

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
