const jwt=require('jsonwebtoken');
const config=require('config');
const user = require('../models/user');
const secret=process.env.secret;
const verifyAuth=async(req,res,next)=>{
    let token=req.headers.authorization;
  
    try {
        const decoded=await jwt.verify(token,secret);
        if(!decoded) return res.status(400).json({msg:'invalid token'});
        const User=await user.findById(decoded.id)
        if(!User) return res.status(400).json({msg:'moch mawjoud'})
        else{
        req.User=User;
        next()
        }
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
module.exports=verifyAuth