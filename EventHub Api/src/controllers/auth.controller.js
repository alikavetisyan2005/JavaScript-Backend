const asyncHandler = require("../utils/asyncHandler");
const userService=  require("../services/auth.service")

const register = asyncHandler(async(req, res) => {
    const {name, email, password, role} = req.body;
    const user = await userService.register({name, email, password, role});

    return res.status(201).json({user});
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await userService.login({email, password});

    return res.status(200).json({user})
})

const getUserById = asyncHandler(async(req, res) => {
    const {id} = req.params;
    const user = await userService.findById(id);
    return res.status(200).json({user})
})

const refresh = asyncHandler(async(req, res) => {
    const result = await userService.refresh(
    req.body.refreshToken
  );

  return res.status(200).json({result})
})

module.exports = {register, login, getUserById, refresh};