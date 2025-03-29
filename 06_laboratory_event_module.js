const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
  console.log('Application Started!');
});

eventEmitter.on('data', (data) => {
  console.log('Data received:' + data.name + ' ' + data.age);
});

eventEmitter.on('error', (error) => {
  console.log('Error occured:' + error);
});

eventEmitter.emit('start');

const sampleData = { name: "Trisha", age: 21 };
eventEmitter.emit('data', sampleData);
eventEmitter.emit('error', 'Error Message!');