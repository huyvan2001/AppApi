import { healthindicatorResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function createHealthIndicator(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {
             weight,
             blood_sugar,
             heart_rate,
             create_at
        } = req.body

        await healthindicatorResponsitory.createHealthIndicator({
            id_user: _id,
            weight,
            blood_sugar,
            heart_rate,
            create_at
        })
        
        res.status(HttpStatusCode.OK).json({
            message: "Add Health Indicator successfully",
            status: true
        })
        
    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getWeightIndicator(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getWeightIndicator(_id)
        res.status(HttpStatusCode.OK).json({
            data
        })
    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getHealthIndicatorByDay(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {date} = req.body
        let data = await healthindicatorResponsitory.getHealthIndicatorByDay({
            id_user: _id,
            date
        })
        res.status(HttpStatusCode.OK).json({
            data
        })
    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getHeartRateIndicator(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getHeartRateIndicator(_id)
        res.status(HttpStatusCode.OK).json({
            data
        })
    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getBloodSugarIndicator(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getBloodSugarIndicator(_id)
        res.status(HttpStatusCode.OK).json({
            data
        })
    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

export default {
    createHealthIndicator,
    getWeightIndicator,
    getHeartRateIndicator,
    getBloodSugarIndicator,
    getHealthIndicatorByDay
}