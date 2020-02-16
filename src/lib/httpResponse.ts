import { Response } from 'express';

export function respondWithSuccess(res: Response, status: number, message: string, additionalFields = {}): Response {
  return res.status(status).send({
    status,
    success: true,
    message,
    payload: Array.isArray(additionalFields)
      ? [ ...additionalFields ] : { ...additionalFields },
    });
}

export function respondWithWarning(res: Response, status: number, message: string, additionalFields = {}): Response {
  return res.status(status).send({
    status,
    success: false,
    message,
    payload: { ...additionalFields } });
}

export function cookieResponse(res: Response, name: string, value: string, httpOnly = false, maxAge: number): void {
  res.cookie(name, value,
  {
    maxAge,
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.DOMAIN,
    sameSite: false,
  });
}

export function clearAllCookies(res: Response): void {
  res.clearCookie('__cnt', { domain: process.env.DOMAIN });
  res.clearCookie('__crt', { domain: process.env.DOMAIN });
}
