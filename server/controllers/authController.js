/**
 * register
 * login
 * login
 * logout
 * verify
 * reset
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.json({succes: false, message: 'Missing details'});
    }

    try {
        
        const existingUser = await userModel.findOne({email}); //check for existing user
        
        if(existingUser) {
            return res.json({succes: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hash user password
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();
        /**
         * generate token for authentication
         * and send it via cookies
         */
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        })
        
    } catch (error) {
        res.json({succes: false, message: error.message})
    }
}