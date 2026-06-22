const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    address:{
        num: { type: String, required: true },
        street:{type:String,required:false},
        area: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    isActive:{
        type:Boolean,
        default : true
    }
});

collegeSchema.index({
  'address.num': 1,
  'address.street': 1,
  'address.city': 1,
  'address.state': 1,
  'address.pincode': 1
}, { unique: true });

module.exports = mongoose.model('College', collegeSchema);
