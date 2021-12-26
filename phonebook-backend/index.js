require('dotenv').config()
const { request } = require('express');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./modules/phonedb.js')

app.use(express.static('build'))
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'))
morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':body'))

const getRandomId = () => {
  let actIds = persons.map(id => id = id.id)
  const randomNumber = Math.floor(Math.random()*3000)
  while (actIds.indexOf(randomNumber) !== -1) {
   randomNumber = Math.floor(Math.random()*3000)
  }
  return randomNumber
}
let persons = []
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(result => {
      persons = result
      console.log(persons);
      res.json(persons)
    }) 
})

app.post("/api/persons", (req,res) => {
  const body = req.body 
  
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (persons.find(person => person.name === body.name)) {
    
    return res.status(400).json({
      error:'name already exists'
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save()
    .then(savedPerson => {
      persons.concat(savedPerson)
      res.json(savedPerson)
    })
  
})



app.get("/info", (req, res) => {
    const length = persons.length;
    const date = new Date();
    res.status(200).send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`)
})

app.get("/api/persons/:id", (req,res)=> {
    const id = Number(req.params.id);
    const note = persons.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id",(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(202).send(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})