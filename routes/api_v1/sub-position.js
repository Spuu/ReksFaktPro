var express = require('express');
var router = express.Router();
var controller = require('../../controllers/sub-position');

/*
 * GET
 */
router.get('/', controller.list);

/*
 * GET
 */
router.get('/:id', controller.show);

// TODO: cos nie tak z sub-posittion query
//router.get('/query/:invoice_id', controller.query);

/*
 * POST
 */
router.post('/', controller.create);

/*
 * PUT
 */
router.put('/:id', controller.update);

/*
 * DELETE
 */
router.delete('/:id', controller.remove);

module.exports = router;