const router = require('express').Router();
const Book = require('../models/books.model');

router.route("/").get((req, res) => {
    Book.find()
        .then((books) => res.json(books))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    const { id } = req.params;
    Book.findById(id)
        .then((book) => res.json(book))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
    console.log(req.body.bookTitle);
    const { bookTitle, bookAuthor, description } = req.body;
    const book = new Book({ bookTitle, bookAuthor, description });
    book.save()
        .then(() => {
            console.log(`Created book: ${book}`);
            res.status(200).json(book);
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
    const { id } = req.params;
    const { bookTitle, bookAuthor, description } = req.body;
    Book.findById(id)
        .then((book) => {
            book.bookTitle = bookTitle;
            book.bookAuthor = bookAuthor;
            book.description = description;
            book.save()
                .then(() => {
                    console.log(`Updated book ${id}: ${book}`);
                    res.status(200).json(book);
                })
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    const { id } = req.params;
    Book.findByIdAndDelete(id)
        .then((book) => {
            console.log(`Deleted book ${id}: ${book}`);
            res.status(200).json(book);
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;