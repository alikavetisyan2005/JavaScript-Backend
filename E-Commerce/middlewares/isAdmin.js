function isAdmin(req, res, next) {
    console.log("ROLE:", req.user?.role);

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Only admin..."
        });
    }

    next();
}

module.exports = isAdmin