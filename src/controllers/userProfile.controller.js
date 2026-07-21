import { profileimageService } from "../services/userProfile.sevices.js";
import { updateProfileService } from "../services/userProfile.sevices.js";
import { changePasswordService } from "../services/userProfile.sevices.js";

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

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await updateProfileService(req.user.id, name);

        return res.status(200).json(result);

    }

    catch (error) {
        return res.status(error.status || 500).json({
        message: error.message,
        });
    }


    
};

export const changePassword = async (req, res) => {

    try {

        const userId = req.user.id;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        const result = await changePasswordService(
           userId,
           oldPassword,
           newPassword,
           confirmPassword
        );


        return res.status(200).json(result);
    
    } catch (error) {

        return res.status(error.status || 500).json({
            message: error.message,
        });
    
    }

}

