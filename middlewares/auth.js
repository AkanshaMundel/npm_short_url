
const {getUser} = require("../service/auth")

async function restrictToLoggedinUserOnly (req, res, next){
    // console.log("from middle ware req", req)
    //this way check if send in cookies 
// const  userUid = req?.cookies?.uid; //as here am using cookies so pack use cookie-parser
// console.log("------------userUid", userUid)
const userUid = req.headers['authorization'];


if(!userUid) return res.redirect("/login");
const token = userUid.split(' Bearer ')[1] ;// token store as Bearer 3489347
const user = getUser(userUid);
if(!user) return res.redirect("/login");
req.user = user;
next();



}

//this middleware checking just check whether the user is login in 
async function  checkAuth(req, res, next){
    console.log("req.headers", req.headers)
    const userUid = req.headers['authorization'];//have got to konw from colnsole 
    
    const token = userUid.split('Bearer ')[1] ;
const user = getUser(token);//passing the tokens 
// const  userUid = req?.cookies?.uid; //as here am using cookies so pack use cookie-parser
// const user = getUser(userUid);
// if(!user) return res.redirect("/Login");
req.user = user;
next();




}
module.exports = {
    restrictToLoggedinUserOnly,checkAuth
}

//now in this middle wre we wnat to check the given loged in user will able to ascces only 