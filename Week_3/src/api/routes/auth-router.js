import express from 'express';
import { postLogin, getMe  } from '../controllers/auth-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validateLogin, handleValidationErrors } from '../../middlewares/validation.js';

const router = express.Router();

router.post('/login', validateLogin, handleValidationErrors, postLogin);
router.get('/me', authenticateToken, getMe);

export default router;