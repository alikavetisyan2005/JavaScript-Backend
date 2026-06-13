const isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({message: "Not authorized"});
        }
        if(user.role !== "ADMIN"){
            return res.status(403).json({message: "Only allowed to admin"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = isAdmin