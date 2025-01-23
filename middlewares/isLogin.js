const jwt = require("jsonwebtoken");
const {login} = require("../controllers/userController");
const userModel = require("../models/user");

const isLogin = async (req, res, next) => {
    const {token} = req.cookies;
    console.log("isLogintoken", token);

    if(token) {
      const login = jwt.decode(token);
        const data = await userModel.findOne({_id: login.id})

        if(data) {
           return res.redirect("/home")
        }

        next();
    }else{
        next();
    }
};

module.exports = isLogin;