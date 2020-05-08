import { Response, NextFunction } from 'express';

import verifyToken from '../../lib/verifyToken';

// interface
import IRequestWithAuthStatus from '../../interfaces/IRequestWithAuthStatus';
import IDecoded from '../../interfaces/IDecoded';

import authenticateUser from '../../lib/authenticateRequest';

export default async (req: IRequestWithAuthStatus, _res: Response, next: NextFunction) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) { return next(); }

  const accessToken = bearerToken.split(' ')[1];

  try {
    const decoded: IDecoded = verifyToken(accessToken);

    authenticateUser(decoded, req);
  } catch (e) {
    // do nothing
  }
  return next();
};
