const AppError = require("../../utils/AppError");
const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        throw new AppError(400, "Reqiured data missed");
    }

    const user = await authService.register({ email, password, name });
    return res.status(201).json({ message: "User registered successfully", user });

  } catch (error) {
    next(error)
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "Some required data missing");
    }

    const result = await authService.login({ email, password });
    return res.status(200).json({ message: "User logged successfully", ...result });

  } catch (error) {
    next(error)
}
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.userId);
    return res.status(200).json({ message: "Get user", user });

  } catch (error) {
    next(error)
};
}

module.exports = { register, login, getMe }