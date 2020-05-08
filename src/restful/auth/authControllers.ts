import { Request, Response } from 'express';

import { Account, Admin } from '../../db';

// All Provider Stategies
import adminAuth from './adminAuth';
import loginAuth from './loginAuth';
import googleAuth from './googleAuth';

// libs
import {
  respondWithSuccess,
  respondWithWarning,
} from '../../lib/httpResponse';
import metaRedirect from '../../lib/metaRedirect';
import { createToken } from '../../lib/generateTokens';
import getUserAgent from '../../lib/getUserAgent';

// Interface
import IAuthPayload from '../../interfaces/IAuthPayload';

function generateUserToken(req: Request, payload: Account | Admin) {
  let token = '';

  if (payload instanceof Admin) {
    token = createToken({
        id: payload.id,
        verified: payload.verified,
        blocked: payload.blocked,
        role: payload.role,
        browser: getUserAgent(req).browser,
        platform: getUserAgent(req).platform,
      },
      `${process.env.JWT_KEY}`,
      '7d',
    );
  } else if (payload instanceof Account) {
      token = createToken({
        id: payload.id,
        verified: payload.verified,
        blocked: payload.blocked,
        browser: getUserAgent(req).browser,
        platform: getUserAgent(req).platform,
      },
      `${process.env.JWT_KEY}`,
      '7d',
    );
  } else {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }

  return token;
}

function localAuthentication(
  req: Request,
  res: Response ,
  error: string,
  success: IAuthPayload,
) {
  if (error) {
    return respondWithWarning(res, 401, error);
  }

  return respondWithSuccess(
    res,
    200,
    'Login successful',
    { token: generateUserToken(req, success.payload) },
  );
}

function socialAuthentication(
  req: Request,
  res: Response,
  error: string,
  success: IAuthPayload,
) {
  if (error) {
    return metaRedirect(res, `${process.env.CLIENT_BASE_URL}/auth/login`);
  }

  const token = generateUserToken(req, success.payload);

  return metaRedirect(res, `${process.env.CLIENT_BASE_URL}/auth/socialAuth?t=${token}`);
}

// LOCAL LOGIN
export const localCallbackController = (req: Request, res: Response) =>
loginAuth.authenticate('login', { session: false }, (error, success) => {
  return localAuthentication(req, res, error, success);
})(req, res);

// GOOGLE
export const googleController = googleAuth.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallbackController = (req: Request, res: Response) =>
  googleAuth.authenticate('google',  { session: false }, (error, success) => {
    return socialAuthentication(req, res, error, success);
})(req, res);

// ADMIN LOGIN
export const adminLoginController = (req: Request, res: Response) =>
  adminAuth.authenticate('admin-login', { session: false }, (error, success) => {
    return localAuthentication(req, res, error, success);
})(req, res);

// LOGOUT
export const logoutController = async (_req: Request, res: Response) => {
  return respondWithSuccess(res, 200, 'Logout successful');
};
