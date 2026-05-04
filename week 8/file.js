const fs = require('fs');

// 1. Create and write into file
fs.writeFileSync('data.txt', 'Name: Sadhika\nRoll No: 87\nDepartment: IT\n');
console.log('File created and data written successfully');

// 2. Read file content
const data = fs.readFileSync('data.txt', 'utf8');
console.log('\nFile Content:\n' + data);

// 3. Append new data asynchronously
fs.appendFile('data.txt', 'Course: Node.js\n', (err) => {
    if (err) throw err;
    console.log('\nNew data appended successfully');

    // Read again to show updated content
    const updatedData = fs.readFileSync('data.txt', 'utf8');
    console.log('\nUpdated File Content:\n' + updatedData);
});