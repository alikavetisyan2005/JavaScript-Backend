const router = require("express").Router();
const { Prisma } = require("@prisma/client");
const prisma = require("../../db");
const authMiddleware = require("../../middleware/auth/auth.middleware");
const HttpError = require("../../utils/HttpResponseError");
const isAdmin = require("../../middleware/auth/admin.middleware");

router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const order = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new HttpError(400, "Cart is Empty");
      }

      let total = new Prisma.Decimal(0);

      for (const item of cart.items) {
        const product = item.product;

        if (product.stock < item.quantity) {
          throw new HttpError(400, "Insufficient stock");
        }

        total = total.plus(
          new Prisma.Decimal(product.price).mul(item.quantity),
        );
      }

      const createdOrder = await tx.order.create({
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
        include: {
          items: true,
        },
      });

      for (const item of cart.items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (updated.count === 0) {
          throw new HttpError(409, "Stock changed during checkout for product");
        }
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return createdOrder;
    });

    return res.status(201).json({
      message: "Successfully created order",
      order,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userRole = req.user.role;

    if (userRole === "ADMIN") {
      const orders = await prisma.order.findMany();
      return res
        .status(200)
        .json({ message: "Successfully fetched all orders for admin", orders });
    } else {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: true,
        },
      });
      return res
        .status(200)
        .json({ message: "Successfuly fetched users orders", orders });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const orderId = Number(req.params.id);


    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: {
            include: {
                product: true
            }
        },
        user: true
      }
    });

    if(!order){
        return res.status(404).json({message: "Order not found"})
    }

    return res.status(200).json({message: "Successfuly fetched order by id", order})
    
  } catch (error) {
    return res.status(500).json({message: "Internal server error"});
  }
});

router.patch("/:id/status", authMiddleware, isAdmin, async(req, res) => {
    
    const allowedStatuses = [
        "PENDING",
        "PAID",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
    ]
    try{
    const {status} = req.body;
    if(!allowedStatuses.includes(status)){
        return res.status(400).json({message: "Unexpected status"})
    }
    const orderId = Number(req.params.id);
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if(!order){
        return res.status(404).json({message: "Order not found"})
    }

    const updated = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status
        }
    })


    return res.status(200).json({message: "Updated status successfully", order: updated})

    }
    catch(error){
        return res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;
