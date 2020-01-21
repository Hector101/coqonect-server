import { Response, NextFunction } from 'express';

// interface
import IRequestWithAuthStatus from '../../interfaces/IRequestWithAuthStatus';

import { respondWithWarning } from '../../lib/httpResponse';

interface IPermission {
  superAdmin: string[];
  admin: string[];
}

const permissions: IPermission = {
  superAdmin: (process.env.SUPER_ADMIN_PERMS as string).split(','),
  admin: (process.env.ADMIN_PERMS as string).split(','),
};

export default async (req: IRequestWithAuthStatus, res: Response, next: NextFunction) => {
  const { path, isAdmin: admin, isSuperAdmin: superAdmin } = req;
  const role: string = superAdmin ? 'superAdmin' : admin ? 'admin' : '';
  const [, allowedRoute ] = path.split('v1');

  // @ts-ignore
  if (!permissions[role].includes(allowedRoute)) {
    return respondWithWarning(res, 403, 'Admins only allowed');
  }
  return next();
};
