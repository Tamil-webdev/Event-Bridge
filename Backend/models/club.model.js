const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/1148744659/vector/top-view-of-young-people-sitting-at-the-table-and-learning-english-students-studying-together.jpg?s=612x612&w=0&k=20&c=5jbJN8LAWg6r9B9aeIj1bxcRYQHVwcWWN9uD78YjOdc="
    },

    name:{
        type:String,
        required:true,
        unique:false,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"College",
        required:true
    },
    
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },

    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    isActive:{
        type:Boolean,
        default:true
    }

},{timeStamps:true});

module.exports = mongoose.model("Club",clubSchema)