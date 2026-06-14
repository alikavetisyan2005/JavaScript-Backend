const router = require("express").Router();
const prisma = require("../../db");
const authMiddleware = require("../../middleware/auth/auth.middleware");
const isAdmin = require("../../middleware/auth/admin.middleware");

router.get("/", async(req, res) => {
    try {
        const categories = await prisma.category.findMany();
        return res.status(200).json({message: "Successfully fetched categories", categories});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

router.post("/",authMiddleware, isAdmin,  async(req, res) => {
    try {
        const {name, description} = req.body;
        if(!name){
            return res.status(400).json({message: "Some required data missing"})
        }

        const category = await prisma.category.create({
            data: {
                name,
                description: description ? description : ""
            },
            select: {
                name: true,
                description: true
            }
        });

        return res.status(201).json({message: "Successfully created category", category})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

router.delete("/:id",authMiddleware, isAdmin, async(req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await prisma.category.findUnique({where: {id}});
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }

        const deleted = await prisma.category.delete({where: {id}})
        return res.status(200).json({message: "Successfully deleted", category: deleted})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;

