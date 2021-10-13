let express = require('express');
let router = express.Router();
let membersBL = require('../Models/membersBL')



router.get('/', async function(req, res){

    let members = await membersBL.getAllMembers()
    res.json(members)
})

router.get('/:id', async function(req, res){

    let member = await membersBL.getMemberByID(req.params.id)
    res.json(member)
})

router.post('/', async function(req, res){

    let member = await membersBL.addMember(req.body)
    res.json(member)
})

router.put('/:id', async function(req, res){

    let memberOld = await membersBL.updateMember(req.params.id, req.body)
    res.json(memberOld)
})

router.delete('/:id', async function(req, res){

    let member = await membersBL.deleteMember(req.params.id)
    res.json(member)
})

module.exports = router;


