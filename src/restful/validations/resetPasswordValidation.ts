import { body } from 'express-validator';

const resetPasswordValidation = [
  body('token')
    .not()
    .isEmpty()
    .withMessage('Access token is required'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];

export default resetPasswordValidation;
