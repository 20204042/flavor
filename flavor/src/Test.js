const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, rs) => {
    res.send('Hello World')
})

app.get('/sound/:name', (req, res) => {
    const {name} = req.params
})