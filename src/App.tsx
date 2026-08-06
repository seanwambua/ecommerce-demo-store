import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="justify-center items-center flex flex-col min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Welcome to Vite + React</h1>
    </div>
  )
}

export default App
