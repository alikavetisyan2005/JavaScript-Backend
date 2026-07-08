const AppError = require("../utils/AppError");

const isOrganizer = (req, res, next) => {
  if (!req.user) next(new AppError(401, "not authenticated"));

  if (req.user.role.toLowerCase() !== "organizer") {
    next(new AppError(403, "Forbidden"));
  }
  next();
};

const isMember = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "member") {
    next(new AppError(403, "Forbidden"));
  }
  next();
};

module.exports = { isOrganizer, isMember };
