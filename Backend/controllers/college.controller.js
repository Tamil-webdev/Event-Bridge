const College = require("../models/college.model")

const getAllColleges = async (req,res)=>{
    try{
        const college = await College.find().sort({name:1})
        res.json(college);
    }catch(e){
        res.status(501).json({message:e.message})
    }
}

const getCollegeById = async (req,res)=>{
    try{
        const college = await College.findById(req.params.id);
        if(!college){
            res.status(404).json({message:"College not found"})
        }
        res.json(college)
    }catch(e){
        res.status(501).json({message:e.message});
    }
};

module.exports = {getAllColleges,getCollegeById}