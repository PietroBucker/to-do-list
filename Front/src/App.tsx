import { useEffect, useState } from 'react'
import { TasksResponse } from '../../Back/src/interface'
import Home from './pages/Home'

function App() {
  const [data, setData] = useState<TasksResponse[]>()

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(json => setData(json))

  }, [])
  console.log(data)
  return (
    <>
      <Home />
    </>
  )
}

export default App
