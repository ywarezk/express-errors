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
import zoneErrors from '../../src';
import { promises } from 'fs';

const app = express();

app.use(zoneErrors());

app.get('*', async function() {
    await promises.readFile('/path/to/nowhere');
});

export default app;
