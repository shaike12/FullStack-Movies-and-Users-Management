const membersBL = require('../models/membersBL')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let members = await membersBL.getMembers()
    
    res.json(members)
})

router.get('/:id', async (req, res) => {
    let member = await membersBL.getMemberByID(req.params.id)
    
    res.json(member)
})

router.post('/', async (req, res) => {
    let member = await membersBL.addMember(req.body)
    
    res.json(member)
})

router.put('/:id', async (req, res) => {
    let member = await membersBL.updateMember(req.params.id, req.body)
    
    res.json(member)
})

router.delete('/:id', async (req, res) => {
    let member = await membersBL.deleteMember(req.params.id)
    
    res.json(member)
})


module.exports = router