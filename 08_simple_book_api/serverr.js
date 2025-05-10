const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is running  on http://localhost:${PORT}');
});

let books = [];

app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js and Express');
});

app.get('/api/books', (req, res) => {
    res.json(book);
});