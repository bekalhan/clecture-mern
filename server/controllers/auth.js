import User from '../models/user.js';
import { hashPassword,comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';

export const register = async (req,res)=>{
    try{
        //destructure name,email,password from req.body
        const {name,email,password} = req.body;
        //all fields require validation
        if(!name.trim()){
            return res.json({error:"Name is required"});
        }
        if(!email){
            return res.json({error:"Email is required"});
        }
        if(!password || password.length <6){
            return res.json({error:"Password must be at least 6 characters"});
        }
        //check is email taken
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return existingUser.json({error:"Email already taken"});
        }
        //hash password
        const hashedPassword = await hashPassword(password);
        //register user
        const user = await new User({
            name,email,password:hashedPassword
        }).save();
        //create signed jwt
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        //send response
        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                adress : user.adress
            },
            token
        });
    }catch(err){
        console.log(err);
    }
}

export const login = async (req,res)=>{
    try{
        //destructure email,password from req.body
        const {email,password} = req.body;
        //all fields require validation
        if(!email){
            return res.json({error:"Email is required"});
        }
        if(!password || password.length <6){
            return res.json({error:"Password must be at least 6 characters"});
        }
        //check is user already exist
        const user = await User.findOne({email:email});
        if(!user){
            return existingUser.json({error:"user not found"});
        }
        //compare password
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.json({error:"Wrong password"});
        }
        //create signed jwt
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        //send response
        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                adress : user.adress
            },
            token
        });
    }catch(err){
        console.log(err);
    }
}