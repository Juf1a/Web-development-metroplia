import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    const error = new Error('Invalid token');
    error.status = 403;
    next(error);
  }
};

export { authenticateToken };