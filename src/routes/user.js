const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require("../controllers/user");
const isLogged = require("../middlewares/logged");
const validLogin = require("../middlewares/validLogin");
const validRegister = require("../middlewares/validRegister");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,"../../public/images","avatar"))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload = multer({ storage: storage })

router.get("/login",controller.login)
router.get("/register",controller.register)
router.get("/profile",[isLogged],controller.profile)
router.get("/logout",[isLogged],controller.logout)
router.post("/save",validRegister,controller.save)
router.post("/access",validLogin,controller.access)
router.put("/update",controller.access)
router.put("/avatar",[isLogged,upload.single()],controller.access)

module.exports = router