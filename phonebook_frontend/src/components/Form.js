import React from "react";

const Form = ({addName, newName, handleInputChange, newNumber, handleNumberChange}) => {
    return (
      <form onSubmit={addName}>
      <div>
        <h2>add new</h2>
        name: <input value={newName} onChange={handleInputChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default Form
