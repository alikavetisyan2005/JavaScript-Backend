const prisma = require("../db");
const AppError = require("../../utils/AppError");

const getProducts = async (category) => {
  return await prisma.product.findMany({
    where: category
      ? { categories: { some: { category: { name: String(category) } } } }
      : {},
    include: { categories: true },
  });
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { categories: true, reviews: true },
  });

  if (!product) throw new AppError(404, "Product not found");

  return product;
};

const getReviews = async (productId) => {
  return await prisma.review.findMany({
    where: { productId },
    include: { user: { select: { id: true, name: true } } },
  });
};

const createReview = async (productId, userId, { rating, comment }) => {
  const ratingNum = Number(rating);

  if (ratingNum < 1 || ratingNum > 5) {
    throw new AppError(400, "Rating must be between 1 and 5");
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError(404, "Product not found");

  const purchased = await prisma.orderItem.findFirst({
    where: { productId },
    include: { order: true },
  });

  if (!purchased || purchased.order.userId !== userId) {
    throw new AppError(403, "You can review only purchased products");
  }

  const existing = await prisma.review.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) throw new AppError(400, "You already reviewed this product");

  return await prisma.review.create({
    data: { userId, productId, rating: ratingNum, comment: comment ?? "" },
  });
};

const createProduct = async ({ name, price, description, stock }) => {
  if (!name || !price || !stock) throw new AppError(400, "Some required data missing");
  if (price < 0 || stock < 0) throw new AppError(400, "Price and stock must be positive");

  return await prisma.product.create({
    data: { name, description: description || "", price, stock },
    select: { name: true, description: true, price: true, stock: true },
  });
};

const updateProduct = async (id, { name, description, price, stock }) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(404, "Product not found");

  return await prisma.product.update({
    where: { id },
    data: {
      name: name || product.name,
      description: description || product.description,
      price: price !== undefined ? Number(price) : product.price,
      stock: stock !== undefined ? Number(stock) : product.stock,
    },
  });
};

const deleteProduct = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(404, "Product not found");

  return await prisma.product.delete({ where: { id } });
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