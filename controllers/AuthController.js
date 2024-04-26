const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class AuthController {
  async registration (req, res) {
    try {
      const { email, password, name } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({
        email,
        name,
        password: hashPassword,
      });

      try {
        await user.save();
      } catch (error) {
        console.log(error);
        res.send({ message: "Server error" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretJWTKey"), {
        expiresIn: "24h",
      });

      return res.json({
        message: "User was created",
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({ message: "Server error" });
    }
  }

  async login (req, res)  {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: `User not found` });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: `Invalid password` });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretJWTKey"), {
        expiresIn: "24h",
      });

      return res.json({
        message: "login success",
        token,
        user: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({ message: "Server error" });
    }
  }

  async auth (req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
  
      const token = jwt.sign({ id: user.id }, config.get("secretJWTKey"), {
        expiresIn: "96h",
      });
  
      return res.json({
        message: "Auth success",
        token,
        user: {
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({ message: "Server error" });
    }
  }
}

module.exports = new AuthController();
