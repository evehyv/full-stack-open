import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [personsList, setPersonsList] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { 
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      const updatedPersons = persons.concat(personObject)
      updatePersonsList(updatedPersons)
      setPersons(updatedPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
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
      <Persons personsList={personsList} />
    </>
  )
}

export default App