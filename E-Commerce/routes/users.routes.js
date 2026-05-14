const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Users.api works well");
});

router.get("/all", (req, res) => {
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("error reading users file");
    }
    const users = JSON.parse(data);

    res.status(200).json(users);
  });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const { username, email, password } = newUser;
  if (
    !username ||
    !username.trim() ||
    !email ||
    !email.trim() ||
    !password ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ message: "username, email and password are required" });
  }
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    let users = [];
    if (err) {
      return res.status(500).json({ message: "Error while reading data" });
    }
    if (data) {
      users = JSON.parse(data);
    }

    const usernameMatch = users.some((user) => user.username === username);
    const mailMatch = users.some((user) => user.email === email);
    if (usernameMatch) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }
    if (mailMatch) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = {
      id: Date.now(),
      username,
      email,
      password,
      role: newUser.role || "customer",
    };
    users.push(user);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error while saving user" });
      }

      res.status(201).json({
        message: "User successfully added...",
        username: user.username,
        email: user.email,
        role: user.role,
      });
    });
  });
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  const { username, email, password, role } = newUser;

  if (
    !username ||
    !username.trim() ||
    !email ||
    !email.trim() ||
    !password ||
    !password.trim()
  ) {
    return res.status(400).json({
      message: "Username, Email, and Password fields are required...",
    });
  }

  const filePath = path.join(__dirname, "../data/users.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    let users = [];
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading users.json" });
    }
    if (data) {
      users = JSON.parse(data);
    }

    const usernameMatch = users.some((user) => user.username === username);
    const mailMatch = users.some((user) => user.email === email);
    if (usernameMatch) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }
    if (mailMatch) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const user = {
      id: Date.now(),
      username,
      email,
      password,
      role: role || "customer",
    };
    users.push(user);

    fs.writeFile(filePath, JSON.stringify(users), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Errowhile writing users.json" });
      }

      res.status(201).json({
        message: "User successfuly registered",
        username,
        email,
        role,
      });
    });
  });
});

router.post("/login", (req, res) => {
  const body = req.body;
  const filePath = path.join(__dirname, "../data/users.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    let users = [];
    if (err) {
      return res
        .status(500)
        .json({ message: "Error while reading users.json" });
    }
    if (data) {
      users = JSON.parse(data);
    }

    const match = users.find(
      (user) => user.username === body.identifier || user.email === body.identifier,
    );

    if (!match) {
      return res.status(404).json({ message: "User not found" });
    }

    if (match.password !== body.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: match.id,
        role: match.role,
        username: match.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user:{
      user_id: match.id,
      username: match.username,
      email: match.email,
      role: match.role,
  }});
  });
});

module.exports = router;
