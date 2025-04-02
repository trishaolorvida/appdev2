const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/greet') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, welcome to Node.js!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const PORT = 3000;
const HOSTNAME = 'localhost';
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});