import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyscHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAcessAndRefreshToken = async(userId)=>{
    try {
        const user =await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError (500, "Something went wrong while generating Access & refresh tokens")
    }
}


// register User controller
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


    // get user details from frontend
    const {fullname, email, username, password}= req.body
    //console.log("email: ",email);


    // validation 
    // if(fullname === ""){
    //     throw new ApiError(400, "Full name is required")
    // } OR
    if (
        [fullname, email, username, password].some((field)=>field?.trim() === "") // 
    ) {
        throw new ApiError(400,"All feilds are required")
    }

    // cheak if user already exists: username , email
    const existedUser = await User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exist")
    }
    //console.log(req.files); // it is used to cheak on the console to get the file details.

    // cheak for image , cheak for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    //const coverImageLocalPath = req.files?.coverImage [0]?.path;

    let coverImageLocalPath; 
    if (req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }





    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }


    // upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary (avatarLocalPath)
    const coverImage = await uploadOnCloudinary (coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required ")
    }
    // create user object - create entry in DB
    const user = await User.create({
        fullname,
        avatar: avatar.url || " ",
        coverImage : coverImage.url ||"",
        email,
        password,
        username: username.toLowerCase()
    })
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response. Ensure ApiResponse parameters are (statusCode, message, data)
    return res.status(201).json(
        new ApiResponse(201, "User Registered Successfully", createdUser)
    )
})

// login user controller
const loginUser = asyncHandler( async (req, res) => {
    // todos
    // req body se data le aao
    // username ya email se user ko login karvao
    // find the user
    // agar hai to password match karvao
    // agar match ho jata hai to access token and refresh token generate karvao
    // send cookies me refresh token bhej do
    // refresh token ko db me save karvao
    // response me access token bhej do
    const {email, username, password} = req.body;
    if(!username || !email){
        throw new ApiError(400, "Username Or Email is reqired to login")
    }
    const user = await User.findOne({
        $or: [{username},{email}]
    })
    if(!user){
        throw new ApiError(404, "User doesnot exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User credencials")
    }
    const {acessToken,refreshToken} =await generateAcessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id)
    select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken", accesstoken, option)
    .cookie("refreshToken", refreshToken,option)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,
                refreshToken
            },
            "User logged In Successfully"
        )
    )
    

})

// logout User Control
const logoutUser=asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const option = {
        httpOnly: true,
        secure : true
    }
    return res
    .status (200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200,{}, "User Logged Out"))
})

export { loginUser, logoutUser, registerUser };
