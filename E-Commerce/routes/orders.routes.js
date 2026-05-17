const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");

const router = express.Router();

router.post("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try{

    const cartsData = await fs.readFile("./data/carts.json","utf-8")
    const productsData = await fs.readFile("./data/products.json","utf-8")
    const ordersData = await fs.readFile("./data/orders.json","utf-8")

    const carts = cartsData ? JSON.parse(cartsData) : [];
    const products = productsData ? JSON.parse(productsData) : [];
    const orders = ordersData ? JSON.parse(ordersData) : [];


    const cart = carts.find(c => String(c.user_id) === String(user_id));

    if(!cart || cart.items.length === 0) {
        return res.status(404).json({message: "Cart is empty"});
    }

    let total = 0;

    for(const item of cart.items){
        const product = products.find(p => String(p.id) === String(item.product_id));

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        if(product.quantity < item.quantity){
            return res.status(400).json({message: "Not enough quantity"});
        }

        total += product.price * item.quantity;
    }

    for(const item of cart.items) {

        const product = products.find(p => String(p.id) === String(item.product_id));

        product.quantity -= item.quantity;
    }

    const newOrder = {
        id: Date.now(),
        user_id,
        order_date: new Date().toISOString(),
        items: cart.items,
        total_amount: total,
        status: "pending"
    }

    orders.push(newOrder);

    cart.items = [];

    await fs.writeFile('./data/orders.json', JSON.stringify(orders))
    await fs.writeFile('./data/products.json', JSON.stringify(products))
    await fs.writeFile('./data/carts.json', JSON.stringify(carts))

    res.status(201).json({
        message: "Order created successfully",
        order: newOrder
    });
}
catch(err){
    res.status(500).json({message: "Internal server error"})
}

})
router.get("/user/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const filePath = path.join(__dirname, "../data/orders.json");

        const data = await fs.readFile(filePath, "utf-8");

        let orders = [];

        try {
            orders = data ? JSON.parse(data) : [];
        } catch (e) {
            return res.status(500).json({
                message: "Invalid JSON format"
            });
        }

        const userOrders = orders.filter(
            o => String(o.user_id) === String(user_id)
        );

        if (userOrders.length === 0) {
            return res.status(404).json({
                message: "Not found"
            });
        }

        return res.status(200).json({
            message: "Your orders",
            userOrders
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/:id", async(req, res) => {
    try{
    const id = req.params.id;


    const filePath = path.join(__dirname, "../data/orders.json");

    const data = await fs.readFile(filePath, "utf-8");

    const orders = data ? JSON.parse(data) : [];

    const order = orders.find(o => String(o.id) === String(id));

    if(!order){
        return res.status(400).json({message: "Not found"});
    }

    res.status(200).json({message: "Order ny id", 
        order
    })
} catch(err){
    res.status(500).json({message: "Server error"})
}
})


module.exports = router;