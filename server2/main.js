const express = require('express');
let app = express();
const usersRouter = require('./routers/users')
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/members')

// Connection To Database
require('./configs/database')

app.use(express.json())


app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)

app.listen(4000)