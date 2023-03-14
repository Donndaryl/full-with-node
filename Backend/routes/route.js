const express = require('express')

const router = express.Router()
const controller = require('../control/route')

router.post('/',controller.CreateThing)
router.put('/:id', controller.UpdateThing);
router.get('/',controller.GetAllThing)
router.get('/:id', controller.GetOneThing);

router.delete('/:id', controller.DeleteThing);

module.exports = router;