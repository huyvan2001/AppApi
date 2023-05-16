import { infoResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function getInfo(req,res) {
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        const info = await infoResponsitory.getInfo(_id)
        if (info[0] != null) {
            res.status(HttpStatusCode.OK).json({
                info: info[0],
                status: true
            })
        }
        else {
            res.status(HttpStatusCode.OK).json({
                info: null,
                status: false
            })
        }
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function createInfo(req,res) {
   
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject
        let {
            name,
            dateOfBirth,
            gender,
            height,
            weight,
            id_like_dish,
            id_health_care
        } = req.body

        await infoResponsitory.createInfo({
            id_user:_id,
            name,
            dateOfBirth,
            gender,
            height,
            weight,
            id_like_dish,
            id_health_care
        })

        res.status(HttpStatusCode.OK).json({
            message:"Success create Info",
            status: true
        })
        
    }
    catch(exception){

        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }

}

async function updateInfo(req,res) {
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {
            name,
            dateOfBirth,
            gender,
            height,
            weight,
            id_health_care
        } = req.body
    
        await infoResponsitory.updateInfo({
            id_user:_id,
            name,
            dateOfBirth,
            gender,
            height,
            weight,
            id_health_care
        })

        res.status(HttpStatusCode.OK).json({
            message:"Success update Info",
            status: true
        })

    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

export default {
    createInfo,
    getInfo,
    updateInfo
}