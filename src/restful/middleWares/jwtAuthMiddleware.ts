import { Response, NextFunction } from 'express';

import verifyToken from '../../lib/verifyToken';
import { refreshTokens } from '../../lib/generateTokens';
import { cookieResponse } from '../../lib/httpResponse';

// interface
import IRequestWithAuthStatus from '../../interfaces/IRequestWithAuthStatus';
import IDecoded from '../../interfaces/IDecoded';

import authenticateUser from '../../lib/authenticateUser';

export default async (req: IRequestWithAuthStatus, res: Response, next: NextFunction) => {
  const __cnt: string = req.cookies.__cnt;
  if (!__cnt) { return next(); }

  try {
    const decoded: IDecoded = verifyToken(__cnt);

    authenticateUser(decoded, req);
  } catch (e) {
    const __crt: string = req.cookies.__crt;

    if (!__crt) {
      return next();
    }

    const { token, refreshToken } = await refreshTokens(__crt);

    if (token && refreshToken) {
      cookieResponse(res, '__cnt', token as string, true, 604800000);
      cookieResponse(res, '__crt', refreshToken as string, true, 604800000);
      const decoded = verifyToken(token);
      authenticateUser(decoded, req);
    }
  }
  return next();
};
