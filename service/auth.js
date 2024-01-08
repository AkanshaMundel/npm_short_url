// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken')
const secret = "Akansha$5iio"
 
//will pass is and user 
function setUser( user){
    // return sessionIdToUserMap.set(id, user);

   return jwt.sign({_id:user._id, email:user.email},secret);
}

function getUser(token){
    if(!token) return null;
    // return sessionIdToUserMap.get(id);
    try{

        return jwt.verify(token, secret) //can easily get access you acc if you share your token with then with secrete key 
    }
    catch{
        return null;
    }
}

module.exports ={
    setUser, getUser
}


//on refresh my local server my abobe cookies store map will empty have to login in again 
//also we want to filter all link  which tht login person created so go in mpdel and mention the reference therer user 
//commeneted for state auth using cookies


//simply if want to send my jwt token there is two ways
// cookies -> if once user is created then its token is store and saved in webbrowser then in any request this cookis is trafer will
// check he token , get all cookies and validate

// response 
//user ki device m pass krhe header 
