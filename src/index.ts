/**
 * Entry point file of the middleware
 *
 * Created February 20th, 2020
 *
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import 'zone.js';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import debugCreator from 'debug';

const debug = debugCreator('express-zonejs-errors');
const debugError = debugCreator('express-zonejs-errors:error');

/**
 * we attach this function to the zone error handling
 * the job of this function is to pass the error to express error middleware.
 *
 * @param _parentZoneDelegate
 * @param currentZone
 * @param _targetZone
 * @param error
 */
function onHandleError(_parentZoneDelegate: ZoneDelegate, currentZone: Zone, _targetZone: Zone, error: Error): boolean {
    const next = currentZone.get('next');
    const strategy: ErrorStrategy = currentZone.get('strategy');
    if (strategy) {
        const req = currentZone.get('req');
        strategy.handleError(error, req).then(
            () => debug(`${strategy.constructor.name}: Success handling exception`),
            (err: Error) =>
                debugError(`
                ${strategy.constructor.name}: Failed handling exception
                Message: ${err.message}
                StackTrace: ${err.stack}
            `),
        );
    }
    next(error);
    return false;
}

/**
 * This interface represents a strategy for dealing with the errors
 * Strategy can print the error, save it to the db, etc.
 */
export interface ErrorStrategy {
    handleError: (err: Error, req: Request) => Promise<void>;
}

/**
 * This is the configurations that the middleware is getting
 */
export interface ZoneErrorsConfig {
    strategy?: ErrorStrategy;
}

/**
 * Openning a zone for every req and saving the req/res object in the zone
 */
export default function zoneErrors(config: ZoneErrorsConfig = {}): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const expressZone = Zone.current.fork({
            properties: {
                next,
                req,
                strategy: config.strategy,
            },
            name: 'express-zone',
            onHandleError,
        });
        expressZone.run(() => {
            next();
        });
    };
}
