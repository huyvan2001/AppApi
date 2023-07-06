import { healthindicatorResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function createHealthIndicator(req,res) {
    try {
        let id_health_goal = req.params.id
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
            id_health_goal,
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
        let id_health_goal = req.params.id
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getWeightIndicator({
            id_user:_id,
            id_health_goal
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

async function getHealthIndicatorByDay(req,res) {
    try {
        let id_health_goal = req.params.id
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {date} = req.body
        let data = await healthindicatorResponsitory.getHealthIndicatorByDay({
            id_user: _id,
            id_health_goal,
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
        let id_health_goal = req.params.id
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getHeartRateIndicator({
            id_user: _id,
            id_health_goal
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

async function getBloodSugarIndicator(req,res) {
    try {
        let id_health_goal = req.params.id
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let data = await healthindicatorResponsitory.getBloodSugarIndicator({
            id_user:_id,
            id_health_goal
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

export default {
    createHealthIndicator,
    getWeightIndicator,
    getHeartRateIndicator,
    getBloodSugarIndicator,
    getHealthIndicatorByDay
}