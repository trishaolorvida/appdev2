const express = require("express");
const app = express();
const PORT = 3000;

const books = [
    {
        id: 1,
        "title": "The Metamorphosis",
        "author": "Franz Kafka"
    },
    {
        id: 2,
        "title":  "The Handmaid's Tale",
        "author": "Margaret Artwood"
    },
    {
        id: 3,
        "title": "No Longer Human",
        "author": "Osamu Dazai"
    }
]

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const bookID = req.params.id;
    const book = books.find(b => b.id === parseInt(bookID, 10));

    if (book) {
        res.json(book);
    } else {
        res.status(404).send("404: Book not found");
    }
});

app.post('/api/books', (req, res)=> {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    }
    books.push(newBook);
      res.status(201).send(`Book added succesfully:\n ${JSON.stringify(newBook)}`)
});

app.patch('/api/books/:id', (req, res) => {
    const { title, author } = req.body;
    const bookID = prasenINT(req.params.id, 10);
    if (title === undefined && author === undefined) {
        res.status(400).send("Input/s is/are required");
    }
    const book = books.find(b => b.id === bookID, 10);
    if (!book) {
        res.status(404).send("404: Book not found");
    }
    if (title !== undefined) {
        book.title = title;
    }
    if (author !== undefined) {
        book.author = author;
    }
    res.status(201).send("Book updated successfully");
});

app.delete('/api/books/:id', (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookID);
    if (bookIndex === -1) {
        return res.status(404).send("404: Book not found");
    }
    books.splice(bookIndex, 1);
    books.forEach((book, index) => {
        book.id = index + 1;
    });
    res.status(200).send('Book Deleted Successfully.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

