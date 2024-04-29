import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateTokens.js'
import User from '../models/userModel.js'

// @desc Auth user & get token
 //@router POST /users/login
 //@access public

export const authUser = asyncHandler(async(req, res) => {
   const {email, password} = req.body
   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    })
   } else {
    res.status(401)
    throw new Error('Invalid email or password')
   }
})

// @desc Register a new user
 //@router POST /users
 //@access public

 export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, email, password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
 })

// @desc Get user profile
 //@router GET /users/profile
 //@access private

 export const getUserProfile = asyncHandler(async(req, res) => {
    const id = req.User._id;

    const user = await User.findById(id);
    console.log(user);

    if(user){
       return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
 })

export default {
    authUser,
    getUserProfile,
    registerUser 
}