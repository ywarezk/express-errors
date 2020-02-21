/**
 * Unit testing my set timeout servers.
 * I want to also examine different benchmarking of those 2 apps
 *
 * Created February 20th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import appZone from './app-zone';
import app from './app';
import { Done } from 'mocha';
import { Server } from 'http';

describe('setTimeout server', () => {
    let server: Server;

    describe('with zone', () => {
        // run the server
        before((done: Done) => {
            server = appZone.listen(3000, () => {
                done();
            });
        });

        after(() => {
            server.close();
        });

        it('should be directed to the error page', () => {});
    });
});
