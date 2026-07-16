import User from "../models/user.model.js"

export const profileimageService = async (userId, filename) => {
    const user = await User.findByPk(userId);

    if(!user){
        throw new Error ("User not Found"); 
    }

    user.profileImage = filename;

    await user.save();

    return{
        message : "Profile updated Successfully",
        user
    }

}