import jwt from "jsonwebtoken";

import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyscHandler";

export const verifyJWT = asyncHandler(async(req, _, next)=>{ // _ shows the response(res)
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

    if(!token){
        throw new ApiError(401, "Unauthorized request")
    }

    const DecodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    await User.findById(DecodedToken?._id).select
    ("-password -refreshToken")

    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;
    next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})