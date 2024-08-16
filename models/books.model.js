const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    description: { type: String }
});

const Book = mongoose.model("300379011-wilson", bookSchema);

module.exports = Book;