import User from "../models/user.model.js";
import { loginService } from "../services/login.service.js";

export const login = async (req, res) => {
    try{
        const result = await loginService(req.body);

        res.status(200).json(result);
    }
    catch (error) {
        res.status  (error.statusCode || 500).json({
            message:error.message,
        });
    }

    
}