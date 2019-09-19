---
description: This chapter will introduce the most important concepts of Node.js.
title: 01 - Crash Course Node.js
---

# Chapter 01 - Crash Course Node.js

## What is Node.js

* Open source server environment
* Free
* Runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.)
* Uses JavaScript on the server

Node isn't a silver bullet, it's not always the best solution for every project.

## Before Node.js

* WebApps are written in client/server model
* Client requests file from server
* Server gets file (waits) from filesystem and returns it, then closes connection
* Ready for new connection

### What about multiple clients

* Threads
* Running multiple operations concurrently

Starting up new threads had a cost (overhead)

## Here came Node.js

* Client requests file from server
* Node.js requests the file from the file system but doesn't wait
* Ready to handle the next request.
* When the file system has opened and read the file, the server is notified and it returns the content to the client.

## Event Loop

![Event Loop](./img/event_loop.png)

## Node.js is single-threaded

* Basically program that waits for events and dispatches them
* JS is single-threaded and so is Node

### Background workers

* Single thread
    * Single thing happening at a time
    * Simplifies programming without needing to worry about concurrency issues
* Work is delegated to background workers
* Workers emit events when finished


## Call stack

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
```

## Timeout

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
```

## Message Queue

* Timer is started
* When expired, callback is placed in Message Queue
    * Contains user-initiated events
    * Message Queue is processed if call stack is empty

### Call stack get priority

* Event loop gives priority to call stack
    * It first processes everything it finds in the call stack
    * If call stack is empty it picks things from the Message Queue

## Job Queue

* ECMAScript 2015 introduced the concept of the Job Queue
* Used by Promises.
* A way to execute the result of an async function as soon as possible
    * rather than being put at the end of the call stack.
* Promises that resolve before the current function ends will be executed right after the current function.

### An example

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
```

