const jwt = require("jsonwebtoken");

const verifyToken=async(req,resizeBy,next)=>{
    let token=req.headers["authorization"]

    if(token){
        token = token.split(" ")[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({message:"Invalid token"})
            }else{
                console.log(decoded)
                req.user=decoded
            }
        })
        next()
    }
    else{
         return res.status(400).json({message:"Invalid token"})
    }

}

module.exports=verifyToken

//code for the model controller middleware an routes, i m the



//  code for the authentication 