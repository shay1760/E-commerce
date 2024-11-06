import jwt from 'jsonwebtoken'

const adminAuth=async(req, res, next)=>{
    try {
        const {token}=req.headers
        if(!token)
        {
            return res.json({success:false, messsage:"Not authorized"})
        }
        const token_decode=jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
        {
            return res.staus(403).json({success:false, messsage:"Not authorized"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, messsage:error.messsage})
    }
}

export default adminAuth