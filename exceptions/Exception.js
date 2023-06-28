import { print, OutputType } from "../helpers/print.js"

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong datatabase's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose"    
    static EMAIL_EXIST = "Email is already existed"
    static EMAIL_IS_NOT_EXIST = "Email is not existed"
    static CANNOT_REGISTER_USER = "Cannot register user"
    static WRONG_EMAIL = "Email is not right format"
    static TOKEN_WRONG = "Token wrong"
    static TOKEN_EXPRISE = "Token is exprised"
    static FIELD_NOT_FILLED = "Field is not filled"
    static PASWORD_LENGTH = "Pasword length must be at least 8 characters"
    static PASSWORD_NOT_MATCH = "Password not match"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password"
    static MAIL_NOT_SENT = "Mail is wrong,please check again"
    static WRONG_FORMAT = "Wrong format"
    static USER_EXISTED = "User existed"
    static USER_NOT_EXISTED = "User not existed"
    static INFO_NOT_CREATE = "Info not create"
    static WRONG_OLD_PASSWORD = "Wrong old password"
    static NOT_CREATE_HEALTH_GOAL = "You should only lose or gain weight 0.5-1kg/perweek"
    static RECIPE_EXSITED = "Recipe already added"
    static HEALTHGOAL_NOT_FINISHED = "Your HealthGoal should be finished"

    constructor(message, validationErrors={}){
        super(message)//call constructor of parent class(Error)        
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}