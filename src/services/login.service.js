import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { emailRegex } from "../utils/validationRegex.js";

export const loginService = async (userData) => {
    const { email, password } = userData;

    if(!email || !password){
        const error = new Error("Email and Password are required");
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
    })
    
    if (!user){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
    );

    if (!isPasswordMatched) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
    }

    const token = generateToken(user);

    return {
    message: "Login successful",
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
    };
}