import { useState } from 'react'

const Contact = ({name, number}) => <><li key={name}>{name} {number}</li></>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12345678'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}
    persons.filter(p => p.name === newName).length > 0 ? 
      alert(`${newName} is already added to phonebook`) :
      setPersons(persons.concat(person))
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={updateName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={updateNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
    {persons.map(p => <Contact name={p.name} number={p.number}/>)}
      </ul>
      
    </div>
  )
}

export default App
