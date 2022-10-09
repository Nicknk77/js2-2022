const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

router.get('/', (req, res) => {
    console.log('get');
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    console.log('post');
    handler(req, res, 'add', 'server/db/userCart.json');
});
router.put('/:id', (req, res) => {
    console.log('put');
    handler(req, res, 'change', 'server/db/userCart.json');
});
router.delete(`/:id/:name`, (req, res) => {
    console.log('remove');
    handler(req, res, 'remove', `server/db/userCart.json`);
});

module.exports = router;