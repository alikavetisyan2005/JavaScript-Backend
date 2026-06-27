const orderService = require("../services/order.service");

const checkout = async (req, res, next) => {
  try {
    const order = await orderService.checkout(req.user.userId);
    return res.status(201).json({ message: "Successfully created order", order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders(req.user.userId, req.user.role);
    return res.status(200).json({ message: "Successfully fetched orders", orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(Number(req.params.id));
    return res.status(200).json({ message: "Successfully fetched order", order });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateStatus(Number(req.params.id), req.body.status);
    return res.status(200).json({ message: "Status updated successfully", order });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout, getOrders, getOrderById, updateStatus };