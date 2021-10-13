const express = require('express');
let moviesRouter = require('./routers/movies')
let membersRouter = require('./routers/members')
let subscriptionsRouter = require('./routers/subscriptions')
let app = express();

// Connection To Database
require('./configs/database')

app.use(express.json())

app.use('/api/movies', moviesRouter)
app.use('/api/members', membersRouter)
app.use('/api/subscriptions', subscriptionsRouter)

app.listen(3000)