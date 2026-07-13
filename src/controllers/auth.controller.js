import { signupService } from "../services/auth.service.js";

export const signUp =async(req, res) => {
    try{
        const result = await signupService(req.body);

        res.status(201).json(result);
    }
    catch(error){
        res.status(error.statusCode || 500).json({
            message :error.message,
        });
        

    }
}