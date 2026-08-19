import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ModelHealthPanel from './components/ModelHealthPanel'
import Pipeline from './components/Pipeline'
import Honest from './components/Honest'
import CtaFooter from './components/CtaFooter'
import EasterEgg from './components/EasterEgg'

function App() {
  useEffect(() => {
    console.log(
      '%cdriftline',
      'color:#5EEAD4;font-family:monospace;font-size:16px;font-weight:bold;'
    )
    console.log(
      '%cchecking the console on a job application, nice. try ↑ ↑ ↓ ↓ ← → ← → b a on the page.',
      'color:#8A97A6;font-family:monospace;font-size:12px;'
    )
  }, [])

  return (
    <div className="min-h-screen bg-ink">
      <Nav />
      <main>
        <Hero />
        <ModelHealthPanel />
        <Pipeline />
        <Honest />
        <CtaFooter />
      </main>
      <EasterEgg />
    </div>
  )
}

export default App
