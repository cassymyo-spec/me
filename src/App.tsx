import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Talks from './pages/Talks'
import TalkDetail from './pages/TalkDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/talks/:slug" element={<TalkDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
