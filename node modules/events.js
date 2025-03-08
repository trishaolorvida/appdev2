const EventEmitter = require('events');
const emitter = new EventEmitter();

// Create a listener
emitter.on('Start', () => {
  console.log('Starting application!');
});

emitter.on('event', (data) => {
    console.log(`Name: ${data.name}`);
  });

emitter.on('event', (data) => {
    console.log(`Age: ${data.age}`);
  });

emitter.on('Close', () => {
    console.log('Application is closed!');
  });

// Trigger the event
emitter.emit ('Start');
emitter.emit('event', { name: "Trisha", age: 20 });
emitter.emit ('Close');
