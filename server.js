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
    infoRouter,
    filterRouter,
    calendarRouter,
    likeRouter,
    likedishRouter,
    heathCareRouter,
    planRouter,
    planDetailRouter,
    physicalHealthyLevelRouter,
    healthGoalRouter,
    healthindicatorRouter
} from './routes/index.js';


const app = experess()
app.use(checkToken)
app.use(experess.json())

app.use('/user',userRouter)
app.use('/info',infoRouter)
app.use('/calendar',calendarRouter)
app.use('/like',likeRouter)
app.use('/category',categoryRouter)
app.use('/collection',collectionRouter)
app.use('/recipe',recipeRouter)
app.use('/author',authorRouter)
app.use('/recipedetail',recipedetailRouter)
app.use('/ingredient',ingredientRouter)
app.use('/ingredientdetail',ingredientdetailRouter)
app.use('/filter',filterRouter)
app.use('/likedish',likedishRouter)
app.use('/healthcare',heathCareRouter)
app.use('/plan',planRouter)
app.use('/plandetail',planDetailRouter)
app.use('/physicalhealthylevel',physicalHealthyLevelRouter)
app.use('/healthgoal',healthGoalRouter)
app.use('/healthindicator',healthindicatorRouter)


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


