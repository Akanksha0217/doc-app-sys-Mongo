const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

BASEURL='http://localhost:7005/uploads/'

const register = async (req,res)=>{
    console.log(req.body)
    let {name, email,password, contactNumber,address} = req.body
    let imagePath = req.file ? req.file.filename : null
    try {
        const existingUser = await User.findOne({
           email
        })
        console.log(existingUser)

        if(!existingUser){

        console.log(password)
        const salt = await  bcrypt.genSalt(10)
        password = await bcrypt.hash(req.body.password,salt)
        console.log("hashed password", password)
        const regUser = await User.create({name, email,password, contactNumber,address,imagePath})
      
        res.status(200).send({msg:"Register successfully", success:true})
        if(existingUser){
            res.status(200).send({msg:"User already exists",success:false})
        }
    }
 }catch (error) {
        res.status(500).send({msg:"Server Error"})
    }
}

const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        // ✅ MongoDB findOne
        const loggedUser = await User.findOne({ email });
        console.log(loggedUser, "logged user");

        if (!loggedUser) {
            return res.status(400).send({ msg: "User not found", success: false });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, loggedUser.password);
        if (!isMatch) {
            return res.status(400).send({ msg: "Password incorrect!!!", success: false });
        }

        // ✅ Generate JWT
        const payload = { id: loggedUser._id, role: loggedUser.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).send({
            msg: "Logged in successfully",
            success: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Server Error", success: false });
    }
};

const getUserInfo = async (req, res) => {
    console.log(req.user, "In controller");

    try {
        const loggedUser = await User.findById(
            req.user.id
        ).select('name email address role imagePath');

        if (!loggedUser) {
            return res.status(404).send({
                msg: "User not found",
                success: false
            });
        }

        // Add full image URL
        if (loggedUser.imagePath) {
            loggedUser.imagePath = BASEURL + loggedUser.imagePath;
        }

        console.log("------------------", loggedUser);

        res.status(200).send({
            user: loggedUser,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Server Error" });
    }
};


module.exports = {register,login,getUserInfo}