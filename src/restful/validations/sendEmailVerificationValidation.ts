import { body } from 'express-validator';

const sendEmailVerificationValidation = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail({
      all_lowercase: true,
    })
    .withMessage('Provide a valid email'),
];

export default sendEmailVerificationValidation;
