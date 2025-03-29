const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

//listener 1
eventEmitter.on('start', () => {
  console.log('Application Started!');
});

//listener 2
eventEmitter.on('data', (data) => {
  console.log('Data received:' + data.name + ', ' + data.age);
});

//error
eventEmitter.on('error', (error) => {
  console.log('Error occured:' + error);
});

eventEmitter.emit('start');

const sampleData = { name: "John Doe", age: 25 };
eventEmitter.emit('data', sampleData);
eventEmitter.emit('error', 'Error Message!');