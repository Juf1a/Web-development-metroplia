import {
  getAllCats,
  getCatById,
  addCat,
  getCatsByUser,
  updateCat,
  deleteCat as deleteCatModel
} from "../models/catModel.js";

const catList = async (req, res, next) => {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

const catById = async (req, res, next) => {
  try {
    const cat = await getCatById(req.params.id);

    if (!cat) {
      const err = new Error('Cat not found');
      err.status = 404;
      return next(err);
    }
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    const catData = {
      ...req.body,
      owner: res.locals.user.user_id,
      filename: req.file ? req.file.filename : null
    };

    const id = await addCat(catData);

    res.status(201).json({
      message: 'New cat added.',
      cat_id: id
    });
  } catch (err) {
    next(err);
  }
};

const putCat = async (req, res, next) => {
  try {
    const cat = await getCatById(req.params.id);

    if (!cat) {
      const err = new Error('Cat not found');
      err.status = 404;
      return next(err);
    }

    if (res.locals.user.role !== 'admin' && Number(cat.owner) !== Number(res.locals.user.user_id)) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const updateData = {
      cat_name: req.body.cat_name,
      weight: req.body.weight,
      birthdate: req.body.birthdate
    };

    if (req.file) {
      updateData.filename = req.file.filename;
    }

    const result = await updateCat(req.params.id, updateData, res.locals.user);

    if (!result || result.affectedRows === 0) {
      const err = new Error('Cat not found');
      err.status = 404;
      return next(err);
    }

    res.json({ message: 'Cat item updated.' });
  } catch (err) {
    next(err);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const cat = await getCatById(req.params.id);

    if (!cat) {
      const err = new Error('Cat not found');
      err.status = 404;
      return next(err);
    }

    if (res.locals.user.role !== 'admin' && Number(cat.owner) !== Number(res.locals.user.user_id)) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const result = await deleteCatModel(req.params.id, res.locals.user);

    if (!result || result.affectedRows === 0) {
      const err = new Error('Cat not found');
      err.status = 404;
      return next(err);
    }

    res.json({ message: 'Cat item deleted.' });
  } catch (err) {
    next(err);
  }
};

export const catsByUser = async (req, res, next) => {
  try {
    if (res.locals.user.role !== 'admin' && Number(res.locals.user.user_id) !== Number(req.params.id)) {
      const err = new Error('Forbidden');
      err.status = 403;
      return next(err);
    }

    const cats = await getCatsByUser(req.params.id);
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

export { catList, catById, postCat, putCat, deleteCat };