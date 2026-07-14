import User from "../models/user.model.js";
import { emailRegex } from "../utils/validationRegex.js";

export const verifyOtpService = async (userData) => {
    const { email, otp } = userData;

    if (!email || !otp) {
    const error = new Error("Email and OTP are required");
    error.statusCode = 400;
    throw error;
    }

    if (!emailRegex.test(email)) {
    const error = new Error("Invalid email format");
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

    if (user.otp !== otp) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
    }

    if (new Date() > user.otpExpiry) {
    const error = new Error("OTP has expired");
    error.statusCode = 400;
    throw error;
    }

    user.otpVerified = true;

    await user.save();

    return {
    message: "OTP verified successfully.",
    };

    
};