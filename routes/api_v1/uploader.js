const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const config = require('./../../config');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.uploads_dir);
    },
    filename: function (req, file, cb) {
        req.file = file;
        let date = new Date();
        let dateStr = date.toISOString().slice(0, 19).replace(/[-T:]/g,'');
        cb(null, dateStr + '_' + file.originalname);
    }
});

var upload = multer({storage: storage}).array('invoice');

router.post('/', function(req, res, next) {
    upload(req, res, function(err) {
        if(err) return next(err);
        res.json(req.file);
    })
});

router.get('/list', (req, res) => {
    fs.readdir(config.uploads_dir, (err, files) => {
        let retFiles = [];
        files.forEach(file => {

            var stats = fs.statSync(path.format({
                dir: config.uploads_dir,
                base: file
            }));

            var mtime = new Date(stats.mtime);

            retFiles.push({ name: file, date: mtime });
        });
        res.json(retFiles);
    })
});

router.get('/content/csv/:filename', (req, res, next) => {
    const pathToFile = path.format({
        dir: config.uploads_dir,
        name: req.params.filename,
        ext: '.csv'
    });

    let data = [];

    csv()
        .fromFile(pathToFile)
        .on('json', (json) => {
            data.push(json);
        })
        .on('done', (error) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
            }
        })
});

router.delete('/csv/:filename', (req, res, next) => {
    const pathToFile = path.format({
        dir: config.uploads_dir,
        name: req.params.filename,
        ext: '.csv'
    });

    fs.unlink(pathToFile, (err) => {
        if (err) return next(err);
        res.json();
    });
});

module.exports = router;