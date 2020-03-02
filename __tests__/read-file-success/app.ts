/**
 * app that reads a file successfully for benchmarking
 *
 * Created March 2nd, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import express from 'express';
import { promises } from 'fs';
import { resolve } from 'path';

const app = express();

app.get('*', async function(req, res) {
    const file = await promises.readFile(resolve(__dirname, '../../README.md'));
    res.send(file.toString());
});

export default app;
