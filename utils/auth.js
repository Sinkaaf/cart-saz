const jwt = require('jsonwebtoken');
exports.tokenMaker = (userId)=>{
    let token = jwt.sign({
        userId: userId,
    }, process.env.JWT_SECRET);
    return token
}