const User = require('../models/User');
const AppError = require('../utils/AppError');
const hashToken = require('../utils/hash');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/token');
 

async function register({ name, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError(409, 'Email is already in use');
  }
 
  const passwordHash = await User.hashPassword(password);
 
  const user = await User.create({
    name,
    email,
    passwordHash,
    role: role || 'member',
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
 
  return {
    user,
    accessToken,
    refreshToken
  }; 
}
 
async function login({email, password}) {
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }
 
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError(401,'Invalid email or password');
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  const hashedToken = await hashToken(refreshToken);
  user.refreshTokenHash = hashedToken
 
  await user.save();
  return {
    user,
    accessToken,
    refreshToken,
  }
}

async function refresh(refreshToken){
  if (!refreshToken) {
    throw new AppError(401, "Refresh token required");
  }

  const payload = verifyRefreshToken(refreshToken);

  const user = await User.findById(payload.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken
  };
}
 
async function findById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404,'User not found');
  }
  return user;
}


 
module.exports = { register, login, findById, refresh };