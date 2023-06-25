import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

export default function checkToken(req,res,next) {
    if( req.url.toLowerCase().trim().includes('/ingredient'.toLowerCase().trim())
        || req.url.toLowerCase().trim().includes('/ingredientdetail'.toLowerCase().trim())
        || req.url.toLowerCase().trim().includes('/recipedetail'.toLowerCase().trim())
        || req.url.toLowerCase().trim().includes('/author'.toLowerCase().trim())
        || req.url.toLowerCase().trim().includes('/filter'.toLowerCase().trim())
        || req.url.toLowerCase().trim() == '/likedish'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/healthcare'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/collection'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/category'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/user/login'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/user/register'.toLowerCase().trim()
        || req.url.toLowerCase().trim() == '/user/forgot'.toLowerCase().trim()
        || req.url.toLowerCase().trim().includes('/user/activate'.toLowerCase().trim())
        || req.url.toLowerCase().trim() == '/plan'.toLowerCase().trim()
        || req.url.toLowerCase().trim().includes('/plandetail'.toLowerCase().trim())
        || req.url.toLowerCase().trim() == '/physicalhealthylevel'.toLowerCase().trim()

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
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: exception.message,
            status: false
        })
    } 


}
