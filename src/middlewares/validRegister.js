const { body } = require("express-validator");
const userModel = require("../models/user");
module.exports = [
  body("email").isEmail().custom(value => {
    let registered = userModel.findByEmail(value);
    if (registered) {
      return Promise.reject('E-mail already exists');
    }
    return true
  }),
  body("password").isLength({ min: 5 })
]