import {Info} from "../models/index.js"
import Exception from '../exceptions/Exception.js'


const createInfo = async({
    id_user,
    name,
    dateOfBirth,
    gender,
    height,
    weight,
    favoriteList
}) => {
    if(!name || !dateOfBirth || !gender || !height || !weight || !favoriteList) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }
    if (!Number.isInteger(gender) || !Number.isFinite(height) || !Number.isFinite(weight) ) {
        throw new Exception(Exception.WRONG_FORMAT)
    }

    let date = Date(dateOfBirth)

    if (!date){
        throw new Exception(Exception.WRONG_FORMAT)
    }

    let existedInfo = await Info.findOne({id_user: id_user})

    if (!!existedInfo){
        throw new Exception(Exception.USER_EXISTED);
    }

    await Info.create({
        id_user,
        name,
        dateOfBirth,
        gender,
        height,
        weight,
        favoriteList
    })

}

const updateInfo = async({
    id_user,
    name,
    dateOfBirth,
    gender,
    height,
    weight
}) => {
    if(!name || !dateOfBirth || !gender || !height || !weight) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }
    if (!Number.isInteger(gender) || !Number.isFinite(height) || !Number.isFinite(weight) ) {
        throw new Exception(Exception.WRONG_FORMAT)
    }

    let date = Date(dateOfBirth)

    if (!date){
        throw new Exception(Exception.WRONG_FORMAT)
    }

    let existedInfo = await Info.findOne({id_user: id_user})

    if (!existedInfo){
        throw new Exception(Exception.USER_NOT_EXISTED);
    }

    await Info.findOneAndUpdate({id_user: id_user},{  
        name,
        dateOfBirth,
        gender,
        height,
        weight}
    )
}

const getInfo = async(id_user) => {
    let infoUser = await Info.aggregate([
        {
            $match: {id_user : id_user}
        },
        {
            $project: {
                name: 1,
                dateOfBirth:1,
                gender:1,
                height:1,
                weight:1,
                favoriteList:1
            }
        }
    ])

    if (!infoUser){
        throw new Exception(Exception.INFO_NOT_CREATE);
    }

    return infoUser

}

export default {
    createInfo,
    updateInfo,
    getInfo
}