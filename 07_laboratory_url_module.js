const url = require('url');

const myUrl = 'http://www.example.com:8080/pathname?name=JohnDoe#fragment';
const parsedUrl = url.parse(myUrl, true);

console.log(parsedUrl);
console.log('Query name:', parsedUrl.query.name);
