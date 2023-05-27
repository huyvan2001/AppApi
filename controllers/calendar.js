import { calendarResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function createCalendar(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {id_recipe,date,create_at} = req.body

        await calendarResponsitory.createCalendar({
            id_user: _id,
            id_recipe,
            date,
            type
        })

        res.status(HttpStatusCode.OK).json({
            message: "Add Recipe successfully",
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

async function getAllDaysCalendar(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 

        let allDay = await calendarResponsitory.getAllDaysCalendar(_id)

        res.status(HttpStatusCode.OK).json({
            days: allDay
        })

    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getRecipeByDay(req,res) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {date} = req.body
        let result = await calendarResponsitory.getRecipeByDay({
            id_user: _id,
            date: date
        })

        res.status(HttpStatusCode.OK).json({
            result: result
        })

    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function deleteRecipeByDay(req,res) {
    try{
        let id = req.params.id

        await calendarResponsitory.deleteRecipeByDay(id)

        res.status(HttpStatusCode.OK).json({
            message: "Delete successfully",
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
    createCalendar,
    getAllDaysCalendar,
    getRecipeByDay,
    deleteRecipeByDay
}