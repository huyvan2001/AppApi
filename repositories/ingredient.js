import {Ingredient} from "../models/index.js"

const getTotalRecord = async() => {
    try{
        let total = await Ingredient.find({}).countDocuments()
        return total
    }
    catch{

    }
}
const getIngredient = async({
    page,
    limit
}) => {
    try{
    page = parseInt(page)
    limit = parseInt(limit)
    
    let results = await Ingredient.aggregate([
        {$match:{}},
        {$skip: (page - 1) * limit},
        {$limit: limit}
    ])
    return results
    }
    catch(error){
        console.log(error)
    }
}

const getTotalRecordByAlphabet = async({
    alphabet
}) =>{
    try {
        let total = await Ingredient.find({
            name: {
                $regex: new RegExp(`^${alphabet}`, 'i')
            }
        }).countDocuments()
        return total
    }
    catch{

    }
}

const getIngredientByAlphabet = async({
    page,
    limit,
    alphabet
}) => {
    try{
        page = parseInt(page)
        limit = parseInt(limit)
        console.log(alphabet)
        let results = await Ingredient.aggregate([
            {$match:{
                name: {
                    $regex: new RegExp(`^[${alphabet}]`, 'i')
                }
            }},
            {$skip: (page - 1) * limit},
            {$limit: limit}
        ])
        return results
        }
        catch(error){
            console.log(error)
        }
}

export default {
    getIngredient,
    getTotalRecord,
    getIngredientByAlphabet,
    getTotalRecordByAlphabet
}