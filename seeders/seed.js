const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../model/user'); 
const Book = require('../model/book.model'); 
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI; 

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing data');

    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        username: faker.internet.username(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      users.push(await user.save());
    }
    console.log('Seeded users');

    for (let i = 0; i < 10; i++) {
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        userId: faker.helpers.arrayElement(users)._id
      });
      await book.save();
    }
    console.log('Seeded books');

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();