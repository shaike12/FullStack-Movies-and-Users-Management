let express = require('express');
let router = express.Router();
let subscriptionsBL = require('../Models/subscriptionsBL')



router.get('/', async function(req, res){

    let subscriptions = await subscriptionsBL.getAllSubscriptions()
    res.json(subscriptions)
})

router.get('/:id', async function(req, res){

    let subscription = await subscriptionsBL.getSubscriptionByID(req.params.id)
    res.json(subscription)
})

router.post('/', async function(req, res){

    let subscription = await subscriptionsBL.addSubscription(req.body)
    res.json(subscription)
})

router.put('/:id', async function(req, res){

    let subscriptionOld = await subscriptionsBL.updateSubscription(req.params.id, req.body)
    res.json(subscriptionOld)
})

router.delete('/:id', async function(req, res){

    let subscription = await subscriptionsBL.deleteSubscription(req.params.id)
    res.json(subscription)
})

module.exports = router;


