var express = require('express');
var router = express.Router();
var ctrl = require('../../controllers/store/StoreController');

/*
 * GET
 */
router.get('/', ctrl.list.bind(ctrl));

/*
 * GET
 */
router.get('/:id', ctrl.show.bind(ctrl));

/*
 * POST
 */
router.post('/', ctrl.create.bind(ctrl));

/*
 * PUT
 */
router.put('/:id', ctrl.update.bind(ctrl));

/*
 * DELETE
 */
router.delete('/:id', ctrl.remove.bind(ctrl));

module.exports = router;