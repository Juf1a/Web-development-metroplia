import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/uploads.js';
import {
  getAllCats,
  getCatById,
  postCat,
  putCat,
  deleteCat
} from '../controllers/catController.js';

const catRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

catRouter.route('/').get(getAllCats).post(upload.single('cat'), createThumbnail, postCat);
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);


export default catRouter;