const router = require("express").Router();
const prisma = require("../../db");
const isAdmin = require("../../middleware/auth/admin.middleware");
const authMiddleware = require("../../middleware/auth/auth.middleware");

router.get("/", async (req, res) => {
  const { category } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: category
        ? {
            categories: {
              some: {
                category: {
                  name: String(category),
                },
              },
            },
          }
        : {},
      include: {
        categories: true,
      },
    });

    return res.status(200).json({ message: "Successfully fetched", products });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        reviews: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully fetched product by id", product });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully fetched reviews by product id", reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:id/reviews", authMiddleware, async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const userId = Number(req.user.userId);
    const { rating, comment } = req.body;
    const ratingNum = Number(rating);

    if (ratingNum < 1 || ratingNum > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const purchased = await prisma.orderItem.findFirst({
      where: {
        productId,
      },
      include: {
        order: true,
      },
    });

    if (!purchased || purchased.order.userId !== userId) {
      return res.status(403).json({
        message: "You can review only purchased products",
      });
    }

    const existing = await prisma.review.findUnique({
      where: {
        userId_productId: {
        userId, productId
        }
      }
    })

    if(existing){
      return res.status(400).json({
        message: "You already reviewed this product"
      })
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating: ratingNum,
        comment: comment ?? "",
      },
    });

    return res
      .status(201)
      .json({ message: "Review successfully created", review });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ message: "Some required data missing" });
    }
    if (price < 0 || stock < 0) {
      return res.status(400).json({ message: "wrong data" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description ? description : "",
        price,
        stock,
      },
      select: {
        name: true,
        description: true,
        price: true,
        stock: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Product successfully created", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: name ? name : product.name,
        description: description ? description : product.description,
        price: price !== undefined ? Number(price) : product.price,
        stock: stock !== undefined ? Number(stock) : product.stock,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully updated", product: updated });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json("Product not found");
    }

    const deleted = await prisma.product.delete({ where: { id } });

    return res.status(200).json({ message: "Successfully deleted", deleted });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
