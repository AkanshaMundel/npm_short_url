const express = require("express");
const router = express.Router();
const {handleuserSignup,handleuserLogin} = require ("../controllers/user")

router.post("/",handleuserSignup)

router.post("/login",handleuserLogin)

module.exports = router