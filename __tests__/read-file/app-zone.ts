/**
 * This test will demonstrate how our zone error can help on failing promises
 * In this test we will try to read an unexisting file
 *
 * Created February 29th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { promises } from 'fs';
import { createApp } from '../test-utils';

const app = createApp(undefined, false);

app.get('*', async function() {
    await promises.readFile('/path/to/nowhere');
});

export default app;
