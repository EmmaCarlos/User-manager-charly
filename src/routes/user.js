const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const controller = require("../controllers/user");
const isAdmin = require("../middlewares/admin");
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
router.get("/profile",controller.profile)
router.post("/save",controller.save)
router.post("/access",controller.access)
router.put("/update",controller.access)
router.put("/avatar",[isAdmin,upload.single()],controller.access)

module.exports = router