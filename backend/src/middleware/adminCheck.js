const admin = async (req,res,next)=>{
    try{
        // console.log(req.user.role)
        if(req.user.role==='student') throw new Error("Please Authenticate");
        next()
        
    }catch(e){
        res.status(400).send({error : "Please Authenticate"});
    }
}

module.exports = admin