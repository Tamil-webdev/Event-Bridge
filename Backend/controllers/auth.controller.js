const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const register = async (req, res) => {
    try{
        const { name, email, password, role, collegeId } = req.body;
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("creating user with:", { name, email, role, collegeId }); 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            collegeId: collegeId||null
        });
        console.log("User created in DB:", user);

        res.status(201).json({
            message: "User Registered Succesfully",
        });
    }catch(e){
        res.status(500).json({ message: e.message })
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            message: "Login Succesfull",
            token,
            user,
        });
    }catch(e){
        res.status(500).json({ message: e.message })
    }
}

module.exports = { register, login };