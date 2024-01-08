const express = require("express");
const router = express.Router();
const URL = require("../models/urls");
const { restrictTo } = require("../middlewares/auth");

//inline middleware 
router.get("/admin/urls",restrictTo(['ADMIN']),async(req, res)=>{
   
    const allUrls = await URL.find({}) //searching user id only link in urls schema 
    return res.render("home", {
        urls:allUrls
    })} )


router.get('/',restrictTo(['NORMAL', 'ADMIN']) ,async(req, res)=>{
    //till now we are fetching all url but want only now login user 
    // const allUrls = await URL.find({})
    // if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy: req.user._id}) //searching user id only link in urls schema 
    return res.render("home", {
        urls:allUrls
    })
})

router.get("/signup",(req, res)=>{
    return res.render("signup")
})
router.get("/login",(req, res)=>{
    return res.render("login")
})

module.exports = router ;

//this is for only / api 
//and in home all bacened comes in local so checking from therre 
//from herer then "signup " written it goes therer 
