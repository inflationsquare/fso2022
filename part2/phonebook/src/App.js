import { useState } from 'react'

const Contact = ({name, number}) => <><li key={name}>{name} {number}</li></>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '12345678'},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')

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

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={filterValue} onChange={updateFilter}/></div>
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
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
    {persons.filter(p => p.name.toLowerCase().includes(filterValue)).map(p => <Contact name={p.name} number={p.number}/>)}
      </ul>
      
    </div>
  )
}

export default App
