import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { emailRegex, passwordRegex } from "../utils/validationRegex.js";

export const signupService = async(userData) => {

    const {name, email, password, confirmPassword} = userData

    if(!name || !email || !password ||!confirmPassword){
        const error= new Error("All fields are required ");
        error.statusCode = 400;
        throw error;
    }

    if(password !== confirmPassword){
        const error = new Error ("Password do not match");
        error.statusCode = 400;
        throw error;
    }

    const existingUser  = await User.findOne({
        where:{
            email,
        }
    })

    if(existingUser){
        const error = new Error("Email Already Exists!!");
        error.statusCode = 409;
        throw error;
    }

    

    if (!emailRegex.test(email)) {
        const error= new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    }

    

    if (!passwordRegex.test(password)) {
        const error = new Error(
         "Password must be at least 8 characters long and contain at least one letter and one number"
        );
        error.statusCode = 400;
        throw error;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    });

    return {
    message: "User registered successfully",
    user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    },
    };

};