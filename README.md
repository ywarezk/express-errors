# Express Zone.js Errors

[![Coverage Status](https://coveralls.io/repos/github/ywarezk/express-zonejs-errors/badge.svg?branch=master)](https://coveralls.io/github/ywarezk/express-zonejs-errors?branch=master)
[![Build Result](https://travis-ci.com/ywarezk/express-zonejs-errors.svg?branch=master)](https://travis-ci.com/ywarezk/express-zonejs-errors.svg?branch=master)

## TLDR;

this middleware will automatically catch exceptions, sync or async and transfer them to the error handling middlewares.

### Installation

```bash
npm install express-zonejs-errors --save
```

or

```bash
yarn add express-zonejs-errors --save
```

Attach like a regular middleware

```js
const zoneErrors = require('express-zonejs-errors');

app.use(zoneErrors());
```

I would recommend not to use it in all routes rather on those more complex routes that are prone to errors, for example routes that require access to database.
For example:

```js
const zoneErrors = require('express-zonejs-errors');

app.use('/api', zoneErrors());
```

this will only effect routes that start with **/api**

## About

You are probably wondering...
Why oh why would I need to use a middleware to help me deal with exceptions in my code?

To understand this fundemental yet very important question we must understand 2 important things:

- How node.js deals with exceptions
- How express deals with exceptions

## How Node deals with exception

Simple answer: Node will terminate the process when there is an uncaught exception.
The exception can be in our sync code or in our async code node will terminate the process.
Only exception is a rejected promise which node will dismiss with a warning and an additional deperecation message that this will also terminate the process in the future.
So we have to consider exceptions as terminating the node process

## How Express deals with exceptions

In express application we are creating middlewares to handle errors which are called **Error Handling Middlewares**
to attach an error handling middleware we do the following:

```js
app.use(function(err, req, res, next) {
    // do something like present and error page
})
```

When express **catches** and error he will pass the request to the error middlewares according to the order we placed them.
At the end of the chain of error middlewares, there is the default error handler that express is placing which will send a response specifying the error that happened and the stacktrace (in dev mode only)

### How does Express **catch** an error

To understand this important aspect of express we have to distinguish between two types of exceptions:
- Exception that happen in our sync code - **Sync Exceptions**
- Exceptions that happen in our async code - **Async Exceptions**
Let's go over those two.

#### Sync Exceptions

can happen in one of our middlewares if we are trying to do something js can't.
Let's show an example:

```js
app.get('/sync-error-example', (req, res) => {
    const user = req.user;
    res.send(`hello ${user.firstName} ${user.lastName}`);
});
```

In this example in the case where **req.user** will be **undefined** there will be a sync exception when trying to access properties **firstName, lastName**
show JS will throw an exception.
Now we all know that node usually will terminate the process on exception, but express will help us deal with those exceptions and catch automatically those sync exceptions, and invoke the error middlewares we defined.
So no need to do anything extra here since it will automatically move along to our error handling.

#### Async exceptions

Here is where things get tricky, and what this middleware is all about, removing that trickyness.
Express cannot automatically catch async exceptions, and since it's JS and almost every other thing we do is async, a lot of our exceptions we need to handle ourselves.
How do we handle async exceptions you ask?
Let's give a few examples:

- Async with error first callback:

```js
const fs = require('fs');
app.get('/read-file', (req, res, next) => {
    fs.readFile('stam.txt', (err, data) => {
        // dealing with async error
        if (err) {
            next(err);
            return;
        }
        res.send(data.toString());
    });
});
```

We see in this example that on error first callbacks we need to pass the exception to express by calling **next** and sending the **Error**

- Async with promises:

```js
const fs = require('fs').promises
app.get('/read-file-promise', (req, res, next) => {
    fs.readFile('stam.txt').then(
        (data) => {
            res.send(data.toString());
        },
        (err) => {
            next(err);
        }
    )
});

// or promises with async await
app.get('/read-file-async-await', async (req, res, next) => {
    try {
        const data = await fs.readFile('stam.txt');
        res.send(data.toString());
    } catch(err) {
        next(err);
    }
});
```

and what can happen if we will miss out on catching those exceptions?
Well two things might happen:

- The best result will be request hanging in limbo untill the client gets a timeout.
- The worst case is the exception will propogate to node and in that case might terminate the process!

## How this middleware helps with exceptions

This middleware will open a **Zone.js** for every request that gets in.
**Zones** are able to catch exceptions, also exceptions in our async code. 
So when the zone catch an exception it will send that exception to the error middlewares.

## Performance - The price to pay

You can examine the benchmarking I did to see the effect on performance to open a zone for every request.
Bottom line: less then 1.5% reduce in Request Per Second.
So you pay a small performance price for the ability to deal properly with errors.


