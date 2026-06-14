const router = require("express").Router();
const prisma = require("../../db");
const authMiddleware = require("../../middleware/auth/auth.middleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart successfuly fetched", cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/items", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Some required data missing" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId),
      },
    });

    let cartItem;

    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: Number(quantity) + Number(existingItem.quantity),
        },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          quantity: Number(quantity),
        },
      });
    }

    return res
      .status(201)
      .json({ message: "Item successfully created", cartItem });
  } catch (error) {
    return res.status(500).json({ message: "Inetrnal server error" });
  }
});

router.put("/items/:id", authMiddleware, async(req, res) => {
    try {
        const cartItemId = Number(req.params.id);
        const userId = Number(req.user.userId);
        const {quantity} = req.body;

        if(quantity < 0){
            return res.status(400).json({message: "Invalid data"});
        }

        const cartItem = await prisma.cartItem.findFirst({where: {
            id: cartItemId,
            cart: {
                userId
            }
        }})

        if(!cartItem){
            return res.status(404).json({message: "Cart Item not found"});
        }

        const updatedItem = await prisma.cartItem.update({
            where: {
                id: cartItemId
            },
            data: {
                quantity
            },
            include: {
                product: true
            }
        })

        return res.status(200).json({message: "Item successfully updated", updatedItem})

    } catch (error) {
        return res.status(500).json({message: "Internal serber error"});
    }
})

router.delete("/items/:id", authMiddleware, async(req, res) => {
    try {
        const cartItemId = Number(req.params.id);
        const userId = Number(req.user.userId);

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cart: {
                    userId
                }
            }
        })
        if(!cartItem){
            return res.status(404).json({message: "Cart item not found"})
        }

        await prisma.cartItem.delete({
            where: {
                id: cartItemId
            }
        })

        return res.status(200).json({message: "Item successfully deleted", cartItem})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;
