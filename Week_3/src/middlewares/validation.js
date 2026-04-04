import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
};

export const validateUser = [
  body('name').trim().isLength({ min: 2 }).escape(),
  body('username').trim().isLength({ min: 3 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
];

export const validateCat = [
  body('cat_name').trim().notEmpty().escape(),
  body('weight').isFloat({ min: 0 }),
  body('birthdate').isISO8601()
];

export const validateLogin = [
  body('username').trim().notEmpty().escape(),
  body('password').notEmpty()
];