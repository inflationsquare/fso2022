import { useState } from 'react'

const Contact = ({name}) => <><li key={name}>{name}</li></>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName}
    setPersons(persons.concat(person))
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={updateName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
    {persons.map(p => <Contact name={p.name}/>)}
      </ul>
      
    </div>
  )
}

export default App
