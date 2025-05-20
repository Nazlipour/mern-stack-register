import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    
    if(!token){
        return res.json({success:false, message: "Unauthorizied"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token, tokenDecode)
        //req.body.userId = tokenDecode.id
        req.user = tokenDecode.id
        //{.... user: 'userId'}
        next()
    } catch (error) {
        res.json({success:false, message:error.message , error:"middelware"})
    }
}

export default userAuth;