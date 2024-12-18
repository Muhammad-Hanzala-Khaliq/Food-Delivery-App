import jwt from 'jsonwebtoken'


const authMiddleware = async (req,res,next) => {
     const {token} = req.headers;  //take the token from the user
     if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
     }
     try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id;  //set the id in user.id the id is get from when we create the token we pass the id
        next()
     } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
     }
}
export default authMiddleware