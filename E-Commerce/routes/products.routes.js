const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const { json } = require("node:stream/consumers");
const isAdmin = require("../middlewares/isAdmin.js");
const isAuth = require("../middlewares/isAuth.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../data/products.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading products.json" });
    }

    const products = JSON.parse(data);

    res.status(200).json(products);
  });
});

router.get("/:id", (req, res) => {
  const filePath = path.join(__dirname, "../data/products.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    let products = [];
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading products.json" });
    }
    if (data) {
      products = JSON.parse(data);
    }
    const id = req.params.id;
    let match = products.find((product) => product.id === Number(id));
    if (!match) {
      return res
        .status(400)
        .json({ message: "Product with this id does not exist" });
    }

    res.status(200).json(match);
  });
});

router.post("/", isAuth, isAdmin, (req, res) => {
  const filePath = path.join(__dirname, "../data/products.json");
  const { name, description, price } = req.body;
  if (!name || !name.trim() || price == null) {
    return res
      .status(400)
      .json({ message: "Name and Price are required fields..." });
  }

  fs.readFile(filePath, "utf-8", (err, data) => {
    let products = [];
    if (err) {
      return res
        .status(500)
        .json({ message: "error while reading products.json" });
    }
    if (data) {
      products = JSON.parse(data);
    }

    const newProd = {
      id: Date.now(),
      name,
      description: description || "",
      price,
      quantity: req.body.quantity || 1,
    };

    products.push(newProd);

    fs.writeFile(filePath, JSON.stringify(products), (err) => {
      if (err) {
        return res.status(500).json({ message: "error while writing..." });
      }

      res
        .status(201)
        .json({ message: "Successfully added...", product: newProd });
    });
  });
});

router.put("/:id",isAuth, isAdmin, (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "../data/products.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error while reading products.json",
      });
    }
    let products = [];
    try{
      products = data ? JSON.parse(data) : [];
    }
    catch(err){
      return res.status(500).json({message: "Invalid json"})
    }

  
    const productIDX = products.findIndex(p => String(p.id)  === String(id));

    if(productIDX === -1){
      return res.status(404).json({message: "Product not found..."})
    }

    products[productIDX] = {
      ...products[productIDX],
      ...req.body,
      id: products[productIDX].id
    }

    fs.writeFile(filePath, JSON.stringify(products), (err) => {
      if(err){
        return res.status(500).json({message: "Error while writing products.json"});
      }

      res.status(200).json({message: "Successfully updated",
        product: products[productIDX]
      })

    })
  });
});


router.delete("/:id", isAuth, isAdmin, (req, res) => {
  const filePath = path.join(__dirname, "../data/products.json");
  const id = req.params.id;

  fs.readFile(filePath, "utf-8", (err,data) => {
    if(err){
      return res.status(500).json({message: "Error while reading products.json"});
    }
    let products = [];

    try{
      products = data ? JSON.parse(data) : [];
    }
    catch(err){
      return res.status(500).json({message: "Invalid Json"});
    }
    const exist = products.some(p => String(p.id) === String(id))

    if(!exist){
      return res.status(404).json({message: "Product not found"});
    }

    const filteredProducts = products.filter(p => String(p.id) !== String(id));

    fs.writeFile(filePath, JSON.stringify(filteredProducts), (err) => {
      if(err){
        return res.status(500).json({message: "Error while writing"});
      }

      res.status(200).json({message: "Successfully deleted...",
      })
    })

  })
})

module.exports = router;
