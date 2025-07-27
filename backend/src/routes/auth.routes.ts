
import express, { NextFunction, Request, Response } from 'express';
import { loginOrRegister } from '../controllers/auth.controller';
import joi from 'joi';


const handleLoginOrRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            throw new Error(error.message);
        }
        const { email, password } = req.body;
        const token = await loginOrRegister({ email, password });
        res.json({ token });
    }
    catch (err) {
        next(err)
    }
}

const router = express.Router();
router.post('/', handleLoginOrRegister);
export default router;
