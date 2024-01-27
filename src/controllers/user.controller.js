import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    // get user details from the frontend
    const {username, email, fullName , password } = req.body
        // console.log("email" , email);
    
    // validation - required not empty
    if([username , email, fullName, password].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400,"All field is required")
    }
    if(!email.includes("@")){
        throw new ApiError(400, "Enter correct email")
    }
    // check if user is new or not: username, email
    const existingUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existingUser){
        throw new ApiError(409,"User with this username or email already exist")
    }
    // check for images, avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    //  check avatar, upload them on cloudinary, and get the reference
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    console.log(avatarLocalPath);

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage =await uploadOnCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    
    // create user Object - create entry on DB
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        password,
        username: username.toLowerCase()
    })


    // remove password and refreshtoken field from response
    // check for user creation
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    // return res
    return res.status(201).json(
        await new ApiResponse(200,createdUser,"User Registered Successfully")
    )
})

export  { registerUser } 