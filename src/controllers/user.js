const { validationResult } = require('express-validator');
const userModel = require("../models/user");
module.exports = {
  login: (req,res) => res.render("users/login",{title:"Access"}),
  register: (req,res) => res.render("users/register",{title:"Join"}),
  save: (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register",{ errors: errors.mapped(),title:"Join",old:req.body });
    }else{
      userModel.create(req.body);
      return res.redirect("/user/login");
    }
  },
  access: (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login",{ errors: errors.mapped(),title:"Access", old:req.body });
    }else{
      let user = userModel.findByEmail(req.body.email);
      if(req.body.remember){
        res.cookie("email",req.body.email,{maxAge:300000})
      }
      req.session.user = user;
      return res.redirect("/")
    }
  },
  profile:(req,res) => res.render("users/profile",{title:"Profile"}),
  update: (req,res) => {
    userModel.update(req.body,null);
    delete req.session.user;
    let user = userModel.findByEmail(req.body.email);
    req.session.user = user;
    return res.redirect("/")
  },
  avatar: (req,res) => {
    userModel.update(req.session,req.file);
    delete req.session.user;
    let user = userModel.findByEmail(req.body.email);
    req.session.user = user;
    return res.redirect("/")
  },
  logout: (req,res) => {
    res.cookie("email",req.session.user.email,{maxAge:0})
    delete req.session.user;
    return res.redirect("/")
  }
}