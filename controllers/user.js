import { userResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import htmlResponse from "../HTML/htmlResponse.js";
import jwt from 'jsonwebtoken'
async function registerHandle(req,res){
    let {
        email,
        password,
        confirmedPassword
    } = req.body

    const CLIENT_URL = 'http://' + req.headers.host;
    try{
        await userResponsitory.registerHandle({
            email,
            password,
            confirmedPassword,
            CLIENT_URL
        })

        res.status(HttpStatusCode.OK).json({
            message:"Register Successfully. Please check mail to activate",
            status: true
        })

    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
           message: exception.toString(),
           status: false
        })
    }

}

async function activateHandle(req,res){
    let token = req.params.token
    try{
        await userResponsitory.activateHandle(token)
        res.send(htmlResponse.HtmlResponeSuccessfullyRegister())
    }
    catch(exception){
        res.send(htmlResponse.HtmlResponeErrorRegister(exception.toString()))
    }
}

async function login(req,res){
    let {email,password} = req.body
    try {
        let token = await userResponsitory.login({
            email: email,
            password: password
        })

        res.status(HttpStatusCode.OK).json({
            token: token,
            status: true
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: true
        })
    }
}

async function forgotPassword(req,res){
    let {email} = req.body
    try {
        await userResponsitory.forgotPassword({email:email})
        res.status(HttpStatusCode.OK).json({
            message: "New Password has sent in your mail.Please check mail",
            status: true
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: true
        })
    }
}

async function changePassword(req,res){
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let {oldpassword,password,confirmedPassword} = req.body
        await userResponsitory.changePassword({
            _id,
            oldpassword,
            password,
            confirmedPassword
        })
        res.status(HttpStatusCode.OK).json({
            message: "Change password successfully",
            status: true
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: true
        })
    }
}

export default {
    registerHandle,
    activateHandle,
    login,
    forgotPassword,
    changePassword
}