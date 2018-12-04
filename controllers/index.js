'use strict';

var Book = require('../models/book');

module.exports = router => {
    router.get('/', async (req, res) => {
        var books = await Book.find({});
        res.render('index', { books });
    });
};
