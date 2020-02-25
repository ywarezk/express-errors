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
import { Server } from 'http';
import { promises } from 'fs';
import { resolve } from 'path';

async function startServer(app: Application): Promise<Server> {
    return new Promise(resolve => {
        const server = app.listen(3000, function() {
            resolve(server);
        });
    });
}

/**
 * run benchmarking with zone and without zone
 */
async function main(): Promise<void> {
    // zone benchmark
    let server = await startServer(zoneApp);
    let result = await autoCannon({
        url: 'http://localhost:3000',
    });
    server.close();
    await promises.writeFile(resolve(__dirname, 'benchmark-report.zone.json'), JSON.stringify(result));

    // no zone benchmark
    server = await startServer(app);
    result = await autoCannon({
        url: 'http://localhost:3000',
    });
    server.close();
    console.log('without zone result:');
    console.log(result);
    await promises.writeFile(resolve(__dirname, 'benchmark-report.nozone.json'), JSON.stringify(result));
}

main();
