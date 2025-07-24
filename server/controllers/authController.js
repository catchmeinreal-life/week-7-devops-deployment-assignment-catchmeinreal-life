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
        });
        return res.json({success: true});
        
    } catch (error) {
        return res.json({succes: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({succes: false, message: 'Email and Password are required'});
    }

    try {

        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: 'Invalid Email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: 'Invalid Password'});
        }

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

        return res.json({success: true});
        
        
    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}