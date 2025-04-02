const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("The file doesn't exist", err);
        return;
    }
    console.log('Content of sample.txt:', data);

    fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
        if (err) {
            console.error('Error creating newfile.txt:', err);
            return;
        }
        console.log('newfile.txt has been created successfully.');

        fs.appendFile('sample.txt', '\nAppended content.', (err) => {
            if (err) {
                console.error('Error appending to sample.txt:', err);
                return;
            }
            console.log('Content has been appended to sample.txt.');

            fs.unlink('newfile.txt', (err) => {
                if (err) {
                    console.error('Error deleting newfile.txt:', err);
                    return;
                }
                console.log('newfile.txt has been deleted successfully.');
            });
        });
    });
});