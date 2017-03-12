var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'RFP v2.0.1' });
});

router.use('/counterparty', require('./counterparty'));
router.use('/store', require('./store'));
router.use('/position', require('./position'));
router.use('/invoice', require('./invoice'));
router.use('/product', require('./product'));
router.use('/list', require('./list'));
router.use('/substitution', require('./substitution'));
router.use('/category', require('./category'));
router.use('/upload', require('./uploader'));

module.exports = router;
