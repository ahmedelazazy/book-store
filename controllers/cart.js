'use strict';

var Book = require('../models/book');

module.exports = router => {
    router.get('/', async (req, res) => {
        let cart = req.session.cart || {};

        let displayCart = { books: [], total: 0 };
        let total = 0;

        if (cart) {
            for (let item in cart) {
                displayCart.books.push(cart[item]);
                total += cart[item].price * cart[item].qty;
            }
            displayCart.total = total;
        }

        res.render('cart/index', { cart: displayCart });
    });

    router.get('/add/:id', async (req, res) => {
        let cart = req.session.cart || {};
        let bookId = req.params.id;

        let book = await Book.findOne({ _id: bookId });

        if (!book) {
            return res.redirect('/');
        }

        if (cart[bookId]) {
            cart[bookId].qty += 1;
        } else {
            cart[bookId] = {
                id: book.id,
                title: book.title,
                price: book.price,
                qty: 1
            };
        }
        req.session.cart = cart;
        res.redirect('/cart');
    });

    router.get('/remove', async (req, res) => {
        req.session.cart = {};
        res.redirect('/');
    });
};
