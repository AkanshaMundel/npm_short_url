const User = require('../models/user')
const { v4 :uuidv4 } = require('uuid')
const {setUser, getUser}=  require('../service/auth.js')

async function handleuserSignup
(req, res){
    const {name, email ,password} = req.body;
    await User.create({
        name, password, email
    });
    // return res.render("home")// as we are working with ejs so render using or elsejson 
    return res.redirect("/");
    
}

//gonna generating the unique id say session id 
async function handleuserLogin
(req, res){
    const { email ,password} = req.body;

   const user =  await User.findOne({email, password})
   console.log("user login", user)
    if(!user) return res.render("login", {
        error:"Invaild user or password"
    });
    // const sessionId = uuidv4()
    const token = setUser(user);
    return res.json({token}) //now we passing token in response 
    //this is way to send in cookies 
    // res.cookie("uid", token, 
    // // {
    // //     domain:"www.google.com" then only creae its domain sa,
    // // }
    // // {
    // //     expires:new Date(Date.now()+9000000)
    // // }
    // )



        // setUser(sessionId, user)
        //now i want to set as cookies 
        // res.cookie("uid", sessionId)
        // return res.redirect("/");
    // return res.render("home")// as we are working with ejs so render using or elsejson 
    
    
}
module.exports = {handleuserSignup, handleuserLogin}

