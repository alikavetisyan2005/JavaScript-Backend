# CustomEventEmitter

A lightweight implementation of an event-driven system inspired by Node.js’s built-in event emitter.

## Overview

`CustomEventEmitter` is a simple publish–subscribe (pub/sub) utility that allows you to:

* Register event listeners
* Emit events with arguments
* Remove listeners when no longer needed

It’s useful for decoupling parts of your application and enabling communication through events.

---

## Installation

Clone or copy the `CustomEventEmitter.js` file into your project:

```bash
git clone <your-repo-url>
```

Then import it into your script:

```js
const CustomEventEmitter = require('./CustomEventEmitter');
```

---

## Usage

### 1. Create an instance

```js
const emitter = new CustomEventEmitter('MyEmitter');
```

---

### 2. Register listeners

```js
const listener1 = (data) => {
  console.log('Listener 1:', data);
};

const listener2 = (data) => {
  console.log('Listener 2:', data);
};

emitter.on('dataLoaded', listener1);
emitter.on('dataLoaded', listener2);
```

---

### 3. Emit events

```js
emitter.emit('dataLoaded', { id: 1, name: 'Test Data' });
```

Output:

```
Listener 1: { id: 1, name: 'Test Data' }
Listener 2: { id: 1, name: 'Test Data' }
```

---

### 4. Remove a listener

```js
emitter.off('dataLoaded', listener2);
```

Emit again:

```js
emitter.emit('dataLoaded', { id: 2, name: 'New Data' });
```

Output:

```
Listener 1: { id: 2, name: 'New Data' }
```

---

### 5. Handle other events

```js
emitter.on('error', (err) => {
  console.log('Error:', err.message);
});

emitter.emit('error', new Error('Something went wrong'));
```

---

## API

### constructor(name = null)

Creates a new event emitter instance.

* `name` *(optional)*: Identifier for debugging or logging

---

### on(event, listener)

Registers a listener function for a given event.

* `event`: string
* `listener`: function

---

### emit(event, ...args)

Triggers all listeners associated with the event.

* `event`: string
* `...args`: arguments passed to listeners

---

### off(event, listener)

Removes a specific listener from an event.

* `event`: string
* `listener`: function

---

## Internal Design

The emitter stores events in an object:

```js
{
  eventName: [listener1, listener2]
}
```

Each event maps to an array of listener functions, allowing multiple subscribers per event.

---

## Limitations

This is a minimal implementation and does not include:

* `once` (one-time listeners)
* Async listener handling
* Error propagation behavior
* Listener limits or warnings

For a full-featured solution, see Node.js’s built-in event system.

---

## Inspiration

This project is inspired by Node.js’s core event system (EventEmitter), simplified for learning and customization purposes.

---

## License

MIT License
