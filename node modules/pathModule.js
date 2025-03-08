const path = require('path');

// Join paths
const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log('Full path:', fullPath);

// Get file extension
const ext = path.extname(fullPath);
console.log('File extension:', ext);