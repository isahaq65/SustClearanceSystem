const express= require('express')
const app=express()
require('dotenv').config()
require('./src/db/mongoose')
const cors=require('cors')
const port=process.env.PORT || 4002

const cookieParser = require('cookie-parser')
const path=require('path')
app.use(express.json()); ///this parses incoming jsons to object
app.use(cookieParser()) /// parses cookie
app.use(cors({
    credentials:true,
    origin:true
}))
app.use(express.static(path.join(__dirname, '/src/images')))

const userRoutes= require('./src/routes/userRoutes')
const applicationRoutes=require('./src/routes/applicationRoutes')
const adminRoutes=require('./src/routes/authorityRoutes')
const noticeRoutes=require('./src/routes/noticeRoutes')


app.use('/user',userRoutes)
app.use('/application',applicationRoutes)
app.use('/admin',adminRoutes)
app.use('/notice',noticeRoutes)

app.listen(port,()=>{
    console.log(`API STARTED ON PORT ${port}`)
})