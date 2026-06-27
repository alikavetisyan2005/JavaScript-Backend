const { Prisma } = require("@prisma/client");
const prisma = require("../db");
const AppError = require("../../utils/AppError");

const ALLOWED_STATUSES = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const checkout = async (userId) => {
  return await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError(400, "Cart is empty");
    }

    let total = new Prisma.Decimal(0);

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new AppError(400, `Insufficient stock for ${item.product.name}`);
      }
      total = total.plus(new Prisma.Decimal(item.product.price).mul(item.quantity));
    }

    const order = await tx.order.create({
      data: {
        userId,
        status: "PENDING",
        total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of cart.items) {
      const updated = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });

      if (updated.count === 0) {
        throw new AppError(409, "Stock changed during checkout, please try again");
      }
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  });
};

const getOrders = async (userId, userRole) => {
  if (userRole === "ADMIN") {
    return await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
    });
  }

  return await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } }, user: true },
  });
};

const getOrderById = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) throw new AppError(404, "Order not found");

  return order;
};

const updateStatus = async (orderId, status) => {
  if (!ALLOWED_STATUSES.includes(status)) {
    throw new AppError(400, "Invalid status");
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, "Order not found");

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

module.exports = { checkout, getOrders, getOrderById, updateStatus };