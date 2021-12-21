import React from 'react'

const List = ({persons, filter, handleDelete}) => {
  
    const filterRegex = new RegExp(filter,"i")
    const filteredArray = persons.filter((person) => filterRegex.test(person.name)) 
    return(
      <>
        <h2>Numbers</h2>
        {filteredArray.map((person) => 
        <React.Fragment key={person.name}>
          <ul>   
            <li>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>
          </ul> 
        </React.Fragment>)}
      </>
    )
  }

export default List