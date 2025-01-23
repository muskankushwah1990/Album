const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {


  static getSingleUser = async (req, res) => {
    try {
      const {id} = req.userdata;
      // console.log(id)
      const singleUser =await userModel.findById(id);
      res
      .status(200)
      .json({ status: "success", singleUser });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (user) {
        res
          .status(400)
          .json({ status: "failed", message: "Email already exists!" });
      } else {
        if (name && email && password) {
          const hashpassword = await bcrypt.hash(password, 10);
          const result = new userModel({
            name: name,
            email: email,
            password: hashpassword,
          });
          const newUser = await result.save();
          res
            .status(200)
            .json({
              status: "success",
              message: "Registration successfull!",
              newUser,
            });
        } else {
          res
            .status(400)
            .json({ status: "failed", message: "All fields are required!" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET_KEY
            );
            res
              .status(200)
              .cookie("token", token)
              .json({ status: "success", message: "Login OK", token });
          } else {
            res
              .status(400)
              .json({
                status: "failed",
                message: "email or password is incorrect!",
              });
          }
        } else {
          res
            .status(400)
            .json({
              status: "failed",
              message: "User Not Found. Please register! ",
            });
        }
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "All fields are required!" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res
        .status(200)
        .clearCookie("token", {
          httpOnly: true,
          expire: new Date(Date.now()),
        })
        .json({ status: "success", message: "Logout successfully!" });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = userController;
