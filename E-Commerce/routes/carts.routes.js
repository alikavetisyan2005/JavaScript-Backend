const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  const id = req.params.user_id;
  const filePath = path.join(__dirname, "../data/carts.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading carts.json" });
    }
    let carts = [];
    try {
      carts = data ? JSON.parse(data) : [];
    } catch (err) {
      return res.status(500).json({ message: "Invalid Json" });
    }

    const cart = carts.find((c) => String(c.user_id) === String(id));

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  });
});

router.post("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res
      .status(400)
      .json({ message: "Product id and quantity are required..." });
  }
  const filePath = path.join(__dirname, "../data/carts.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading carts.json" });
    }

    let carts = [];

    try {
      carts = data ? JSON.parse(data) : [];
    } catch (error) {
      return res.status(500).json({ message: "Invalid json" });
    }

    let cart = carts.find((c) => String(c.user_id) === String(user_id));

    if (!cart) {
      cart = {
        user_id: user_id,
        items: [],
      };
      carts.push(cart);
    }

    const productExists = cart.items.find(
      (i) => String(i.product_id) === String(product_id),
    );

    if (productExists) {
      productExists.quantity += quantity;
    } else {
      cart.items.push({
        product_id,
        quantity: Number(quantity),
      });
    }

    fs.writeFile(filePath, JSON.stringify(carts), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error while writing..." });
      }

      res.status(200).json({ message: "Cart updated successfully...", cart });
    });
  });
});

router.delete("/:user_id/items/:product_id", (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;

  const filePath = path.join(__dirname, "../data/carts.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading carts.json" });
    }
    let carts = [];

    try {
      carts = data ? JSON.parse(data) : [];
    } catch (error) {
      return res.status(500).json({ message: "Invalid Json" });
    }

    let cartIndex = carts.findIndex(
      (c) => String(c.user_id) === String(user_id),
    );

    if (cartIndex === -1) {
      res.status(404).json({ message: "Cart is not found" });
    }

    const cart = carts[cartIndex];

    const exists = cart.items.find(
      (i) => String(i.product_id) === String(product_id),
    );

    if (!exists) {
      return res.status(404).json({ message: "Product Not found" });
    }
    const filteredItems = cart.items.filter(
      (i) => String(i.product_id) !== String(product_id),
    );

    carts[cartIndex] = {
      ...cart,
      items: filteredItems,
    };

    fs.writeFile(filePath, JSON.stringify(carts), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error while writing..." });
      }

      res.status(200).json({
        message: "Successfully deleted...",
        cart: carts[cartIndex],
      });
    });
  });
});

router.delete("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const filePath = path.join(__dirname, "../data/carts.json");

    fs.readFile(filePath, "utf-8", (err, data) => {
        if(err){
            return res.status(500).json({message: "Error while reading..."});
        }
        let carts = [];

        try {
            carts = data ? JSON.parse(data) : [];
        } catch (error) {
            return res.status(500).json({message: "invalid json"});
        }

        const cartIndex = carts.findIndex(c => String(c.user_id) === String(user_id));
        
        if(cartIndex === -1){
            return res.status(404).json({message: "Cart is not found"});
        }

        carts[cartIndex].items = [];
        const updated = carts[cartIndex]

        fs.writeFile(filePath, JSON.stringify(carts), (err) => {
            if(err){
                return res.status(500).json({message: "Error while writting"});
            }

            res.status(200).json({message: "Items are removed", 
                cart: updated
            })
        })




    })
})
module.exports = router;
