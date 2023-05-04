import { Kcal,Time,Serve } from "../models/index.js";

const getKcal = async()  => {
    return Kcal.find({})
}

const getTime = async()  => {
    return Time.find({})
}

const getServe = async()  => {
    return Serve.find({})
}

export default {
    getKcal,
    getTime,
    getServe
}