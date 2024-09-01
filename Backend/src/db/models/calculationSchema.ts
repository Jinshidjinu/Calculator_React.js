import mongoose from "mongoose";


const calculationSchema = new mongoose.Schema({

    calculation : String,
    result  : Number

},{ timestamps: true })

const calculationModel = mongoose.model('calculation',calculationSchema)

export default calculationModel