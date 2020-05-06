
import jsonwebtoken from 'jsonwebtoken';
import _pick from 'lodash/pick';

import IDecoded from '../interfaces/IDecoded';

export const createToken = (payload: IDecoded, key: string, expiresIn: string): string => {
  return jsonwebtoken.sign(payload, key, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  });
};
