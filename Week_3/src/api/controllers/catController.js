import {
  getAllCats,
  getCatById,
  addCat,
  getCatsByUser
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
    filename: req.file ? req.file.filename : null
  };

  const id = await addCat(catData);

  res.status(201).json({
    message: 'New cat added.',
    cat_id: id
  });
};

const putCat = async (req, res) => {
  res.json({ message: 'Cat item updated.' });
};

const deleteCat = async (req, res) => {
  res.json({ message: 'Cat item deleted.' });
};

export const catsByUser = async (req, res) => {
  const cats = await getCatsByUser(req.params.id);
  res.json(cats);
};

export { catList, catById, postCat, putCat, deleteCat };