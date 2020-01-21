import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { respondWithWarning } from '../../lib/httpResponse';
import getValidationErrors from '../../lib/getValidationErrors';

export default async function ValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  const errors = getValidationErrors(validationResult(req).array());

  if (Object.keys(errors).length) {
    return respondWithWarning(res, 400, 'Validation Error', errors);
  }
  return next();
}
