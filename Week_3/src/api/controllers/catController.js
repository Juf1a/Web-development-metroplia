import {
  getAllCats,
  getCatById,
  addCat,
  getCatsByUser,
  updateCat,
  deleteCat as deleteCatModel
} from "../models/catModel.js";

const catList = async (req, res) => {
  const cats = await getAllCats();
  res.json(cats);
};

const catById = async (req, res) => {
  const cat = await getCatById(req.params.id);

  if (!cat) {
    return res.sendStatus(404);
  }
  res.json(cat);
};

const postCat = async (req, res) => {
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
};

const putCat = async (req, res) => {
  const cat = await getCatById(req.params.id);

  if (!cat) {
    return res.sendStatus(404);
  }

  if (res.locals.user.role !== 'admin' && Number(cat.owner) !== Number(res.locals.user.user_id)) {
    return res.sendStatus(403);
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
    return res.sendStatus(404);
  }

  res.json({ message: 'Cat item updated.' });
};

const deleteCat = async (req, res) => {
  const cat = await getCatById(req.params.id);

  if (!cat) {
    return res.sendStatus(404);
  }

  if (res.locals.user.role !== 'admin' && Number(cat.owner) !== Number(res.locals.user.user_id)) {
    return res.sendStatus(403);
  }

  const result = await deleteCatModel(req.params.id, res.locals.user);

  if (!result || result.affectedRows === 0) {
    return res.sendStatus(404);
  }

  res.json({ message: 'Cat item deleted.' });
};

export const catsByUser = async (req, res) => {
  if (res.locals.user.role !== 'admin' && Number(res.locals.user.user_id) !== Number(req.params.id)) {
    return res.sendStatus(403);
  }

  const cats = await getCatsByUser(req.params.id);
  res.json(cats);
};

export { catList, catById, postCat, putCat, deleteCat };