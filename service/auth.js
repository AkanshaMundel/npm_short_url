// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken')
const secret = "Akansha$5iio"

 
//will pass is and user 
function setUser(user){
    // return sessionIdToUserMap.set(id, user);
    return jwt.sign({_id:user._id, email:user.email, role:user.role},secret)
}

function getUser(token){
if(!token) return null;
    // return sessionIdToUserMap.get(id);
    try{
        return jwt.verify(token,secret)

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