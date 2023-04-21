import {Collection} from "../models/index.js"

const getAllCollection = async () =>{
    try{
        return Collection.find({})
    }
    catch{
        console.error(exception);
    }
}

export default{
    getAllCollection
}