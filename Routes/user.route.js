import express from 'express';
import 'dotenv/config';
import db from '../DB/index.js';
import { usersTable } from '../Models/users.model.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';



const routes = express.Router();


routes.post('/signup', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    if (!firstname) {
        return res.status(400).json({
            error: "First name is required"
        });
    }

    const [user] = await db.select({
        id: usersTable.id,
        email: usersTable.email
    })
        .from(usersTable).
        where(eq(usersTable.email, email));

    if (user) {
        return res.status(400).json({
            error: `User with email: ${email} already exists.`
        });
    }


    // hashing plan password 
    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    // insert new user in db
    const [newUser] = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        salt
    }).
        returning({ userId: usersTable.id })


     // user signedup successfuly
     return res.status(200).json({
        message:"User created successfully",

     })   





})



export default routes;