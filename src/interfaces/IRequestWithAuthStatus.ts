import { Request } from 'express';

import IDecoded from './IDecoded';

export default interface IRequestWithAuthStatus extends Request {
  isAuthorized?: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  decoded?: IDecoded;
}

export interface IAuthStatus {
  isAuthorized?: boolean;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
  decoded?: IDecoded;
}
