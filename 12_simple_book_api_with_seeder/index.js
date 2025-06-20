const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/book.model');
const authRoutes = require('./router/auth');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const sendBookCreatedEmail = require('./middleware/send-email.middleware');

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/books', authMiddleware, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get('/api/books/:id', authMiddleware, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
});

app.post('/api/books', authMiddleware, async (req, res) => {
  const book = new Book(req.body);
  await book.save();

  try {
    await sendBookCreatedEmail(book);
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }

  res.status(201).json(book);
});

app.patch('/api/books/:id', authMiddleware, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json(book);
});

app.delete('/api/books/:id', authMiddleware, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
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

