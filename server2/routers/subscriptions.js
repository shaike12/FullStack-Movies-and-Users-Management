const subscriptionsBL = require('../models/subscriptionsBL')
const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    let subscriptions = await subscriptionsBL.getSubscriptions()
    
    res.json(subscriptions)
})

router.get('/:id', async (req, res) => {
    let subscription = await subscriptionsBL.getSubscriptionByID(req.params.id)
    
    res.json(subscription)
})

router.post('/', async (req, res) => {
    let subscription = await subscriptionsBL.addSubscription(req.body)
    
    res.json(subscription)
})

router.put('/:id', async (req, res) => {
    let subscription = await subscriptionsBL.updateSubscription(req.params.id, req.body)
    
    res.json(subscription)
})

router.delete('/:id', async (req, res) => {
    let subscription = await subscriptionsBL.deleteSubscription(req.params.id)
    
    res.json(subscription)
})


module.exports = router