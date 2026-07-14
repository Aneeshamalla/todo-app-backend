import User from "../models/user.model.js";
import { emailRegex } from "../utils/validationRegex.js";
import { sendEmail } from "../utils/sendEmail.js";

export const forgotPasswordService = async (userData) => {
    const { email } = userData;

    if (!email) {
    const error = new Error("Email is required");
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

    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;

    user.otpVerified = false;

    await user.save();


    await sendEmail(
    user.email,
    "Password Reset OTP",
    `Your OTP is ${otp}. This OTP is valid for 5 minutes.`
    );

    return {
    message: "OTP sent successfully.",
    };


};