const mongoose=require('mongoose')



const SellOrder=mongoose.Schema({
    sellQty:Number,
    sellPrice:Number,
    isEqual:Boolean
})


const SellModel=mongoose.model("sellorder",SellOrder)


module.exports={
    SellModel
}