import { Plan } from "../models/index.js";

const getPlan = async()  => {
    return Plan.find({})
}

export default {
    getPlan
}
