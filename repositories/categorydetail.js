import { CategoryDetail } from "../models/index.js";
import Exception from '../exceptions/Exception.js'

const getCatgoryDetailById = async(id) => {
    try{
        return await CategoryDetail.findOne({id_category_detail : id}, 'id_category_detail name')
    }
    catch(exception){
        console.error(error);
    }
}

export default {
    getCatgoryDetailById
}
