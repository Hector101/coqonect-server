
import jsonwebtoken from 'jsonwebtoken';
import _pick from 'lodash/pick';

// database model
import { Account } from '../db';

import IDecoded from '../interfaces/IDecoded';

interface IToken {
  token?: string;
  refreshToken?: string;
}

export const createToken = (payload: IDecoded, key: string, expiresIn: string): string => {
  return jsonwebtoken.sign(payload, key, {
    expiresIn,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  });
};

export const createTokens = (payload: IDecoded, refreshSecret: string): string[] => {
  const token = createToken(payload, process.env.JWT_KEY as string, '1h');
  const refreshToken = createToken(payload, refreshSecret, '7d');

  return [token, refreshToken];
};

export const refreshTokens = async (refreshToken: string): Promise<IToken> => {
  let id: string;
  try {
    const payload: IDecoded = (jsonwebtoken.decode(refreshToken) as IDecoded);
    id = payload.id;
  } catch (err) {
    return {};
  }

  if (!id) {
    return {};
  }
  let refreshSecret: string;
  let account;
  try {
    account = await Account.findOne({ where: { id } });
    if (!account) {
      return {};
    }
    refreshSecret = `${process.env.JWT_REFRESH_KEY}${account.password}`;
  } catch (e) {
    return {};
  }

  try {
    jsonwebtoken.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  try {
    const [newToken, newRefreshToken] = await createTokens(_pick(account,
      ['id', 'verified', 'blocked']), refreshSecret);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch (e) {
    return {};
  }
};
