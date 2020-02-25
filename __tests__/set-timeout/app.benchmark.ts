/**
 * We are doing a benchmarking test for the app with zone errors and without the zone erros.
 *
 * Created Tuesday February 25th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import zoneApp from './app-zone';
import app from './app';
import autoCannon from 'autocannon';
import { Application } from 'express';

async function startServer(app: Application): Promise<void> {
    return new Promise(resolve => {
        app.listen(3000, function() {
            resolve();
        });
    });
}

/**
 * run benchmarking with zone and without zone
 */
async function main(): Promise<void> {
    // zone benchmark
    await startServer(zoneApp);
    let result = await autoCannon({
        url: 'http://localhost:3000',
    });
    console.log('Zone result:');
    console.log(result);

    // no zone benchmark
    await startServer(app);
    result = await autoCannon({
        url: 'http://localhost:3000',
    });
    console.log('without zone result:');
    console.log(result);
}

main();
