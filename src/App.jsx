import { useState } from 'react'
import './App.css'
import TodoList from './Components/TodoList/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
   <TodoList/>
  )
}

export default App
