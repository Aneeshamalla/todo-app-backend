import { profileimageService } from "../services/userProfile.sevices.js";

export const profileImage = async(req, res) => {
    try{
        const result = await profileimageService(req.user.id, req.file.filename);


        res.status(201).json(result);
    }
    catch(error){
        res.status(error.statusCode || 500).json({
            message : error.message
        })
    }
}


