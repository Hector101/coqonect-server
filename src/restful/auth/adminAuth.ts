import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import winstonEnvLogger from 'winston-env-logger';

// database models
import { Admin } from '../../db';

// libs
import { isValidPassword } from '../../lib/passwordOps';

passport.use('admin-login', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
  (async (_req: Request, email, password, done) => {
    try {
      const admin = await Admin.findOne({
        where: { email },
      });

      if (admin && admin.blocked) {
        return done('Account blocked, kindly contact an Administrator to resolve');
      }

      if (!admin || (admin && !isValidPassword(password, admin.password))) {
        return done('Incorrect email or password.');
      }

      if (admin && !admin.verified) {
        return done('Account not verified');
      }

      return done(null, {
        type: 'verified',
        mesage: 'Login successful',
        payload: admin,
      });
    } catch (e) {
      winstonEnvLogger.error({
        message: 'An Error occurred',
        error: e,
      });
      return done('An Error occurred');
    }
  })));

export default passport;
