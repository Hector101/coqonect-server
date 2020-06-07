import IRequestWithAuthStatus from '../interfaces/IRequestWithAuthStatus';
import IDecoded from '../interfaces/IDecoded';

export default (decoded: IDecoded, req: IRequestWithAuthStatus) => {
  const platform = req.useragent && req.useragent.platform;
  const browser = req.useragent && req.useragent.browser;
  const origin = 'coqonect.com';
  const ADMIN_ROLE = 'admin';
  const SUPER_ADMIN_ROLE = 'superAdmin';

  if (
    decoded.verified &&
    !decoded.blocked &&
    decoded.iss === origin &&
    decoded.aud === origin &&
    decoded.platform === platform &&
    decoded.browser === browser
  ) {
    req.isAuthorized = true;
    req.decoded = decoded;

    if (decoded.role) {
      if (decoded.role === ADMIN_ROLE) {
        req.isAdmin = true;
      } else if (decoded.role === SUPER_ADMIN_ROLE) {
        req.isSuperAdmin = true;
      }
    }
  }
};
