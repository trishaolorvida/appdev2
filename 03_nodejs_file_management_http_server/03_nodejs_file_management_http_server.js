const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

const PORT = 3000;
const eventEmitter = new EventEmitter();

// Event listeners for file operations
eventEmitter.on('fileCreated', (filename) => {
    console.log(`File created: ${filename}`);
});

eventEmitter.on('fileDeleted', (filename) => {
    console.log(`File deleted: ${filename}`);
});

// Create an HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (req.method === 'GET') {
        switch (pathname) {
            case '/read':
                const readFile = parsedUrl.query.filename;
                if (readFile) {
                    const filePath = path.join(__dirname, readFile);
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('File not found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end(data);
                        }
                    });
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Filename query parameter is required');
                }
                break;

            case '/delete':
                const deleteFile = parsedUrl.query.filename;
                if (deleteFile) {
                    const filePath = path.join(__dirname, deleteFile);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('File not found');
                        } else {
                            eventEmitter.emit('fileDeleted', deleteFile);
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('File deleted successfully');
                        }
                    });
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Filename query parameter is required');
                }
                break;

            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Route not found');
                break;
        }
    } else if (req.method === 'POST') {
        switch (pathname) {
            case '/create':
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // Convert Buffer to string
                });
                req.on('end', () => {
                    const { filename, content } = JSON.parse(body);
                    const filePath = path.join(__dirname, filename);
                    fs.writeFile(filePath, content, (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error creating file');
                        } else {
                            eventEmitter.emit('fileCreated', filename);
                            res.writeHead(201, { 'Content-Type': 'text/plain' });
                            res.end('File created successfully');
                        }
                    });
                });
                break;

            case '/update':
                let updateBody = '';
                req.on('data', chunk => {
                    updateBody += chunk.toString(); // Convert Buffer to string
                });
                req.on('end', () => {
                    const { filename, content } = JSON.parse(updateBody);
                    const filePath = path.join(__dirname, filename);
                    fs.appendFile(filePath, content, (err) => {
                        if (err) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('File not found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('File updated successfully');
                        }
                    });
                });
                break;

            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Route not found');
                break;
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});