const express = require('express');
const imageController = require('../controllers/imageController');
const documentController = require('../controllers/documentController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');
const checkAuth = require('../middlewares/auth');
const isLogin = require('../middlewares/isLogin');

const router = express.Router()

// user controller
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/getSingleUser", checkAuth, userController.getSingleUser)



// image Controller
router.post("/insert/image", checkAuth, imageController.insert)
router.get("/delete/image/:id", checkAuth, imageController.delete)
router.get("/view/image/:id", checkAuth, imageController.view)
router.get("/getAllImage/image",checkAuth, imageController.display)

// document controller
router.post("/insert/document",checkAuth, documentController.insert)
router.get("/display/document",checkAuth, documentController.display)
router.get("/view/document/:id", checkAuth, documentController.view)
router.get("/delete/document/:id",checkAuth, documentController.delete)
router.post("/update/document/:id",checkAuth, documentController.update)


router.post("/insert/video",checkAuth, videoController.insert)
router.get("/display/video",checkAuth, videoController.display)
router.get("/view/video/:id",checkAuth, videoController.view)
router.get("/delete/video/:id",checkAuth, videoController.delete)




module.exports = router;