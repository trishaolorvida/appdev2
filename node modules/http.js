const http = require('http');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js!');
});

// Listen on port 3000
server.listen(3000, 'localhost', () => {
  console.log('Server running at http://localhost:3000/');
});