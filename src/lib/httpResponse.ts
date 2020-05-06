import { Response } from 'express';

export function respondWithSuccess(res: Response, status: number, message: string, payload = {}): Response {
  return res.status(status).send({
    status,
    success: true,
    message,
    payload: Array.isArray(payload)
      ? [ ...payload ] : { ...payload },
    });
}

export function respondWithWarning(res: Response, status: number, message: string, payload = {}): Response {
  return res.status(status).send({
    status,
    success: false,
    message,
    payload,
  });
}
