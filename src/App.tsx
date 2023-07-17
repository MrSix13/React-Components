import { useState } from 'react'
import './App.css'
import PrimaryKeyInput, { Person } from './PrimaryKeyInput'

// interface IPersonaInfo {
//   primaryKey: string;
// }

function App() {
  const [info, setInfo] = useState<Person[] | null>(null)

  console.log('info de app', info)
  return (
    <>
      <h1>Formulario</h1>
      <form action="">
        <PrimaryKeyInput url={'/api/personas/'} setInfo={setInfo} />
        <input type="text" placeholder="nombre" value={info ? info[0]?.name ?? '' : ''} />
        <input type="text" placeholder="status" value={info ? info[0]?.status ?? '' : ''} />
      </form>
    </>
  )
}

export default App
