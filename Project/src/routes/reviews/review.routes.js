const router = require("express").Router();
const prisma = require("../../db");
const authMiddleware = require("../../middleware/auth/auth.middleware");


router.delete("/:id", authMiddleware, async(req, res) => {
    try {
        const reviewId = Number(req.params.id);
        const userId = Number(req.user.userId);

        const isOwner = await prisma.review.findFirst({
            where: {
                id: reviewId,
                userId
            }
        })
        

        if(!isOwner){
            return res.status(403).json({
                message: "Review can be deleted only by its owner"
            })
        }


        const review = await prisma.review.delete({
            where: {id: reviewId}
        })
        return res.status(200).json({
            message: "Review successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router