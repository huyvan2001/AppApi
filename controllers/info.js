import { infoResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function getInfo(req,res) {
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        const info = await infoResponsitory.getInfo(_id)
        res.status(HttpStatusCode.OK).json({
            info: info
        })
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
            favoriteList
        } = req.body

        await infoResponsitory.createInfo({
            id_user:_id,
            name,
            dateOfBirth,
            gender,
            height,
            weight,
            favoriteList
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
            weight
        } = req.body
    
        await infoResponsitory.updateInfo({
            id_user:_id,
            name,
            dateOfBirth,
            gender,
            height,
            weight
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