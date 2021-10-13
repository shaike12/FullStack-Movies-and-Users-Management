const usersBL = require('../models/usersBL')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let users = await usersBL.getUsers()
    
    res.json(users)
})

router.get('/:id', async (req, res) => {
    let user = await usersBL.getUserByID(req.params.id)
    
    res.json(user)
})

router.post('/', async (req, res) => {
    let user = await usersBL.addUser(req.body)
    
    res.json(user)
})

router.put('/:id', async (req, res) => {
    let user = await usersBL.updateUser(req.params.id, req.body)
    
    res.json(user)
})

router.delete('/:id', async (req, res) => {
    let user = await usersBL.deleteUser(req.params.id)
    
    res.json(user)
})


module.exports = router