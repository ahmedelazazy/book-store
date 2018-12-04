'use strict';

var Book = require('../models/book');

module.exports = router => {
    router.get('/about', async (req, res) => {
        res.render('pages/about');
    });
};
