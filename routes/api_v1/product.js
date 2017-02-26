var express = require('express');
var router = express.Router();
var ctrl = require('../../controllers/product/ProductController');

/*
 * GET
 */
router.get('/', ctrl.list.bind(ctrl));

/*
 * GET
 */
router.get('/:id', ctrl.show.bind(ctrl));

router.get('/query/:query/:limit?', ctrl.ean_name_search.bind(ctrl));

router.get('/:id/show_children', ctrl.show_children.bind(ctrl));

router.get('/:id_f/add_child/:id_c', ctrl.add_child.bind(ctrl));

router.get('/:id_f/remove_child/:id_c', ctrl.remove_child.bind(ctrl));

/*
 * POST
 */
router.post('/', ctrl.create.bind(ctrl));

/*
    Creates product as barcode and joins it with father
 */
router.post('/:id_f/barcodes/add/',
    ctrl.create_barcode.bind(ctrl),
    ctrl.add_child.bind(ctrl));

router.post('/barcodes/add/',
    ctrl.find_id_father_from_ean.bind(ctrl),
    ctrl.create_barcode.bind(ctrl),
    ctrl.add_child.bind(ctrl));

/*
 * PUT
 */
router.put('/:id', ctrl.update.bind(ctrl));

/*
 * DELETE
 */
router.delete('/:id', ctrl.remove.bind(ctrl));

module.exports = router;
