import { PhysicalHealthyLevel } from "../models/index.js";

const getPhysicalHealthyLevel = async()  => {
    return PhysicalHealthyLevel.find({})
}

export default {
    getPhysicalHealthyLevel
}