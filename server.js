import experess from 'express'
import * as dotenv from 'dotenv'

dotenv.config() //must have

import connect  from './database/database.js';
import {
    categoryRouter,
    collectionRouter,
    recipeRouter
} from './routes/index.js';


const app = experess()
app.use(experess.json())

app.use('/category',categoryRouter)
app.use('/collection',collectionRouter)
app.use('/recipe',recipeRouter)



const port = process.env.PORT ?? 3000
app.get('/',(req,res) => {
    res.send('response from root router,haahaa')
})
app.listen(port, async() => {
    await connect()
    console.log(`listen on port: ${port}`)
} )


