import { body } from 'express-validator';

const signupValidation = [
  body('fullName')
    .not()
    .isEmpty()
    .withMessage('Full name is required'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail({
      all_lowercase: true,
    })
    .withMessage('Provide a valid email'),
  body('password')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Password is required')
    .isLength({
      min: 6,
    })
    .withMessage('Password must be more than 6'),
];

export default signupValidation;
