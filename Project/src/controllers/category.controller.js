const categoryService = require("../services/category.service");

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ message: "Successfully fetched categories", categories });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({ message: "Successfully created category", category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(Number(req.params.id));
    return res.status(200).json({ message: "Successfully deleted", category });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory, deleteCategory };