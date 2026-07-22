import User from "../models/user.model.js"
import path from "path";
import fs from "fs";
import { passwordRegex } from "../utils/validationRegex.js";
import bcrypt from "bcrypt";

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

export const updateProfileService = async (userId, name) => {
    const user = await User.findByPk(userId);

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    user.name = name;

    await user.save();

    return {
        message: "Profile updated successfully",
        user,
    };
};

export const changePasswordService = async (userId, oldPassword, newPassword, confirmPassword) => {


    if (!oldPassword || !newPassword || !confirmPassword) {
    throw {
        status: 400,
        message: "All fields are required."
    };
    }

    if (newPassword !== confirmPassword) {
    throw {
        status: 400,
        message: "New password and confirm password do not match."
    };
    }

    if (!passwordRegex.test(newPassword)) {
        const error = new Error(
         "Password must be at least 8 characters long and contain at least one letter and one number"
        );
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findByPk(userId);
    if (!user) {
    throw {
        status: 404,
        message: "User not found."
    };
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
    throw {
        status: 400,
        message: "Old password is incorrect."
    };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return {
    status: 200,
    message: "Password changed successfully."
    };
}




