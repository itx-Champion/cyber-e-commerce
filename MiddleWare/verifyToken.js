import jwt from 'jsonwebtoken';

const verifyToken=(req,resp,next)=>{
const token=req.headers['Authorization']?.split(' ')[1];
if(!token){
   return resp.send({message:"please provide a token"});
}
jwt.verify(token,JWT_SECRET,(err,decode)=>{
if(err){
    return resp.send({message:"token is invalid"});
}
next();
})
}
export default verifyToken;