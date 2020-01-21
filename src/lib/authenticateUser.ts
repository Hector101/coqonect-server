import IRequestWithAuthStatus, { IAuthStatus } from '../interfaces/IRequestWithAuthStatus';
import IDecoded from '../interfaces/IDecoded';

export default (decoded: IDecoded, auth: IRequestWithAuthStatus | IAuthStatus) => {
  if (
    decoded.verified &&
    !decoded.blocked &&
    decoded.iss === 'coqonect.com' &&
    decoded.aud === 'coqonect.com'
  ) {
    auth.isAuthorized = true;
    auth.decoded = decoded;

    if (decoded.role) {
      if (decoded.role === 'admin') {
        auth.isAdmin = true;
      } else if (decoded.role === 'superAdmin') {
        auth.isSuperAdmin = true;
      }
    }
  }
};
