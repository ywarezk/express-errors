# Express Zone.js Errors

[![Coverage Status](https://coveralls.io/repos/github/ywarezk/express-zonejs-errors/badge.svg?branch=master)](https://coveralls.io/github/ywarezk/express-zonejs-errors?branch=master)

You are probably wondering...
Why oh why would I need to use a middleware to help me deal with exceptions in my code?

To understand this fundemental yet very important question we must understand 2 important things:

- How node.js deals with exceptions
- How express deals with exceptions

## How Node deals with exception

Simple answer: Node will terminate the process when there is an uncaught exception.
The exception can be in our sync code or in our async code node will terminate the process.
Only exception is a rejected promise which node will dismiss with a warning and an additional deperecation message that this will also terminate the process in the future.

## How Express deals with exceptions

