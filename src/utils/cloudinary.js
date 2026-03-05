import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath) =>{
        try {
            if (!localFilePath) return null
            // upload the file on cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file has been uploaded successfully
            // console.log("File is uploaded On cloudinary",response.url); // this for testing purpose.
            fs.unlinkSync(localFilePath) // remove the locally saved temp files as the upload operation is successful
            return response;
            
        } catch (error) {
            fs.unlinkSync(localFilePath)// remove the locally saved temp files as the upload operation got failed
            return null;
        }
    };
    const FileUploadToCloudinary = async (localFilePath) =>{
        try {
            const UploadingFile = await uploadOnCloudinary(localFilePath);
            return UploadingFile;
        } catch (error) {
            console.error("Error uploading file to Cloudinary:", error);
            return null;
        }
    };
    const deleteFileFromCloudinary = async(publicId)=>{
        try {
            const FileDeleting = await cloudinary.uploader.destroy(publicId);
            return FileDeleting;
        } catch (error) {
            console.error("Error deleting file from Cloudinary:", error);
            return null;
        }
    };
export { deleteFileFromCloudinary, FileUploadToCloudinary, uploadOnCloudinary };
