const fs = require('fs');

// Delete a file
fs.unlink('newfile.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
  } else {
    console.log('File deleted successfully!');
  }
});