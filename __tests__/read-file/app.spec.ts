/**
 * testing what happens when we have failing promises
 * how do the zone react?
 *
 * Created February 29th, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import appZone from './app-zone';
import { Server } from 'http';
import axios from 'axios';
import { expect } from 'chai';

describe('readFile promise server', () => {
    describe('with zone', () => {
        let server: Server;

        before(done => {
            server = appZone.listen(3000, () => {
                console.log('we are now listening...');
                done();
            });
        });

        after(() => {
            server.close();
        });

        it('promise reject zone should catch it', async () => {
            try {
                await axios.get('http://localhost:3000/');
            } catch (err) {
                expect(err.response.status).to.equal(500);
            }
        });
    });
});
