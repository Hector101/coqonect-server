import { Response } from 'express';

// libs
import { respondWithSuccess, respondWithWarning } from '../../../lib/httpResponse';

import IRequestWithAuthStatus from '../../../interfaces/IRequestWithAuthStatus';

const authStatus = async (req: IRequestWithAuthStatus, res: Response) => {
  if (req.isAdmin) {
    return respondWithSuccess(res, 207, 'Authenticated');
  }
  if (req.isAuthorized) {
    return respondWithSuccess(res, 200, 'Authenticated');
  }
  return respondWithWarning(res, 401, 'Not Authenticated');
};

export default authStatus;
