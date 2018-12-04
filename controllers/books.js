'use strict';

var Book = require('../models/book');

module.exports = router => {
    router.get('/details/:id', async (req, res) => {
        var book = await Book.findOne({ _id: req.params.id });
        return res.render('books/details', { book });
    });
};
