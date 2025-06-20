const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter book title.."],
            trim: true
        },
        author: {
            type: String,
            required: [true, "Enter book author.."],
            trim: true
        },
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;