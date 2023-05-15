import { HealthCare } from "../models/index.js";

const getHeathCare = async()  => {
    return HealthCare.find({})
}

export default {
    getHeathCare
}