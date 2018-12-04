'use strict';

var Book = require('../models/book');
var Category = require('../models/category');

module.exports = router => {
    //admin dashboard
    router.get('/', async (req, res) => {
        res.render('admin/index');
    });

    /********************/
    //Books
    /********************/

    //list books
    router.get('/books', async (req, res) => {
        var books = await Book.find({});
        res.render('admin/books/index', { books });
    });

    //add book - GET
    router.get('/books/add/', async (req, res) => {
        var categories = await Category.find({});
        res.render('admin/books/add', { categories });
    });

    //add book - POST
    router.post('/books/add', async (req, res) => {
        var book = {
            title: req.body.title || null,
            category: req.body.category || null,
            publisher: req.body.publisher || null,
            author: req.body.author || null,
            price: req.body.price || null,
            cover: req.body.cover || null,
            description: req.body.description || null
        };
        let tobeAdded = new Book(book);
        let result = await tobeAdded.save();
        res.redirect('/admin/books');
    });

    //edit book - GET
    router.get('/books/edit/:id', async (req, res) => {
        var categories = await Category.find({});
        var book = await Book.findOne({ _id: req.params.id });
        res.render('admin/books/edit', { book, categories });
    });

    //edit book - POST
    router.post('/books/edit/:id', async (req, res) => {
        var newBook = {
            title: req.body.title || null,
            category: req.body.category || null,
            publisher: req.body.publisher || null,
            author: req.body.author || null,
            price: req.body.price || null,
            cover: req.body.cover || null,
            description: req.body.description || null
        };
        var result = await Book.update({ _id: req.params.id }, newBook);
        console.log(result);
        res.redirect('/admin/books');
    });

    //delete book - POST
    router.post('/books/delete/:id', async (req, res) => {
        var result = await Book.remove({ _id: req.params.id });
        res.redirect('/admin/books');
    });

    /********************/
    //Categories
    /********************/

    //list Categories
    router.get('/categories', async (req, res) => {
        var categories = await Category.find({});
        res.render('admin/categories/index', { categories });
    });

    //add Categories - GET
    router.get('/categories/add/', async (req, res) => {
        res.render('admin/categories/add');
    });

    //add Categories - POST
    router.post('/categories/add', async (req, res) => {
        var category = {
            title: req.body.title || null
        };
        let tobeAdded = new Category(category);
        let result = await tobeAdded.save();
        res.redirect('/admin/categories');
    });

    //edit Categories - GET
    router.get('/categories/edit/:id', async (req, res) => {
        var category = await Category.findOne({ _id: req.params.id });
        res.render('admin/categories/edit', { category });
    });

    //edit Categories - POST
    router.post('/categories/edit/:id', async (req, res) => {
        var newCategory = {
            title: req.body.title || null
        };
        var result = await Category.update({ _id: req.params.id }, newCategory);
        console.log(result);
        res.redirect('/admin/categories');
    });

    //delete Categories - POST
    router.post('/categories/delete/:id', async (req, res) => {
        var result = await Category.remove({ _id: req.params.id });
        res.redirect('/admin/categories');
    });
};
