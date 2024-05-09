const User = require('../Models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
class Authentecation {
    static Register = async (req, res) => {
        const {name, email, password} = req.body;
        try {
            if (name && email && password) {
                const isUser = await User.findOne({email : email});
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const HashPassword = await bcryptjs.hash(password, genSalt);
                    const register = await User.create({
                        name : name,
                        email : email,
                        password : HashPassword,
                    })
                    if (register) {
            return res.status(200).json({message : "User Registered.", register})                        
                    }
                } else {
            return res.status(400).json({message : "Email Already ben Exist."})
                }
            } else {
            return res.status(400).json({message : "All Fields are Required."})
            }
        } catch (error) {
            return res.status(400).json({message : error.message})
        }
    }
    static Login = async (req, res) => {
        const {email, password} = req.body;
        try {
            if (email && password) {
                const iseEmail = await User.findOne({email : email});
                if (iseEmail) {
                    if (iseEmail.email === email && (await bcryptjs.compare(password, iseEmail.password))) {
                        const token = await jwt.sign({userID : iseEmail._id}, "pleaseSubscribe",{
                            expiresIn : "3d",
                        })
                        if (iseEmail) {
            return res.status(200).json({message : "User Log den.", token, name : iseEmail.name})                         
                        }
                    } else {
            return res.status(400).json({message : "Wrong Credentials."})                      
                    }
                } else {
            return res.status(400).json({message : "Email address Not Found."})
                }
            } else {
            return res.status(400).json({message : "All Fields are Required."})
            }
        } catch (error) {
            return res.status(400).json({message : error.message})           
        }
    }
    static ChangePassword = async (req, res)=>{
        const {newpassword, confirmpassword} = req.body;
        try {
            if (newpassword === confirmpassword) {
                const genSalt = await bcryptjs.genSalt(10);
                const HashPassword = await bcryptjs.hash(newpassword, genSalt);

                const changepassord = await User.findByIdAndUpdate(req.user._id, {password : HashPassword})
                if (changepassord) {
            return res.status(200).json({message : "Password Change Successfullly", changepassord})
                }
            } else {
            return res.status(400).json({message : "Password and Confirm Password does not match"})
            }
        } catch (error) {
            return res.status(400).json({message : error.message})                       
        }
    }
}

module.exports = Authentecation;