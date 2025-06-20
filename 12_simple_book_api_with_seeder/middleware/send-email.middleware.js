const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async function sendBookCreatedEmail(book) {
  const html = pug.renderFile(path.join(__dirname, '../views/bookCreated.pug'), {
    title: book.title,
    author: book.author,
    year: book.year || 'N/A'
  });

  const mailOptions = {
    from: `"Book API" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Book Added',
    html
  };

  await transporter.sendMail(mailOptions);
};