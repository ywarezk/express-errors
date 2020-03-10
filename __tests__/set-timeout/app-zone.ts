/**
 * Simple async error in setTimeout
 * We will wrap our app with the zone middleware and throw an error in an async timeout
 *
 * Created February 21st, 2020
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { createApp, StamStrategy } from '../test-utils';
import { Application } from 'express';

const app = createApp(undefined, new StamStrategy());
const appNoStrategy = createApp();

function setRoutes(app: Application): void {
    app.get('*', function() {
        setTimeout(() => {
            throw new Error('async error');
        }, 0);
    });
}

setRoutes(app);
setRoutes(appNoStrategy);

export { appNoStrategy };
export default app;
