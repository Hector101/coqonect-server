import jsonwebtoken from 'jsonwebtoken';

// Interface
import IDecoded from '../interfaces/IDecoded';

export default (token: string) => {
  return (jsonwebtoken.verify(token, (process.env.JWT_KEY as string), {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  }) as IDecoded);
};

export const verifyEmailToken = (token: string) => {
  return (jsonwebtoken.verify(token, (process.env.VERIFICATION_JWT_KEY as string), {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  }) as IDecoded);
};

export const verifyResetPassword = (token: string) => {
  return (jsonwebtoken.verify(token, (process.env.JWT_PASSWORD_RESET_KEY as string), {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  }) as IDecoded);
};
