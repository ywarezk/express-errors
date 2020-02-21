/**
 * Same app as before only without our zone middleware
 *
 * Created February 21st, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import express from 'express';

const app = express();

app.get('*', function(_req, _res, next) {
    setTimeout(() => {
        next(new Error('async error'));
    });
});

export default app;
