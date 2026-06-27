const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../db");
const AppError = require("../../utils/AppError");


const register = async ({ email, password, name }) => {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new AppError(400, "User with this email already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPass, name },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isMatching = await bcrypt.compare(password, user.password);

  if (!isMatching) {
    throw new AppError(401, "Wrong credentials");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: { userId: user.id, username: user.name, email: user.email, role: user.role },
  };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

module.exports = { register, login, getMe };