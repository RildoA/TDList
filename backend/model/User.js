const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default:[]
    }
})

mongoose.model("users",User);