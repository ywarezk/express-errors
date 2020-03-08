/**
 * This will create the app with or without the zone
 *
 * Created March 8th, 2020
 * @author: ywarezk
 * @version: 1.0.9
 * @license: MIT
 */

import express, { Application } from 'express';
import zoneErrors from '../..';

export default function appCreator(isZone = true): Application {
    const app = express();

    if (isZone) {
        app.use(zoneErrors());
    }

    app.get('*', function(_req, res) {
        res.send('hello world');
    });
    return app;
}
