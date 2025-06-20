const Book = require('../model/book.model');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json({ success: true, book: books })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({success: false, message: "Book not found"});
        res.status(200).json({success: true, book: book });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message});
    }
};

const createBook = async (req, res) => {
    try {
        await Book.create(req.body);
        res.status(200).json({ success: true, message: "Book successfully added"});

    } catch (err) {
        res.status(500).json({ success: false, message: err.message})
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) return res.status(404).json({success: false, message: "Book not found"});
        //Create output for successfull update of book
        const updatedBook = await Book.findById(id);
        res.status(200).json({success: true, message: `Book updated: ${updatedBook}` });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({success: false, message: err.message});
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).json({success: false, message: "Book not found"});
        res.status(200).json({success: true, message: `Book ID#${id} successfully deleted!`});
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}