const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      console.log('File content:', data);
    }
});

fs.writeFile('newfile.txt', 'This is the new file.', (err) => {
    if (err) {
      console.error('Error reading file:', err);
    } else {
      console.log("This is a new file created by Node.js!");
    }
}); 

fs.appendFile('sample.txt', '\nAppended text', (err) => {
    if (err) {
      console.error('Error appending to file:', err);
    } else {
      console.log('Data appended successfully!');
    }
});

fs.unlink('newfile.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    } else {
      console.log('File deleted successfully!');
    }
});
