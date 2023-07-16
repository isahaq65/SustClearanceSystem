const jwt = require("jsonwebtoken")
const User =  require('../models/userModel');

const auth = async (req,res,next)=>{
    try{
        let token = req.body.token || req.cookies.token;
        if(req.headers.token)
            token=req.headers.token;
        req.token=token
        const decoded = jwt.verify(token,process.env.JWT);
        
        const user = await User.findOne({_id:decoded._id , "tokens.token" : token })
        req.user=user
        if(!user) throw new Error("Please Authenticate");
        next()
        
    }catch(e){
        res.status(400).send({error : "Please Authenticate"});
    }
}

module.exports = auth