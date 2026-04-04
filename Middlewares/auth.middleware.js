import {validateToken} from '../Utils/token.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

export function userAutenticationMiddleware(req, res, next) {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        return next();
    }

    if (!authHeader.startsWith('Bearer')) {
        return res.status(400).json({
            error: "Invalid token format Bearer <TOKEN>"
        });
    }

    const token = authHeader.split(' ')[1];

    const payload = validateToken(token);

    // invalid or expired token
    if(!payload){
        return res.status(400).json({
            error:"Invalid or Expired Token"
        });
    }

    // assign to request of the user
    req.user = payload;
    
    next();
};

export function ensureAuthenticated(req,res,next){

    if(!req.user){
        return res.status(401).json({
            error:"Authentication Required. Please log in to access this resource."
        });
    }

    next();
}