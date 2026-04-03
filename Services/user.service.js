import db from '../DB/index.js';
import { usersTable } from '../Models/users.model.js';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email) {
    const [existingUser] = await db.select({
        id: usersTable.id,
        email: usersTable.email,
        password: usersTable.password,
        salt: usersTable.salt
    })
        .from(usersTable).
        where(eq(usersTable.email, email));

    return existingUser;
}


export async function insertNewUserInDB({ firstname, lastname, email, hashedPassword, salt }) {

    // insert new user in db
    const [newUser] = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        password:hashedPassword,
        salt
    }).
        returning({ userId: usersTable.id });

    return newUser;

}