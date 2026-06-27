const productService = require("../services/product.service");

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query.category);
    return res.status(200).json({ message: "Successfully fetched", products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    return res.status(200).json({ message: "Successfully fetched product", product });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await productService.getReviews(Number(req.params.id));
    return res.status(200).json({ message: "Successfully fetched reviews", reviews });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await productService.createReview(
      Number(req.params.id),
      Number(req.user.userId),
      req.body
    );
    return res.status(201).json({ message: "Review successfully created", review });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({ message: "Product successfully created", product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(Number(req.params.id), req.body);
    return res.status(200).json({ message: "Successfully updated", product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await productService.deleteProduct(Number(req.params.id));
    return res.status(200).json({ message: "Successfully deleted", deleted });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getReviews,
  createReview,
  createProduct,
  updateProduct,
  deleteProduct,
};