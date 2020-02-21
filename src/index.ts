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
import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';

function onHandleError(
  _parentZoneDelegate: ZoneDelegate,
  currentZone: Zone,
  _targetZone: Zone,
  error: Error,
): boolean {
  const next = currentZone.get('next');
  next(error);
  return false;
}

/**
 * Openning a zone for every req and saving the req/res object in the zone
 */
export default function zoneErrors(): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    Zone.current.fork({
      properties: {
        next,
      },
      name: 'express-zone',
      onHandleError,
    });
  };
}
