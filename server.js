import experess from 'express'
import * as dotenv from 'dotenv'

dotenv.config() //must have

import connect  from './database/database.js';
import {
    categoryRouter,
    collectionRouter,
    recipeRouter,
    authorRouter,
    recipedetailRouter
} from './routes/index.js';


const app = experess()
app.use(experess.json())

app.use('/category',categoryRouter)
app.use('/collection',collectionRouter)
app.use('/recipe',recipeRouter)
app.use('/author',authorRouter)
app.use('/recipedetail',recipedetailRouter)

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


