import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
   try{
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token Missing",
        });
    }
    const user = jwt.verify(token, 'mysecretkey')
        req.user = user
        next()
    }catch(err){
        res.clearCookie(token);
        return res.redirect('/login');
    }
   }