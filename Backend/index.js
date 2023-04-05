const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const connection = require('./config/db')
const { SellModel } = require('./model/SellOrder.Model')
const { BuyModel } = require('./model/BuyOrder.Model')
app.use(cors())
app.use(express.json())




app.get('/selldata', async (req, res) => {
    try {
        let data = await SellModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot get user", "error": err.message })
    }
})




app.get('/buydata', async (req, res) => {
    try {
        let data = await BuyModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot get user", "error": err.message })
    }
})







app.post("/sell", async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        let sell = new SellModel(data)
        await sell.save()
        res.send(sell)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot get user", "error": err.message })
    }
})




app.post("/buy", async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        let buy = new BuyModel(data)
        await buy.save()
        res.send(buy)
    } catch (err) {
        res.send({ "msg": "somthing went wrong! cannot get user", "error": err.message })
    }
})

app.patch("/updatesell/:id",async(req,res)=>{
    let id=req.params.id
  let data= req.body
 
try{
  
let update=await SellModel.updateOne({"_id":id},{$set:data})
res.send(update)
}catch(err){
res.send('gagfgfghf')
}
})




app.patch("/updatebuy/:id",async(req,res)=>{
    let id=req.params.id
  let data= req.body
 
try{
  
let update=await BuyModel.updateOne({"_id":id},{$set:data})
res.send(update)
}catch(err){
res.send('gagfgfghf')
}
})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('connected')
    } catch (err) {
        console.log('failed')
    }
    console.log(`Server Running on ${process.env.port}`)
})