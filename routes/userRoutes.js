const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { userModel } = require("../model/usermodel");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, securepass) => {
      if (err) {
        console.log("err");
      } else {
        const user = new userModel({ email, pass: securepass });
        await user.save();
        res.send("register");
      }
    });
  } catch (err) {
    res.send(errs);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    const hashpass = user[0].pass;
    if (user.length > 0) {
      bcrypt.compare(pass, hashpass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "login", " token": token });
        } else {
          res.send("err");
        }
      });
    } else {
      res.send("err");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  userRouter,
};
