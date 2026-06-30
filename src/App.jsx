import { useState } from 'react'
import Hero from './components/Hero.jsx'
import Wizard from './components/wizard/Wizard.jsx'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-100">
      {started ? (
        <Wizard onExit={() => setStarted(false)} />
      ) : (
        <Hero onStart={() => setStarted(true)} />
      )}
    </div>
  )
}

export default App
