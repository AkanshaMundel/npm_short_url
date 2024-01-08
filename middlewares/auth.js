
const {getUser} = require("../service/auth")

function checkForAuthentication(req, res, next){
    // const authorizationHeaderValue = req.headers['authorization'];-> for jwt
    const tokenCookie = req.cookies?.token;
    console.log("tokens", tokenCookie);
    req.user = null;
    if(!tokenCookie ) return next();
    
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith['Bearer']){
    //     return next();
    // }
 
    // now validate if have 
    // const token = authorizationHeaderValue.split('Bearer ')[1];
    // const user = getUser(token)

    const token = tokenCookie;//getting c
    const user = getUser(token);

    req.user = user;
    console.log("uuu", req.user)
    return next();
}

function restrictTo(roles=[]){
    return function(req, res, next){
        console.log("role", roles, req.user.role)
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("UnAuthorised")

        return next()
    }
}
// async function restrictToLoggedinUserOnly (req, res, next){
//     // console.log("from middle ware req", req)
// const  userUid = req?.cookies?.uid; //as here am using cookies so pack use cookie-parser
// console.log("------------userUid", userUid)

// if(!userUid) return res.redirect("/login");
// const user = getUser(userUid);
// if(!user) return res.redirect("/login");
// req.user = user;
// next();



// }

// //this middleware checking just check whether the user is login in 
// async function  checkAuth(req, res, next){

// const  userUid = req?.cookies?.uid; //as here am using cookies so pack use cookie-parser
// const user = getUser(userUid);
// // if(!user) return res.redirect("/Login");
// req.user = user;
// next();




// }
module.exports = {
    // restrictToLoggedinUserOnly,checkAuth
    checkForAuthentication, restrictTo
}

//now in this middle wre we wnat to check the given loged in user will able to ascces only 