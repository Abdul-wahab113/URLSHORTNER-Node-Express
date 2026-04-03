import express from 'express';
import 'dotenv/config';
import {getUserByEmail,insertNewUserInDB} from '../Services/user.service.js'
import { createHmac, randomBytes } from 'node:crypto';



const routes = express.Router();


routes.post('/signup', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname) {
        return res.status(400).json({
            error: "First name is required"
        });
    }

    const existingUser= await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({
            error: `User with email: ${email} already exists.`
        });
    }


    // hashing plan password 
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const newUser = insertNewUserInDB({
        firstname,
        lastname,
        email,
        hashedPassword,
        salt
    });

     // user signedup successfuly
     return res.status(200).json({
        message:"User created successfully",

     })   

});



export default routes;