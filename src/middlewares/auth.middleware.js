import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyscHandler.js";

// verify JWT middleware
export const verifyJWT = asyncHandler(async(req, _, next)=>{ // _ shows the response(res)
    try {
        // get token from cookies or headers by removing Bearer
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")


        // if no token found
        if(!token){
            throw new ApiError(401, "Unauthorized request") // 401 means unauthorized
        }

        // verify token by jwt verify using secret key
        const DecodedToken = jwt.verify (token, process.env.ACCESS_TOKEN_SECRET)
        // get user from DB
        const user = await User.findById(DecodedToken?._id).select("-password -refreshToken")
        // remove password and refresh token from user object⬆️
        console.log("Verified User:", user);
        console.log(DecodedToken);
        
        // if no user found
        if(!user){
            // next video : Discuss about fronted
            throw new ApiError(401, "Invalid Access Token")
        }
        // attach user to req object
        req.user = user;
        // call next middleware
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})