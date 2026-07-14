import { resetPasswordService } from "../services/resetPassword.service.js";

export const resetPassword = async (req, res) => {
    try {
        const result = await resetPasswordService(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};