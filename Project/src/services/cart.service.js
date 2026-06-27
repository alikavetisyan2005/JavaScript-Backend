const prisma = require("../db")
const AppError = require("../../utils/AppError");

const getCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) throw new AppError(404, "Cart not found");

  return cart;
};

const addItem = async (userId, { productId, quantity }) => {
  if (!productId || !quantity || quantity < 1) {
    throw new AppError(400, "Some required data missing");
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });
  if (!product) throw new AppError(404, "Product not found");

  let cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: Number(quantity) + Number(existingItem.quantity) },
    });
  }

  return await prisma.cartItem.create({
    data: { cartId: cart.id, productId: Number(productId), quantity: Number(quantity) },
  });
};

const updateItem = async (userId, cartItemId, quantity) => {
  if (quantity < 0) throw new AppError(400, "Invalid quantity");

  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, cart: { userId } },
  });
  if (!cartItem) throw new AppError(404, "Cart item not found");

  return await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: { product: true },
  });
};

const deleteItem = async (userId, cartItemId) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, cart: { userId } },
  });
  if (!cartItem) throw new AppError(404, "Cart item not found");

  await prisma.cartItem.delete({ where: { id: cartItemId } });

  return cartItem;
};

module.exports = { getCart, addItem, updateItem, deleteItem };