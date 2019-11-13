const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({
    name :{
        type:String,
        required: true
    },
    email : {
        type:String,
        required:true
    }
})


module.exports = mongoose.model('Newsletter',newsLetterSchema)