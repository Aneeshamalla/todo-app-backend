import { verifyOtpService } from "../services/verifyOtp.service.js";

export const verifyOtp = async (req, res) => {
    try {
        const result = await verifyOtpService(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};