import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/uploads.js';
import {
  catList,
  catById,
  postCat,
  putCat,
  deleteCat,
  catsByUser
} from '../controllers/catController.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/').get(catList).post(upload.single('cat'), createThumbnail, postCat);
catRouter.route('/:id').get(catById).put(putCat).delete(deleteCat);
catRouter.get('/user/:id', catsByUser);

export default catRouter;