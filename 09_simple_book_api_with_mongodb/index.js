const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./router/book.router');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/books", bookRouter);

app.get('/', (req, res) => {
    res.status(200).send("Simple Book API using Node.js, Express.js, and MongoDB");
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });