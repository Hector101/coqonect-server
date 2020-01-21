import { body } from 'express-validator';

const createAdminValidation = [
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
];

export default createAdminValidation;
