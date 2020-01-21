import { Response, NextFunction } from 'express';

// interface
import IRequestWithAuthStatus from '../../interfaces/IRequestWithAuthStatus';

import { respondWithWarning } from '../../lib/httpResponse';

export default async (req: IRequestWithAuthStatus, res: Response, next: NextFunction) => {
  if (!req.isAuthorized) {
    return respondWithWarning(res, 403, 'Unauthorized access');
  }
  return next();
};
