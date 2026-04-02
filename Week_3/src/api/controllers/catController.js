import {searchCatbyId, addCat, allCatItems } from "../models/catModel.js";

const getAllCats = (req, res) => {
    res.json(allCatItems())
};

const getCatById = (req, res) => {
  const cat = searchCatbyId(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
    res.json({ message: 'Cat item updated.' });
};

const deleteCat = (req, res) => {
    res.json({ message: 'Cat item deleted.' });
};

export {getAllCats, getCatById, postCat, putCat, deleteCat};