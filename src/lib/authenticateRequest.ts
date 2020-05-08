import IRequestWithAuthStatus from '../interfaces/IRequestWithAuthStatus';
import IDecoded from '../interfaces/IDecoded';

export default (decoded: IDecoded, req: IRequestWithAuthStatus) => {
  const platform = req.useragent && req.useragent.platform;
  const browser = req.useragent && req.useragent.browser;

  if (
    decoded.verified &&
    !decoded.blocked &&
    decoded.iss === 'coqonect.com' &&
    decoded.aud === 'coqonect.com' &&
    decoded.platform === platform &&
    decoded.browser === browser
  ) {
    req.isAuthorized = true;
    req.decoded = decoded;

    if (decoded.role) {
      if (decoded.role === 'admin') {
        req.isAdmin = true;
      } else if (decoded.role === 'superAdmin') {
        req.isSuperAdmin = true;
      }
    }
  }
};
