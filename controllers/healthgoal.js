import { healthgoalResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function createHealthGoal(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {
            target_weight,
            id_physical_healthy_level,
            day_goal,
            create_at} = req.body

        await healthgoalResponsitory.createHealthGoal({
            id_user: _id,
            target_weight: target_weight,
            id_physical_healthy_level: id_physical_healthy_level,
            day_goal: day_goal,
            create_at: create_at
        })

        res.status(HttpStatusCode.OK).json({
            message: "Add Health Goal Successfully",
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

async function getAllHealthGoal(req,res){
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 

        let data = await healthgoalResponsitory.getAllHealthGoal(_id)

        res.status(HttpStatusCode.OK).json({
            data: data
        })

    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    } 
}

async function getHealthGoalDetail(req,res) {
    try {
        let id = req.params.id
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 

        let result = await healthgoalResponsitory.getHealthGoalDetail({
            id_user:_id,
            id: id
        })
        res.status(HttpStatusCode.OK).json({
           data: result
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
    createHealthGoal,
    getAllHealthGoal,
    getHealthGoalDetail
}