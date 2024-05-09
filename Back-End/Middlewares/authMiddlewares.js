const jwt = require('jsonwebtoken')
const authModel = require('../Models/User');

const checkuserauthecated = async (req, res, next)=>{
    let token;
    const {authorization} = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const {userID} = jwt.verify(token, "pleaseSubscribe");
            req.user = await authModel.findById(userID).select("--password");
            next()
        } catch (error) {
        return res.status(401).json({message : "unAuthorized User"})
        }
    }else{
        return res.status(401).json({message : "unAuthorized User"})
    }
}

module.exports = checkuserauthecated;