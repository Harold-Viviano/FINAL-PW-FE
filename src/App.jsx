import { useState } from 'react'
import './App.css'
import MainBody from './Componentes/MainBody1-2/MainBody.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainBody/>
    </>
  )
}

export default App
