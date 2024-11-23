const express = require('express');
const { dbConnection } = require('./database/config');
const cors =  require('cors')
const path = require('path')
require('dotenv').config();

// Create server
const app = express()

// DB Connection
dbConnection();

// PORT
const port = process.env.PORT

// CORS
app.use(cors())

//Public Directory
app.use(express.static('public'))

// Read && Parse of Body
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
// Listen Petitions
app.listen(port, () => console.log(`Example app listening on port ${port}!`))