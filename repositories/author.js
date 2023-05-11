import { Author } from "../models/index.js";

const getTotalPage = async(limit) => {
    try{
        let total = await Author.find({}).countDocuments()
        return Math.ceil(total/limit)
    }
    catch{

    }
}

const getAuthor = async({
    page,
    limit
}) => {
    try{
    page = parseInt(page)
    limit = parseInt(limit)
    
    let results = await Author.aggregate([
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

const getTotalRecordSearch = async(searchString) => {
    return await Author.find({name : { $regex: searchString,$options: 'i'}}).countDocuments()
}

const searchAuthor = async({
    page,
    limit,
    searchString
}) => {
    try{
        page = parseInt(page)
        limit = parseInt(limit)
        

        let results = await Author.aggregate([
            {$match:{ name : { $regex: searchString,$options: 'i'}}},
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
    getAuthor,
    getTotalPage,
    searchAuthor,
    getTotalRecordSearch
}