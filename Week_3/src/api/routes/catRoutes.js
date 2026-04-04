import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/uploads.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import {
  catList,
  catById,
  postCat,
  putCat,
  deleteCat,
  catsByUser
} from '../controllers/catController.js';
import { validateCat, handleValidationErrors } from '../../middlewares/validation.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/').get(catList).post(authenticateToken, upload.single('cat'), validateCat, handleValidationErrors, createThumbnail, postCat);
catRouter.route('/:id').get(catById).put(authenticateToken, upload.single('cat'), validateCat, handleValidationErrors, createThumbnail, putCat).delete(authenticateToken, deleteCat);
catRouter.get('/user/:id', authenticateToken, catsByUser);

export default catRouter;