const express = require('express')
const jwt = require('jsonwebtoken')
const routes = require('./routes/rotas')
const day = require('./middleware/day')
const app = express()

app.use(express.json())
app.use(day)

app.use(routes)

app.listen(3000, () => {
    console.log('Server running in port 3000')
})