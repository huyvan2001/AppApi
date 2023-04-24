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
export default {
    getAuthor,
    getTotalPage
}