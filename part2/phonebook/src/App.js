import { useState, useEffect } from 'react'
import personService from './services/persons'

const Contact = ({name, number}) => <><li key={name}>{name} {number}</li></>

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='info'>
        {message}
      </div>
    )
  }

const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

const PersonForm = ({name, number, persons, nameUpdate, numberUpdate, personsUpdate, filterValue, notificationUpdater, errorUpdater}) => {
  const updateName = (event) => {
    nameUpdate(event.target.value)
  }

  const updateNumber = (event) => {
    numberUpdate(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {name: name, number: number}
    const confirmChange = (id, newData) => window.confirm(`${person.name} already exists, replace number?`) ? 
            personService
              .update(id, newData)
              .then(() => {
                notificationUpdater(`${newData.name}'s number has been changed`)
                setTimeout(() => {notificationUpdater(null)}, 3000)
                personsUpdate(
                  persons
                    .filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
                    .map(p => p.id === id ? {...p, number: number} : p)
                  )
              })
              .catch(() => {
                errorUpdater(`Information about ${person.name} has already been deleted from the server`)
                setTimeout(() => {errorUpdater(null)}, 3000)
                personsUpdate(
                  persons
                    .filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
                    .filter(p => p.id !== id)
                  )
              }
                ) : null

    const existingPerson = persons.filter(p => p.name === name)

    existingPerson.length > 0 ? confirmChange(existingPerson[0].id, person) :
      personService
        .create(person)
        .then(createdPerson => {
          notificationUpdater(`${createdPerson.name}'s number has been added`)
          setTimeout(() => {notificationUpdater(null)}, 3000)
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

const Numbers = ({persons, filterValue, personsUpdate, notificationUpdater, errorUpdater}) => {return(<>
      <h2>Numbers</h2>
      <ul>
      {persons
        .filter(p => p.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(p => <><Contact name={p.name} number={p.number}/>
          <button onClick={() => {
            return window.confirm("Are you sure you want to delete this number?") ? 
            personService
              .removeNumber(p.id)
              .then(() => {
                notificationUpdater(`${p.name}'s number has been deleted`)
                setTimeout(() => {notificationUpdater(null)}, 3000)
                personsUpdate(persons.filter(x => p.id !== x.id))
              })
              .catch(() => {
                errorUpdater(`Information about ${p.name} has already been deleted from the server`)
                setTimeout(() => {errorUpdater(null)}, 3000)
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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {personService.getAll().then(initialPersons => setPersons(initialPersons))}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}></Notification>
      <ErrorNotification message={errorMessage}></ErrorNotification>
      <Filter filterValue={filterValue} filterUpdate={setFilter}/>
      <PersonForm 
        name={newName} 
        number={newNumber} 
        persons={persons} 
        nameUpdate={setNewName} 
        numberUpdate={setNewNumber} 
        personsUpdate={setPersons} 
        filterValue={filterValue} 
        notificationUpdater={setNotificationMessage} 
        errorUpdater={setErrorMessage}/>
    <Numbers 
      persons={persons} 
      filterValue={filterValue} 
      personsUpdate={setPersons} 
      notificationUpdater={setNotificationMessage}
      errorUpdater={setErrorMessage}/>
    </div>
  )
}

export default App
