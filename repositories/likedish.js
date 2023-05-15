import { LikeDish } from "../models/index.js";

const getLikeDish = async()  => {
    return LikeDish.find({})
}

export default {
    getLikeDish
}