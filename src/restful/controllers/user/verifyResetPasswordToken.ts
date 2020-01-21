import { Response } from 'express';
import winstonEnvLogger from 'winston-env-logger';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';
import { verifyResetPassword } from '../../../lib/verifyToken';

// interface
import IRequestWithAuthStatus from '../../../interfaces/IRequestWithAuthStatus';

async function verifyResetPasswordToken(req: IRequestWithAuthStatus, res: Response) {
  const { token } = req.body;

  try {
    verifyResetPassword(token);

    return respondWithSuccess(res, 200, 'Authorized');
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An Error Occurred',
      error,
    });

    return respondWithWarning(res, 403, 'Unauthorized');
  }
}

export default verifyResetPasswordToken;
