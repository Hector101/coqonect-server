import verifyToken from './verifyToken';
import authenticateUser from './authenticateUser';

// Interface
import { IAuthStatus } from '../interfaces/IRequestWithAuthStatus';

export default (webSocket: any) => {
  try {
    const [ __cnt ] = webSocket.upgradeReq.headers.cookie.split(';');
    const token = __cnt.slice(6);
    const decoded = verifyToken(token);
    const auth: IAuthStatus = {};

    authenticateUser(decoded, auth);

    return auth;
  } catch (e) {
    return {};
  }
};
