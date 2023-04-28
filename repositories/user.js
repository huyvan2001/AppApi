import {User} from '../models/index.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import validator from 'validator'
import htmlResponse from '../HTML/htmlResponse.js'

const OAuth2 = google.auth.OAuth2;

const login = async({
    email,
    password
}) => {
    if (!email || !password) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

    const emailLower = (email).trim().toLowerCase();
    let existingUser = await User.findOne({emailLower}).exec()
    if (existingUser){
        let _id = existingUser._id
        let isMatch = await bcrypt.compare(password, existingUser.password)
        if(!!isMatch) {
            //create Java Web Token
            let token = jwt.sign({
                _id
              }, 
              process.env.JWT_SECRET,{
                expiresIn: '7 days'
              }          
            )
            return token
          } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
          }
    }
    else{
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }
}


const registerHandle = async({
    email,
    password,
    confirmedPassword,
    CLIENT_URL
}) => {

    if (!email || !password || !confirmedPassword){
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }
    if (!validator.isEmail(email)) {
        throw new Exception(Exception.WRONG_EMAIL)
    }
    if (password != confirmedPassword){
        throw new Exception(Exception.PASSWORD_NOT_MATCH)
    }
    if (password.length < 8) {
        throw new Exception(Exception.PASWORD_LENGTH)
    }
    let exsitedUser = await User.findOne({email: email}).exec()
    if (!!exsitedUser) {
        throw new Exception(Exception.EMAIL_EXIST);
    }

    const oauth2Client = new OAuth2(
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
        "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
    });

    const accessToken = oauth2Client.getAccessToken()

    const token = jwt.sign({email, password }, process.env.JWT_SECRET, { expiresIn: '30m' });


    const output = htmlResponse.HtmlResponeRegister({
        CLIENT_URL: CLIENT_URL,
        token:token
    })
    
    sendMail({
        output: output,
        accessToken: accessToken,
        email: email
    })

}

const forgotPassword = async({
    email
}) => {
    if (!email){
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

    if (!validator.isEmail(email)) {
        throw new Exception(Exception.WRONG_EMAIL)
    }

    let existedUser = await User.findOne({email: email}) 
    if (!existedUser){
        throw new Exception(Exception.EMAIL_IS_NOT_EXIST)
    }

    const oauth2Client = new OAuth2(
        "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
        "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w"
    });

    const accessToken = oauth2Client.getAccessToken()


    let newPass = generateRandomPassword()

    const output = htmlResponse.HtmlResponeForgotPass({newPass:newPass})

    const hashedPassword = await bcrypt.hash(
        newPass,
        parseInt(process.env.SALT_ROUNDS)
      );
    
    await User.findOneAndUpdate({_id: existedUser._id },{password: hashedPassword})

    sendMail({
        output: output,
        accessToken: accessToken,
        email: email
    })
}

const changePassword = async ({
    _id,
    oldpassword,
    password,
    confirmedPassword
}) => {
    if (!oldpassword || !password || !confirmedPassword){
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }
    if (password.length < 8) {
        throw new Exception(Exception.PASWORD_LENGTH)
    }
    if (password != confirmedPassword){
        throw new Exception(Exception.PASSWORD_NOT_MATCH)
    }
    let exsitedUser = await User.findOne({_id: _id}).exec()
    if (!exsitedUser) {
        throw new Exception(Exception.USER_NOT_EXISTED);
    }
    let isMatch = await bcrypt.compare(oldpassword, exsitedUser.password)
    if (!isMatch) {
        throw new Exception(Exception.WRONG_OLD_PASSWORD)
    }
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
    await User.findOneAndUpdate({_id:_id},{password: hashedPassword})
}




const activateHandle = async(token) => {
    if (!token){
        throw new Exception(Exception.TOKEN_WRONG)
    }
    
    const jwtObject = jwt.verify(token,process.env.JWT_SECRET)
    const isExpired = Date.now() >= jwtObject.exp * 1000
    
    if (isExpired) {
        throw new Exception(Exception.TOKEN_EXPRISE)
    }

    const {email,password} = jwtObject

    let existedUser = await User.findOne({email: email})
    if (!!existedUser){
        throw new Exception(Exception.EMAIL_EXIST)
    }
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
    
    await User.create({
        email:email,
        password:hashedPassword
    })

}

const sendMail = ({
    output,
    accessToken,
    email
}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId: "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken: "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken
        },
});
        // send mail with defined transport object
const mailOptions = {
            from: '"RecipeApp" <nodejsa@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Account Verification: NodeJS Auth ✔", // Subject line
            generateTextFromHTML: true,
            html: output, // html body
        };

transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw Exception.MAIL_NOT_SENT
            }
            console.log('Mail sent : %s', info.response);
        })  
}

function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

export default {
    registerHandle,
    activateHandle,
    login,
    forgotPassword,
    changePassword
}