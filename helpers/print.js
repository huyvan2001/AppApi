import chalk from "chalk";

class OutputType{
    static INFORMATION = "INFORMATION"
    static SUCCESS = "SUCCESS"
    static WARNING = "WARNING"
    static ERROR = "ERROR"
}
function print(message,outputType){
    switch(outputType){
        case outputType.INFORMATION:
            console.log(chalk.white(message))
            break
        case outputType.SUCCESS:
            console.log(chalk.green(message))
            break
        case outputType.WARNING:
            console.log(chalk.yellow(message))
            break
        case outputType.ERROR:
            console.log(chalk.red(message))
            break
        default:
            console.log(chalk.white(message))
            break
    }
}

export {
    OutputType,
    print
}