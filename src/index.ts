/**
<<<<<<< HEAD
 * The middleware main logic will be here
 * 
 * Created February 15th, 2020
 * @author: ywarezk
 * @version: 1.0.0
 * @copyright: Nerdeez Ltd
 */

import "zone.js";
=======
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
>>>>>>> daf465a7003a1ac2b64925260a1535eb951ed4f3
