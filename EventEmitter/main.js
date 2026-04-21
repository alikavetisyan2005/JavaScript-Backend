const CustomEventEmitter = require('./eventEmitter.js');

const emitter = new CustomEventEmitter('MyEmitter');
const listener1 = (data) => {
  console.log('Listener 1 received...', data);
};

const listener2 = (data) => {
  console.log('Listener 2 received...', data);
};

const errorListener = (err) => {
  console.log('Error occurred...', err.message);
};

emitter.on('dataLoaded', listener1);
emitter.on('dataLoaded', listener2);
emitter.on('error', errorListener);

console.log('First emit');
emitter.emit('dataLoaded', { id: 1, name: 'Test Data' });

emitter.emit('error', new Error('Something went wrong'));

emitter.off('dataLoaded', listener2);

console.log('Second emit (after removing listener2) ');
emitter.emit('dataLoaded', { id: 2, name: 'New Data' });