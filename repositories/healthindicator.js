import {HealthIndicator} from "../models/index.js"
import Exception from '../exceptions/Exception.js'


const createHealthIndicator = async({
    id_user,
    weight,
    blood_sugar,
    heart_rate,
    create_at
}) => {
    if (!create_at) {
        throw new Exception(Exception.WRONG_FORMAT)
    }
    const promises = []
    if (!!weight) {
        if (!Number.isFinite(weight)) {
            throw new Exception(Exception.WRONG_FORMAT)
        }
        promises.push(HealthIndicator.create({
            id_user: id_user,
            created_at: create_at,
            value: weight,
            unit: "kg",
            type: "weight"
        }))
    }

    if (!!blood_sugar) {
        if (!Number.isInteger(blood_sugar)) {
            throw new Exception(Exception.WRONG_FORMAT)
        }
        promises.push(HealthIndicator.create({
            id_user: id_user,
            created_at: create_at,
            value: blood_sugar,
            unit: "mg/dl",
            type: "bloodsugar"
        }))
    }


    if (!!heart_rate) {
        if (!Number.isInteger(heart_rate)) {
            throw new Exception(Exception.WRONG_FORMAT)
        }
        promises.push(HealthIndicator.create({
            id_user: id_user,
            created_at: create_at,
            value: heart_rate,
            unit: "bpm",
            type: "heartrate"
        }))
    }
    await Promise.all(promises)
}

const getWeightIndicator = async(id_user) => {
    let total = await HealthIndicator.find({ id_user: id_user,
        type: "weight"}).countDocuments()
    
    if (total == 0 ) {
        return []
    }
    

    let limit = 7 >= total ? total : 7

    let data = await HealthIndicator.aggregate([
        {$match : {
            id_user: id_user,
            type: "weight"
        }},
        
        {$limit: limit},
        {$project: {
            _id:1,
            value:1,
            unit:1,
            created_at:1,
            type:1
        }}
    ])
    return data
}

const getHeartRateIndicator = async(id_user) => {
    let total = await HealthIndicator.find({ id_user: id_user,
        type: "heartrate"}).countDocuments()
    
    if (total == 0 ) {
            return []
        }  

    let limit = 7 >= total ? total : 7

    let data = await HealthIndicator.aggregate([
        {$match : {
            id_user: id_user,
            type: "heartrate"
        }},
        
        {$limit: limit},
        {$project: {
            _id:1,
            value:1,
            unit:1,
            created_at:1,
            type:1
        }}
    ])
    return data
}

const getBloodSugarIndicator = async(id_user) => {
    let total = await HealthIndicator.find({ id_user: id_user,
        type: "bloodsugar"}).countDocuments()
    if (total == 0 ) {
            return []
    }
    
    let limit = 7 >= total ? total : 7

    let data = await HealthIndicator.aggregate([
        {$match : {
            id_user: id_user,
            type: "bloodsugar"
        }},
        
        {$limit: limit},
        {$project: {
            _id:1,
            value:1,
            unit:1,
            created_at:1,
            type: 1
        }}
    ])
    return data
}

const getHealthIndicatorByDay = async({
    id_user,
    date
}) => {
    // let total = await HealthIndicator.find({ id_user: id_user,
    //     created_at: date}).countDocuments()
    // if (total == 0) {
    //     return []
    // }
    console.log(date)
    let data = await HealthIndicator.aggregate([
        {$match : {
            id_user: id_user,
            $expr: {
                $eq: [
                  { $toDate: "$created_at" },
                  { $toDate: date }
                ]
              }
        }},
        {$project: {
            _id:1,
            value:1,
            unit:1,
            created_at:1,
            type:1
        }}])

    return data    
}


export default {
    createHealthIndicator,
    getWeightIndicator,
    getHeartRateIndicator,
    getBloodSugarIndicator,
    getHealthIndicatorByDay
}