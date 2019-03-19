'use strict'
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Greetings = require('../db/db').Greetings

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (request, response, next) => {
  response.render('index')
})

app.get('/form', (request, response, next) => {
  response.render('form')
})

app.get('/progress', (request, response, next) => {
  response.render('progress')
})

app.post('/team', (request, response, next) => {
  const greeting = {
    pname: request.body.pname,
    age: request.body.age,
    image: request.body.image,
    message: request.body.message
  }
  Greetings.create(greeting, (err, greeting) => {
    if (err) return next(err)
    response.redirect('/team')
  })
})

app.get('/team', (request, response, next) => {
  Greetings.all((err, greetings) => {
    if (err) return next(err)
    response.render('team', {
      greetings: greetings
    })
  })
})

app.get('/team/:id', (request, response, next) => {
  const id = request.params.id
  Greetings.find(id, (err, greeting) => {
    if (err) return next(err)
    response.render('team', {
      greetings: [greeting]
    })
  })
})

app.listen(port, (err) => {
  if (err) return console.error(`An error occurred: ${err}`)
  console.log(`Listening on http://localhost:${port}/`)
})
