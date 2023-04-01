const mongoose=require('mongoose')



const BuyOrder=mongoose.Schema({
    buyQty:Number,
    buyPrice:Number,
    isEqual:Boolean
})


const BuyModel=mongoose.model("buyorder",BuyOrder)


module.exports={
    BuyModel
}