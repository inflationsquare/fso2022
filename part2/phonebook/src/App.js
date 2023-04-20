import { useState } from 'react'

const Contact = ({name, number}) => <><li key={name}>{name} {number}</li></>

const PersonForm = ({name, number, persons, nameUpdate, numberUpdate, personsUpdate}) => {
  const updateName = (event) => {
    nameUpdate(event.target.value)
  }

  const updateNumber = (event) => {
    numberUpdate(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {name: name, number: number}
    persons.filter(p => p.name === name).length > 0 ? 
      alert(`${name} is already added to phonebook`) :
      personsUpdate(persons.concat(person))
  }

  return(
    <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name: <input value={name} onChange={updateName}/>
        </div>
        <div>
          number: <input value={number} onChange={updateNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>)
}

const Numbers = ({persons, filterValue}) => {return(<>
      <h2>Numbers</h2>
      <ul>
    {persons.filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase())).map(p => <Contact name={p.name} number={p.number}/>)}
      </ul>
  </>)
}

const Filter = ({filterValue, filterUpdate}) => {
  const updateFilter = (event) => {
    filterUpdate(event.target.value)
  }

  return(<div>filter shown with: <input value={filterValue} onChange={updateFilter}/></div>)
}

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} filterUpdate={setFilter}/>
      <PersonForm name={newName} number={newNumber} persons={persons} nameUpdate={setNewName} numberUpdate={setNewNumber} personsUpdate={setPersons}  />
    <Numbers persons={persons} filterValue={filterValue} />
    </div>
  )
}

export default App
