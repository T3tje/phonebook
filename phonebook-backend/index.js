const { request } = require('express');
const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json());
app.use(morgan('tiny'))
morgan.token('body', (req,res) => JSON.stringify(req.body))
app.use(morgan(':body'))

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getRandomId = () => {
  let actIds = persons.map(id => id = id.id)
  const randomNumber = Math.floor(Math.random()*3000)
  while (actIds.indexOf(randomNumber) !== -1) {
   randomNumber = Math.floor(Math.random()*3000)
  }
  return randomNumber
}


app.post("/api/persons", (req,res) => {
  const body = req.body 
  
  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (persons.find(person => person.name = body.name)) {
    return res.status(400).json({
      error:'name already exists'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: getRandomId()
  }
  
  persons = persons.concat(person)
  res.json(person)
})

app.get("/", (req, res) => {
  res.send('hello world')
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})