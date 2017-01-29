var express = require('express');
var router = express.Router();
var path = require('path');

/**
 * Back-end API
 */
router.use('/api', require('./api_v1'));

/**
 * Rest are left for placeholder
 */
router.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
