const EventEmitter = require('events');
const emitter = new EventEmitter();

// Create a listener
emitter.on('event', () => {
  console.log('Event triggered!');
});

// Trigger the event
emitter.emit('event');