import { useState } from 'react'
import Hero from './components/Hero.jsx'
import Wizard from './components/wizard/Wizard.jsx'

function hasPaymentRedirect() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).has('payment')
}

function App() {
  const [started, setStarted] = useState(hasPaymentRedirect)

  return (
    <div className="min-h-screen bg-neutral-50">
      {started ? (
        <Wizard onExit={() => setStarted(false)} />
      ) : (
        <Hero onStart={() => setStarted(true)} />
      )}
    </div>
  )
}

export default App
