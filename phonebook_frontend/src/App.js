import React, { useEffect, useState } from 'react'
import numberService from './services/numbers'
import List from './components/List'
import Form from './components/Form'
import Filterinput from './components/Filterinput'
import ConfirmMsg from './components/ComfirmMsg'
import ErrMsg from './components/ErrMsg'

const App = () => {

//State
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confirmationMsg, setConfirmationMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  
//Effect
useEffect(() =>{
  numberService.addAll()
    .then(returnedObject => {
      setPersons(returnedObject)
    })
}, [])

//Eventhandlers
  const handleInputChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  
  const addName = (event) => {
    event.preventDefault()
       
    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
       numberService.updateNumber(person.id, newPersonObject)
        .then( returnedObject =>
          setPersons(persons.map(entry => entry.id !== person.id ? entry : returnedObject))
        )
        .then(
          setConfirmationMsg(`${newName}'s number was successfully updated`)
        )
        .then(setTimeout(() => {
          setConfirmationMsg(null)
        }, 4000))
        
        .catch(error => {
          setConfirmationMsg(null)
          setErrorMsg(`${person.name} was already removed from server`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 4000)
        })
      }
    } else {
    numberService.addNumber(newPersonObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setConfirmationMsg(`${newName}'s number was successfully added`)
        setTimeout(() => {
          setConfirmationMsg(null)
        }, 4000)
      })
    }
    setNewName("")
    setNewNumber("")
    
   }
  const handleDelete = (id,name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      numberService.delNumber(id)
      setPersons(persons.filter(person => person.id !== id))
      setConfirmationMsg(`${name} was successfully deleted from phonebook`)
      setTimeout(() => {
        setConfirmationMsg(null)
      }, 4000)
    }
  }

//render App
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrMsg msg={errorMsg}/>
      <ConfirmMsg msg={confirmationMsg}/>
      <Filterinput filter={filter} handleFilter={handleFilter}/>
      <Form addName={addName} newName={newName} handleInputChange={handleInputChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <List persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App