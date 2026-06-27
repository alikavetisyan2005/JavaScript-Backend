const cartService = require("../services/cart.service");

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.userId);
    return res.status(200).json({ message: "Cart successfully fetched", cart });
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const cartItem = await cartService.addItem(req.user.userId, req.body);
    return res.status(201).json({ message: "Item successfully added", cartItem });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await cartService.updateItem(
      Number(req.user.userId),
      Number(req.params.id),
      req.body.quantity
    );
    return res.status(200).json({ message: "Item successfully updated", updatedItem });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const cartItem = await cartService.deleteItem(
      Number(req.user.userId),
      Number(req.params.id)
    );
    return res.status(200).json({ message: "Item successfully deleted", cartItem });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addItem, updateItem, deleteItem };