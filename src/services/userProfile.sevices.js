import User from "../models/user.model.js"
import path from "path";
import fs from "fs";

export const profileimageService = async (userId, filename) => {
    const user = await User.findByPk(userId);

    if(!user){
        throw new Error ("User not Found"); 
    }

    if (user.profileImage){
        const oldFilePath = path.join("src/uploads", user.profileImage);

        if(fs.existsSync(oldFilePath)){
            fs.unlinkSync(oldFilePath);
        }
    }
    user.profileImage = filename;

    await user.save();

    return{
        message : "Profile updated Successfully",
        user
    }

}