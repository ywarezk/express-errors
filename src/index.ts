/**
 * Entry point file of the middleware
 *
 * Created February 20th, 2020
 *
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';

export default function zoneErrors(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {

  };
}
