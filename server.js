import experess from 'express'
import * as dotenv from 'dotenv'

dotenv.config() //must have

import connect  from './database/database.js';
import checkToken from './authentication/auth.js'
import {
    categoryRouter,
    collectionRouter,
    recipeRouter,
    authorRouter,
    recipedetailRouter,
    ingredientRouter,
    ingredientdetailRouter,
    userRouter,
    infoController
} from './routes/index.js';


const app = experess()
app.use(checkToken)
app.use(experess.json())

app.use('/user',userRouter)
app.use('/info',infoController)
app.use('/category',categoryRouter)
app.use('/collection',collectionRouter)
app.use('/recipe',recipeRouter)
app.use('/author',authorRouter)
app.use('/recipedetail',recipedetailRouter)
app.use('/ingredient',ingredientRouter)
app.use('/ingredientdetail',ingredientdetailRouter)

const port = process.env.PORT ?? 3000
app.get('/',(req,res) => {
    res.send('response from root router,haahaa')
})
app.listen(port, async() => {
    try{
        await connect()
    }
    catch{
        console.log("Can't connect to Mongo")
    }
    console.log(`listen on port: ${port}`)
} )


