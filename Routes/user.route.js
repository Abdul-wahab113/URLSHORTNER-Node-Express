import express from 'express';
import 'dotenv/config';
import { getUserByEmail, insertNewUserInDB } from '../Services/user.service.js'
import { hashPassword } from '../Utils/hash.js';
import { userSignupPostRequestBodySchema, userLoginPostRequestBodySchemea } from '../Validation/user.validation.js';
import { createJWTToken } from '../Utils/token.js';


const routes = express.Router();


routes.post('/signup', async (req, res) => {

    const validationResult = await userSignupPostRequestBodySchema.safeParseAsync(req.body);

    // if the validation failed then return the error to client
    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error.format()
        });
    }

    // final validated data
    const { firstname, lastname, email, password } = validationResult.data;

    if (!firstname) {
        return res.status(400).json({
            error: "First name is required"
        });
    }

    // check if user with the same email already exists in db
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({
            error: `User with email: ${email} already exists.`
        });
    }


    // hashing plan password 
    const { hashedPassword, salt } = hashPassword(password);

    console.log(`new hased :${hashedPassword}`);


    const newUser = await insertNewUserInDB({
        firstname,
        lastname,
        email,
        hashedPassword,
        salt
    });

    // user signedup successfuly
    return res.status(200).json({
        message: "User created successfully",
    });

});


routes.post('/login', async (req, res) => {

    const validationResult = await userLoginPostRequestBodySchemea.safeParseAsync(req.body);

    // if the validation failed then return the error to client
    if (validationResult.error) {
        return res.status(400).json({
            error: validationResult.error.format()
        });
    }

    // final validated data
    const { email, password } = validationResult.data;

    // check either the given email is in db or not
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return res.status(400).json({
            error: `User with email:${email} doesn't exist.`
        });
    }

    // if user with given email found in db
    const newHashedPassword = hashPassword(password, existingUser.salt);

    if (newHashedPassword.hashedPassword !== existingUser.password) {
        return res.status(400).json({
            error: "Incorrect Password!"
        });
    }

    // create jwt token and asign to user.
    const payload = {
        userID: existingUser.id,
        emial: existingUser.email
    };

    const token = createJWTToken(payload);

    return res.status(200).json({
        status: "User loged in Successfully.",
        data: {
            token: token
        }
    });
});


export default routes;