---
description: This chapter will introduce the most important concepts of Node.js.
title: 01 - Crash Course Node.js
---

# Chapter 01 - Crash Course Node.js

## About Node.js

* Good video: [Node.js Tutorial For Absolute Beginners by Traversy Media](https://www.youtube.com/watch?v=U8XF6AFGqlc)
* Playground for JS: [Playcode.io](https://playcode.io/)

### What is Node.js

* Open source server environment
* Free
* Runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
* Uses JavaScript on the server

Node isn't a silver bullet, it's not always the best solution for every project.

### Before Node.js

* WebApps are written in client/server model
* Client requests file from server
* Server gets file from filesystem and returns it (needs to wait), then closes connection
* Ready for new connection

#### What about multiple clients

* Threads
  * Allows for running multiple operations concurrently
  * Threads need memory
  * Eventually maxes out and requires waiting

### Here came Node.js

* Client requests file from server
* Node.js requests the file from the file system but doesn't wait
* Ready to handle the next request.
  * Can handle tens of thousands of connections
* When the file system has opened and read the file, the server is notified and it returns the content to the client.

## Use cases

* REST APIs
* Backend Apps
* Real-time services (chats, games, ...)
* Blogs, CMS, Social Apps
* Command line tools and Utilities
* Mainly things that are not CPU-intensive

## Creating Apps

* Create a folder
* `npm init` to setup a `package.json` file
* Create entry point for example `server.js` and add `console.log("Hello World!")`

## Basic WebApps

* Writing web apps with Node involves writing event handlers
  * Functions that get called when certain Node events occur.

### http server

Run using `npm start` (if script is configured) or `node server.js`.

```js
const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
   response.writeHead(200, {'Content-Type':'text/plain'});
   response.write('Hello world');
   response.end();
});

server.listen(3000, () => {
  console.log('Node server created at port 3000');
});
```

Check it out using your browser at [http://localhost:3000](http://localhost:3000).

### Callbacks everywhere

* Functions that respond to events
* Node.js is a single threaded environments
* Almost everything works with callbacks
  * Better get used to it

### Routing

* Serving different routes

```js
const http = require('http');
const url = require('url');

const server = http.createServer();

const set_response = (response, content) => {
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write(content);
}

server.on('request', (request,response) => {
  let path = url.parse(request.url).pathname;
  console.log(path);

  if (path === '/') {
    set_response(response, 'Hello world');
  } else if (path === '/about') {
    set_response(response, 'Created by VIVES peoples');
  } else {
    response.writeHead(404, {'Content-Type':'text/plain'});
    response.write('Error page');
  }
  response.end();
});

server.listen(3000, () => {
  console.log('Node server created at port 3000');
});
```

* Routes:
  * [http://localhost:3000](http://localhost:3000)
  * [http://localhost:3000/about](http://localhost:3000/about)

* url package breaks up the URL

![URL parts](./img/url_parts.png)

* Fun to do, but nobody does it like this

### Express Routing

* Use a framework such as Express for building APIs and such
* Install using `npm install express --save`

```js
const express = require('express');
const app = express();
const PORT = 3000;

//Basic routes
app.get('/', (request,response) => {
   response.send('Hello World');
});

app.get('/about',(request,response) => {
   response.send('This app was made by VIVES peoples');
});

//Express error handling middleware
app.use((request,response) => {
   response.type('text/plain');
   response.status(505);
   response.send('Error page');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
```

## Variable declaration

* `var x = 13` or `let y = 23`
* Both used for variable declaration in JS
* Difference between them is that `var` is function scoped and `let` is block scoped.
* You'll just want to use `let` but lots of code still uses `var` 

```js
console.log(x);
var x = 5;
console.log(x);
```

:::codeoutput
<pre>
undefined
5
</pre>
```
:::

```js
console.log(x);
let x = 5;
console.log(x);
```

:::codeoutput
<pre>
...
ReferenceError: Cannot access 'x' before initialization
...
</pre>
:::

## Interval and TimeOut

* Timeout
  * Call a function after number of milliseconds

```js
setTimeout(() => {
  console.log("!")
}, 1000);
```

* Interval
  * Call a function every number of milliseconds

```js
setInterval(() => {
  console.log("!")
}, 1000);
```

## Classes

* No private fields/methods
* `constructor`
* No multiple inheritance
* Attributes: `this.`

```js
class Greeter {
  constructor(greeting='Hello') {
    this.greeting = greeting;
  }

  greet() {
    return `${this.greeting}. I am Node.js`;
  }
}

module.exports = Greeter;
// module.exports.Greeter = Greeter
// exports.Greeter = Greeter
```

* Creating instances

```js
const Greeter = require('./lib/greeter');

let greeter = new Greeter();
let dude = new Greeter('Dude!');

console.log(greeter.greet());
console.log(dude.greet());
```

## Arrow functions

* One of the most heralded features in modern JavaScript
* Sometimes called 'fat arrow' functions
* Utilizing the new token `=>`

### Benefits

* A very clean concise syntax
* More intuitive scoping and `this` binding.

### What are they

* Anonymous functions with their own special syntax
* Operate in the context of their enclosing scope - ie the function or other code where they are defined.

### Example

* A list of arguments within parenthesis, followed by a 'fat arrow' `=>`, followed by a function body.

```js
const add = (a, b) => { return a + b };
//...
let x = add(3, 8);
console.log(x);
```

* If the function body is a single expression, you can leave off the brackets and put it inline. The results of the expression will be returned by the function.

```js
const add = (a, b) => a + b;
//...
let x = add(3, 8);
console.log(x);
```

* If there is only a single argument, you can even leave off the parenthesis around the argument.

```js
const first = array => array[0];
//...
let x = first([99, 32, 0]);
console.log(x);
```

### Enclosing Scope Context

* Unlike every other form of function, arrow functions do not have their own execution context.
* Practically, this means that both `this` and `arguments` are inherited from their parent function.

```js
const myObject = {
  name: 'My Test Object',
  createAnonymFunction: function() {
    return function() {
      console.log(this.name);
      console.log(arguments);
    };
  },

  createArrowFunction: function() {
    return () => {
      console.log(this.name);
      console.log(arguments);
    };
  }
};

const anon = myObject.createAnonymFunction('hello', 'world');
const arrow = myObject.createArrowFunction('hello', 'world');

console.log("Anonymous:");
anon();

console.log("\r\nArrow:");
arrow();
```

::: codeoutput
<pre>
Anonymous:
undefined
[Arguments] {}

Arrow:
My Test Object
[Arguments] { '0': 'hello', '1': 'world' }
</pre>
:::

## Modules

* Consider modules to be the same as JavaScript libraries.
* A set of functions you want to include in your application.
* Built-in modules: [reference](https://www.w3schools.com/nodejs/ref_modules.asp)

### Including

* To include a module, use the `require()` function with the name of the module

```js
const http = require('http');
```

### Creating Modules

* You can create your own modules
* Use the `exports` keyword to make classes, function, ... available outside the module file.
* Use `require('./my_module')` to include the module

https://www.w3schools.com/nodejs/nodejs_modules.asp

```js
// logger.js
class Logger {
  static log(message) {
    console.log("Logger: " + message)
  }
}

module.exports = Logger;
```

```js
//server.js
const Logger = require('./logger')

setTimeout(() => {
  Logger.log("?")
}, 1000);
```

## Emitting Events

* Node.js has a built-in module, called "Events"
* Allows firing and listening for own events
* By extending the `EventEmitter` class, we can listen for events on instances of our class

```js
//ticker.js
const EventEmitter = require('events');

class Ticker extends EventEmitter {

  constructor() {
    super();
    this.seconds = 0;
    this.minutes = 0;

    setInterval(() => {
      this.seconds++;
      this.emit('second', { seconds: this.seconds });
    }, 1000);

    setInterval(() => {
      this.minutes++;
      this.emit('minute', { minutes: this.minutes });
    }, 60000);
  }

}

module.exports = Ticker;
```

```js
//app.js
const Ticker = require('./ticker');

let tick = new Ticker();

tick.on('second', (event) => console.log("Second passed " + JSON.stringify(event)));
tick.on('minute', (event) => console.log("Minute passed " + JSON.stringify(event)));
```

## The Event Loop

![Event Loop](./img/event_loop.png)

### Node.js is single-threaded

* Basically program that waits for events and dispatches them
* JS is single-threaded and so is Node

#### Background workers

* Single thread
  * Single thing happening at a time
  * Simplifies programming without needing to worry about concurrency issues
* Work is delegated to background workers
* Workers emit events when finished

### Call stack

<!-- https://nodejs.dev/the-nodejs-event-loop -->

```js
const foundations = () => console.log('Laying foundations')

const basement = () => console.log('Digging a basement')

const walls = () => console.log('Building walls')

const build_a_house = () => {
  console.log('Building a house')
  foundations()
  basement()
  walls()
}

build_a_house()
console.log("Ready?")
```

:::codeoutput
<pre>
Building a house
Laying foundations
Digging a basement
Building walls
Ready?
</pre>
:::

### Example using Timeout

Basically something async that takes time to do.

```js
const foundations = () => console.log('Laying foundations')

const basement = () => console.log('Digging a basement')

const walls = () => console.log('Building walls')

const build_a_house = () => {
  console.log('Building a house')
  foundations()
  setTimeout(basement, 0)       // defers function
  walls()
}

build_a_house()
console.log("Ready?")
```

:::codeoutput
<pre>
Building a house
Laying foundations
Building walls
Ready?
Digging a basement
</pre>
:::

### Message Queue

* Timer is started
* When expired, callback is placed in Message Queue
  * Contains user-initiated events
  * Message Queue is processed if call stack is empty

#### Call stack gets priority

* Event loop gives priority to call stack
  * It first processes everything it finds in the call stack
  * If call stack is empty it picks things from the Message Queue

### Job Queue

* ECMAScript 2015 introduced the concept of the Job Queue
* Used by Promises.
* A way to execute the result of an async function as soon as possible
  * rather than being put at the end of the call stack.
* Promises that resolve before the current function ends will be executed right after the current function.

#### An example

```js
const foundations = () => console.log('Laying foundations')

const basement = () => console.log('Digging a basement')

const walls = () => console.log('Building walls')

const build_a_house = () => {
  console.log('Building a house')
  foundations()
  setTimeout(basement, 0)       // defers function
  new Promise((resolve, reject) =>
    resolve('Lets put on a roof')
  ).then(resolve => console.log(resolve))
  walls()
}

build_a_house()
console.log("Ready?")
```

:::codeoutput
<pre>
Building a house
Laying foundations
Building walls
Ready?
Lets put on a roof
Digging a basement
</pre>
:::

### Messing Things Up

```js
const foundations = () => console.log('Laying foundations')

const basement = () => console.log('Digging a basement')

const walls = () => console.log('Building walls')

const build_a_house = () => {
  console.log('Building a house')
  foundations()
  setTimeout(basement, 0)       // defers function
  new Promise((resolve, reject) =>
    resolve('Lets put on a roof')
  ).then(resolve => console.log(resolve))
  walls()
}

build_a_house()
console.log("Ready?")

// Messing with the Event Loop
while(true){}
```

## Packages

Your source for libraries/packages: [https://www.npmjs.com/](https://www.npmjs.com/).

### NPM

* Node Package Manager 
* Install node modules/packages
* Also manages dependencies
* Installs in the `node_modules`dir
* `npm install express` or `npm install --save express` to save as dependency in `package.json`
* Install global using `npm install -g <packagename>`

### Popular Packages

* Express: Web development framework
* Connect: Extensible HTTP server framework
* Socket.io: Server side components for websockets
* Mongo/Mongoose: Wrappers for interacting with MongoDB
  * MongoDB is a document database, which means it stores data in JSON-like documents.
* Redis: Redis client library
  * Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.

### Create your own

* Add `Add decent README.md` with example
* Setup a Github repo
* Setup account on [npmjs.com](https://www.npmjs.com)
* `npm init`
* Publishing on npmjs
  * `npm login`
  * `npm publish`
* Or using it from GitHub
  * `npm install --save <github_url>`

<!-- ## NPX -->

<!-- https://github.com/vives-devbit/devbit-linter -->
<!-- npx devbit-linter -->

<!-- ## Promises -->

<!-- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261 -->
<!-- https://nodejs.dev/understanding-javascript-promises -->