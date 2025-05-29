const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./router/book.router');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use("/api/books", bookRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req, res) => {
    res.status(200).send("Simple Book API using Node.js, Express.js, and MongoDB");
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err.message)
    });