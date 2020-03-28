import { Request, Response } from 'express';

// All Provider Stategies
import adminAuth from './adminAuth';
import loginAuth from './loginAuth';
import googleAuth from './googleAuth';

// libs
import {
  respondWithSuccess,
  respondWithWarning,
  cookieResponse,
  clearAllCookies,
} from '../../lib/httpResponse';
import metaRedirect from '../../lib/metaRedirect';

// Interface
import IAuthPayload from '../../interfaces/IAuthPayload';

function localAuthentication(
  _req: Request,
  res: Response ,
  error: string,
  success: IAuthPayload,
) {
  if (error) {
    clearAllCookies(res);
    return respondWithWarning(res, 401, error);
  }

  if (success.type === 'not_verified') {
    return respondWithWarning(res, 403, 'Account not verified');
  }

  const { token, refreshToken } = success.payload;

  cookieResponse(res, '__cnt', token, true, 604800000);
  cookieResponse(res, '__crt', refreshToken, true, 604800000);

  return respondWithSuccess(
    res,
    200,
    'Login successful');
}

function socialAuthentication(
  _req: Request,
  res: Response,
  error: string,
  success: IAuthPayload,
) {
  if (error) {
    clearAllCookies(res);
    return metaRedirect(res, `${process.env.CLIENT_BASE_URL}/login`);
  }

  const { token, refreshToken } = success.payload;

  cookieResponse(res, '__cnt', token, true, 604800000);
  cookieResponse(res, '__crt', refreshToken, true, 604800000);

  return metaRedirect(res, `${process.env.CLIENT_BASE_URL}/dashboard`);
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
  clearAllCookies(res);
  return respondWithSuccess(res, 200, 'Logout successful');
};
