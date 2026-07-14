import { emailRegex, passwordRegex } from "../utils/validationRegex.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const resetPasswordService = async (userData) => {
    const { email, newPassword, confirmPassword } = userData;

    if  (!email || !newPassword || !confirmPassword){
        const error = new Error("All fields are Required");
        error.statusCode = 400;
        throw error;
    }

    if (!emailRegex.test(email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;

    }

    if (!passwordRegex.test(newPassword)) {
       const error = new Error("Password must be at least 8 characters and contain letters and numbers");
       error.statusCode = 400;
       throw error;
    }



    if (newPassword !== confirmPassword) {
       const error = new Error("Passwords do not match");
       error.statusCode = 400;
       throw error;
    }


    const user = await User.findOne({
    where: {
        email,
    },
    });

    if (!user) {
       const error = new Error("User not found");
       error.statusCode = 404;
       throw error;
    }

    if (!user.otpVerified) {
       const error = new Error("Please verify OTP first.");
       error.statusCode = 400;
       throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.otp = null;
    user.otpExpiry = null;

    user.otpVerified = false;

    await user.save();

    return {
    message: "Password reset successfully.",
    };


}