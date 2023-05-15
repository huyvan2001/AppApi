import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

export default function checkToken(req,res,next) {
    if( req.url.toLowerCase().trim() == '/ingredient'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/ingredientdetail'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/author'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/filter'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/likedish'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/heathcare'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/collection'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/category'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/user/login'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/user/register'.toLowerCase().trim()
        ) {
            next()
        return
    }

    const token = req.headers?.authorization?.split(" ")[1]

    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)        
        const isExpired = Date.now() >= jwtObject.exp * 1000

        if(isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: 'Token is expired',
                status: false
            })   
            res.end() 
        } else {
            next()
            return
        }        
    }catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.message,
            status: false
        })
    } 


}
