var express = require('express');
var _ = require('underscore');
var router = express.Router();
var controller = require('../../controllers/cpty');

_.bindAll(controller, 'list', 'show', 'create', 'update', 'remove');

/*
 * GET
 */
router.get('/', controller.list);

/*
 * GET
 */
router.get('/:id', controller.show);

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