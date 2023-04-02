const mongoose = require('mongoose')



const BuyOrder = mongoose.Schema({
    buyQty: Number,
    buyPrice: Number,
    isEqual: Boolean
}, {
    versionKey: false
})


const BuyModel = mongoose.model("buyorder", BuyOrder)


module.exports = {
    BuyModel
}