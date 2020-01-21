import { body } from 'express-validator';

const verifyEmailValidation = [
  body('token')
    .not()
    .isEmpty()
    .withMessage('valid token is required'),
];

export default verifyEmailValidation;
