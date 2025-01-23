const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const checkAuth = async (req, res, next) => {
  // console.log("hello auth");
  const { token } = req.cookies;
  // console.log("auth token", token);
  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userdata = await userModel.findOne({ _id: data.id });

    if (!userdata) {
      return res.status(401).json({
        status: "failed",
        message: "User Not Found",
      });
    }

    req.userdata = userdata;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkAuth;
