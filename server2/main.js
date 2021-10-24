const express = require('express');
let app = express();
var cors = require('cors')
const usersRouter = require('./routers/users')
const moviesRouter = require('./routers/movies')
const membersRouter = require('./routers/members')
const subscriptionsRouter = require('./routers/subscriptions')
const authRouter = require('./routers/auth')

// Connection To Database
require('./configs/database')
app.use(cors())
app.use(express.json())


app.use('/api/users', usersRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)  
app.use('/api/auth', authRouter) 




app.listen(4000)