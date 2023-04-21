import { useState, useEffect } from 'react'
import personService from './services/persons'

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
      personService
        .create(person)
        .then(createdPerson => {
          personsUpdate(persons.concat(createdPerson))
        })
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

const Numbers = ({persons, filterValue, personsUpdate}) => {return(<>
      <h2>Numbers</h2>
      <ul>
      {persons
        .filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(p => <><Contact name={p.name} number={p.number}/>
          <button onClick={() => {
            return window.confirm("Are you sure?") ? 
            personService
              .removeNumber(p.id)
              .then(() => {
                personsUpdate(persons.filter(x => p.id !== x.id))
              }) : 
            null}}>
            Delete
          </button></>)}
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilter] = useState('')

  useEffect(() => {personService.getAll().then(initialPersons => setPersons(initialPersons))}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} filterUpdate={setFilter}/>
      <PersonForm name={newName} number={newNumber} persons={persons} nameUpdate={setNewName} numberUpdate={setNewNumber} personsUpdate={setPersons}  />
    <Numbers persons={persons} filterValue={filterValue} personsUpdate={setPersons} />
    </div>
  )
}

export default App
