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
  const cookieOptions = {
    maxAge,
    httpOnly,
    sameSite: false,
    ...(process.env.NODE_ENV === 'production' && { secure: true }),
  };

  res.cookie(name, value, cookieOptions);
}

export function clearAllCookies(res: Response): void {
  res.clearCookie('__cnt');
  res.clearCookie('__crt');
}
