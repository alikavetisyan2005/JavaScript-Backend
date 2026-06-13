const router = require("express").Router();
const bcrypt = require("bcrypt");
const prisma = require("../../db")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth/auth.middleware");



router.post("/register", async(req, res) => {
    try {
        const {email, password, name} = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({message: "Required data missed"})
        }
        const existing = await prisma.user.findUnique({where: {email}})

        if(existing){
            return res.status(409).json({message: "User with email already exists"})
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPass,
                name
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        })

        res.status(201).json({message: "User registered successfully", user})

    } catch (error) {
        res.status(500).json({message: "Internal server Error"})
        
    }
})

router.post("/login", async(req, res) => {
    try{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Some required data missing"})
    }



    const user = await prisma.user.findUnique({where: {email}})
    
    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const isMatching = await bcrypt.compare(password, user.password)

    if(!isMatching){
        return res.status(401).json({message: "Wrong credentials"})

    }

    const token = jwt.sign({
        userId: user.id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
    )


    return res.status(200).json({message: "User logged successfully", token, user: {
        userId: user.id,
        username: user.name,
        email: user.email,
        role: user.role
    }},

    )
}
catch(err){
    res.status(500).json({message: "Internal server error"})
}

})

router.get("/me",authMiddleware,  async (req, res) => {
    try {
        const user = await prisma.user.findUnique({where: {id: req.user.userId}
        ,
    select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
    }})
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        return res.status(200).json({message: "Get user", user})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }

})

module.exports = router