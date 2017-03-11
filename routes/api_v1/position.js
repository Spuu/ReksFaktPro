var express = require('express');
var router = express.Router();
var ctrl = require('../../controllers/position/PositionController');

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

router.get('/query/:product_id/:store_id?', ctrl.search.bind(ctrl));
router.get('/invoice/:invoice_id', ctrl.invoice.bind(ctrl));

module.exports = router;