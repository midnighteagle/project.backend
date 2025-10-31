import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router()
router.route("/register").post(
    // use of multer middle ware
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount : 1
        },
    ]),
    
    registerUser

)


export default router 