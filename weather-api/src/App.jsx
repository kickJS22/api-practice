import { useState } from 'react'
import './App.css'
import { GetCurrentWeather } from './GetCurrent'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <GetCurrentWeather />
      
    </>
  )
}

export default App
