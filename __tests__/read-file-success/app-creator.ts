/**
 * app that reads a file successfully for benchmarking
 *
 * Created March 2nd, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { Application } from 'express';
import { promises } from 'fs';
import { resolve } from 'path';
import { createApp } from '../test-utils';

export default function appCreator(isZone = true): Application {
    const app = createApp(isZone);

    app.get('*', async function(_req, res) {
        const file = await promises.readFile(resolve(__dirname, '../../README.md'));
        res.send(file.toString());
    });
    return app;
}
