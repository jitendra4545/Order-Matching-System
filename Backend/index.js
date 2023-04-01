const express=require('express')
require('dotenv').config()
const app=express()
const connection=require('./config/db')

app.get('/',(req,res)=>{
    console.log('Welcome to home')
    res.send('Get All Data')
})



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('connected')
    }catch(err){
        console.log('failed')
    }
    console.log(`Server Running on ${process.env.port}`)
})