const express = require('express');
let app = express();
var cors = require('cors')
const usersRouter = require('./routers/users')
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/members')
const subscriptionsRouter = require('./routers/subscriptions')

// Connection To Database
require('./configs/database')

app.use(cors())
app.use(express.json())


app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)  




app.listen(4000)