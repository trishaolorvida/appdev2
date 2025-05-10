const express = require('express');
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "The Metamorphosis", author: "Franz Kafka" },
    { id: 2, title: "No Longer Human", author: "Osamu Dazai" },
    { id: 3, title: "The Handmaid's Tale", author: "Margaret Artwood" }
];

app.get('/', (req, res) => {
    res.send("Simple Book API using Node.js and Express");
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found!');
    res.json(book);
});

app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.patch('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found!');

    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;

    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found!');

    books.splice(bookIndex, 1);
    res.send('Book deleted successfully!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
