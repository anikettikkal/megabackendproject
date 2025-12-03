import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
    // Registration logic will go here

    // get user details from frontend
    // validation
    // check if user already exists : username , email
    // check for images , check for avtar
    // upload them to cloudinary, avtar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation success
    // return response


    // #1 Get user details from frontend
    const {email,username,fullname,password} = req.body
    console.log(email);
    
    // #2 Validation
    /*
    if (fullname==="") {
        throw new ApiError(400,"Fullname is required")
    } we are checking this format also but it increases the code length
    */

    if ([email,password,username,fullname].some((fields)=>{
        return fields?.trim() === ""
    })) {
        throw new ApiError(400,"All fields are required")
    }

    //#3 check user already exists
    const existedUser = User.findOne({
        $or: [{email},{username}]
    })
    if (existedUser) {
        throw new ApiError(409,"User already exists with this email or username")
    }

    //#4 check for images
    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new ApiError(400,"Avtar image is required")
    }

    // #5 upload them to cloudinary
    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avtar) {
        throw new ApiError(500,"Could not upload avtar image , please try again later")
    }

    // #6 create user object

    const user = await User.create({
        email,
        username: username.toLowerCase(),
        fullname,
        password,
        avtar: avtar.url,
        coverImage: coverImage?.url || ""
    })

    // #7 remove password and refresh token from response
    const createdUser = await user.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500,"Could not create user , please try again later")
    }

    // #8 return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

})

export {registerUser}