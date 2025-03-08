const fs = require('fs');

// Append data to an existing file
fs.appendFile('existingfile.txt', '\nAppended text', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
  } else {
    console.log('Data appended successfully!');
  }
});