import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [personsList, setPersonsList] = useState([])
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setPersonsList(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const updatedSearchFilter = event.target.value
    const filteredPersonsList = persons.filter(person => person.name.toLowerCase().includes(updatedSearchFilter.toLowerCase()))
    setSearchFilter(updatedSearchFilter)
    setPersonsList(filteredPersonsList)
  }

  const updatePersonsList = (updatedPersons) => {
    const filteredPersonsList = updatedPersons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))
    setPersonsList(filteredPersonsList)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.some(person => person.name === newName)

    if (personExists) {
      const updateConfirmed = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      
      if (updateConfirmed) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(response => {
            setMessageColor('green')
            setMessage(
              `Updated the number for ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            const updatedPersons = persons.map(person => person.id !== changedPerson.id ? person : response.data)
            updatePersonsList(updatedPersons)
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessageColor('red')

            if (error.response.status === 404) {
              setMessage(
                `Information of ${newName} has already been removed from server`
              )
              const updatedPersons = persons.filter(person => person.id !== changedPerson.id)
              updatePersonsList(updatedPersons)
              setPersons(updatedPersons)
            } else {
              setMessage('Oops... Looks like something went wrong.')
            }
            
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = { 
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          setMessageColor('green')
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          const updatedPersons = persons.concat(response.data)
          updatePersonsList(updatedPersons)
          setPersons(updatedPersons)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (id) => {
    const deleteConfirmed = confirm(`Delete ${persons.find(person => person.id === id).name} ?`)
    if (deleteConfirmed) {
      personService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id)
          updatePersonsList(updatedPersons)
          setPersons(updatedPersons)
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} color={messageColor} />
      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsList={personsList} removePerson={removePerson} />
    </>
  )
}

export default App