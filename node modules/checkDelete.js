const fs = require('fs');

// Check if the file exists before deleting
fs.access('newfile.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.error('File does not exist!');
  } else {
    // File exists, proceed to delete
    fs.unlink('newfile.txt', (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully!');
      }
    });
  }
});