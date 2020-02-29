/**
 * This test will demonstrate how our zone error can help on failing promises
 * In this test we will try to read an unexisting file
 *
 * Created February 29th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import express from 'express';
import { promises } from 'fs';

const app = express();

app.get('*', async function(req, res, next) {
    try {
        await promises.readFile('/path/to/nowhere');
    } catch (err) {
        next(err);
    }
});

export default app;
