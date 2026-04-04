import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { tokenSchema } from '../Validation/token.validation.js';

export async function createJWTToken(payload) {

    const validationResult = await tokenSchema.safeParseAsync(payload);

    // if validation failed
    if (validationResult.error) {
        throw new Error(validationResult.error);
    }

    //after successfull validation
    const validatedPayload = validationResult.data;


    const token = jwt.sign(validatedPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    });

    return token;
};

export function validateToken(token) {

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
};