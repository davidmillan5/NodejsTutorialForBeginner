const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// Initialize object

const myEmitter = new MyEmitter();

// add listener for the log event

myEmitter.on('log', (message) => {
  logEvents(message);
});

setTimeout(() => {
  // Emit Event
  myEmitter.emit('log', 'Log event emitted!');
}, 2000);
