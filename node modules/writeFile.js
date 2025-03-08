const fs = require('fs');

// Create or overwrite a file
fs.writeFile('newfile.txt', 'Hello, this is a new file!', (err) => {
  if (err) {
    console.error('Error creating file:', err);
  } else {
    console.log('File created and data written successfully!');
  }
});