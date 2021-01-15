// Write your "actions" router here!

const express = require('express');
const Action = require('./actions-model');

const router = express.Router();

const { checkActionId, checkActionBody } = require('../middleware/index');

/*

  - `[GET] /api/actions` sends an array of actions (or an empty array) as the body of the _response_.
  - `[GET] /api/actions/:id` sends an action with the given `id` as the body of the _response_.
  - `[POST] /api/actions` sends the newly created action as the body of the _response_.
  - `[PUT] /api/actions/:id` sends the updated action as the body of the _response_.
  - `[DELETE] /api/actions/:id` sends no _response_ body.

*/

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Internal server error" })
        });
});

router.get('/:id', checkActionId, (req, res) => {
    if (req.action){
        res.status(200).json(req.action)
    } else {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
})

router.post('/', checkActionBody, async (req, res) => {
    // This endpoint is working but still throwing the
    // '.returning() is not supported by sqlite3 and will not have any effect.'
    // error. 
    try {
        const newAction = await Action.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
});

router.put('/:id', checkActionId, checkActionBody, async (req, res) => {
    try {
        const updatedAction = await Action.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
});

router.delete('/:id', checkActionId, async (req, res) => {
    try {
        const deletedAction = await Action.remove(req.params.id);
        res.status(200).json(deletedAction)
    } catch (err) {
        res.status(500).json({ errorMessage: "Internal server error" })
    }
})

module.exports = router;