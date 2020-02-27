import { Router } from 'express';

// Auth Controllers
import {
  adminLoginController,
  localCallbackController,
  googleController,
  googleCallbackController,
  logoutController,
 } from '../auth/authControllers';

// Controllers user
import signupAuth from '../controllers/user/signupUser';
import createAdmin from '../controllers/user/createAdmin';
import forgotPassword from '../controllers/user/forgotPassword';
import resetPassword from '../controllers/user/resetPassword';
import verifyResetPasswordToken from '../controllers/user/verifyResetPasswordToken';
import authStatus from '../controllers/user/authStatus';
import { imageUpload } from '../controllers/user/imageUpload';

// Controllers email
import sendEmailVerification from '../controllers/email/sendEmailVerification';
import verifyEmail from '../controllers/email/verifyEmail';
import verifyAdminEmail from '../controllers/email/verifyAdminEmail';

// Validators
import verifyEmailValidation from '../validations/verifyEmailValidation';
import sendEmailVerificationValidation from '../validations/sendEmailVerificationValidation';
import createAdminValidation from '../validations/createAdminValidation';
import signupValidation from '../validations/signupValidation';
import loginValidation from '../validations/loginValidation';
import forgotPasswordValidation from '../validations/forgotPasswordValidation';
import resetPasswordValidation from '../validations/resetPasswordValidation';

// Middlewares
import ValidationMiddleware from '../middleWares/ValidationMiddleware';
import checkPermissions from '../middleWares/checkPermissions';
import isAdmin from '../middleWares/isAdmin';
import isAuthorized from '../middleWares/isAuthorized';

export default (router: Router) => {
  // Local Strategy Login user
  router.post(
    '/api/v1/login',
    loginValidation,
    ValidationMiddleware,
    localCallbackController,
  );

 // Google auth
  router.get(
    '/api/v1/google',
    googleController,
  );

  // Google auth callback
  router.get(
    '/api/v1/google/callback',
    googleCallbackController,
  );

  // Logout user
  router.get(
    '/api/v1/logout',
    logoutController,
  );

  // Signup user
  router.post(
    '/api/v1/signup',
    signupValidation,
    ValidationMiddleware,
    signupAuth,
  );

  // Verify user email
  router.post(
    '/api/v1/verify-email',
    verifyEmailValidation,
    ValidationMiddleware,
    verifyEmail,
  );

  // send verification email
  router.post(
    '/api/v1/send-verification-email',
    sendEmailVerificationValidation,
    ValidationMiddleware,
    sendEmailVerification,
  );

  // verify token
  router.post(
    '/api/v1/verify-admin-email',
    verifyAdminEmail,
  );

  // createe admin
  router.post(
    '/api/v1/create-admin',
    isAdmin,
    checkPermissions,
    createAdminValidation,
    ValidationMiddleware,
    createAdmin,
  );

  // Login admin
  router.post(
    '/api/v1/admin-login',
    loginValidation,
    ValidationMiddleware,
    adminLoginController,
  );

  // Forgot password
  router.post(
    '/api/v1/forgot-password',
    forgotPasswordValidation,
    ValidationMiddleware,
    forgotPassword,
  );

  // Reset password
  router.post(
    '/api/v1/reset-password',
    resetPasswordValidation,
    ValidationMiddleware,
    resetPassword,
  );

  // verify reset password token
  router.post(
    '/api/v1/verify-reset-password-token',
    verifyResetPasswordToken,
  );

  // verify user auth status
  router.get(
    '/api/v1/auth-status',
    authStatus,
  );

  // user upload image
  router.post(
    '/api/v1/upload-image',
    isAuthorized,
    imageUpload,
  );
};
