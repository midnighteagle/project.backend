import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyscHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    //validation  - not empty
    // cheak if user already exists: username , email
    // cheak for image , cheak for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB
    // remove password and refresh token feild from response
    // cheak for user creation 
    // return response.

    const {fullname, email, username, password}= req.body
    console.log("email: ",email);


    // validation 
    // if(fullname === ""){
    //     throw new ApiError(400, "Full name is required")
    // } OR
    if (
        [fullname,email,username,password].some((field)=>field?.trim() === "")
    ) {
        throw new ApiError(400,"All feilds are required")
    }

    // cheak if user already exists: username , email
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }

    // cheak for image , cheak for avatar
    const avtarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath =req.files?.coverImage [0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }


    // upload them to cloudinary, avatar

    const Avatar = await uploadOnCloudinary (avatarLocalPath)
    const coverImage = await uploadOnCloudinary (coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required ")
    }
    // create user object - create entry in DB
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage : coverImage.url ||"",
        email,
        password,
        username:username.toLowerCase()
    })
    // remove password and refresh token feild from response
    const createdUser = User.findById(user._id).select (
        "-password -refreshToken"
    )

    // cheak for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went Wrong While registering the User")
    }
    // return response.
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Sucessfully")
    )

})
export { registerUser };
