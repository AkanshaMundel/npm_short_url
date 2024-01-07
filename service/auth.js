const sessionIdToUserMap = new Map();
 
//will pass is and user 
function setUser(id, user){
    return sessionIdToUserMap.set(id, user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports ={
    setUser, getUser
}


//on refresh my local server my abobe cookies store map will empty have to login in again 
//also we want to filter all link  which tht login person created so go in mpdel and mention the reference therer user 