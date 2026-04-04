import { and, eq } from 'drizzle-orm';
import db from '../DB/index.js'
import { urlsTable } from '../Models/index.js';

export async function insertNewURL({ finalShortCode, targetURL, userID }) {

    const [result] = await db.insert(urlsTable).values({
        shortCode: finalShortCode,
        targetUrl: targetURL,
        userId: userID
    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl
    });

    return result;
};


export async function getAllShortCodesByCurrentUser(userID) {
    const result = await db.select().from(urlsTable).where(eq(urlsTable.userId, userID));

    return result;
};

export async function deleteUrl(urlID, userID) {

    const [result] = await db.delete(urlsTable).
        where(and(eq(urlsTable.id, urlID), eq(urlsTable.userId, userID))).
        returning({
            id: urlsTable.id
        });
    return result;
};


export async function getTargetUrlByCode(givenShortCode) {

    const [result] = await db.select({
        targetURL: urlsTable.targetUrl
    }).
        from(urlsTable).
        where(eq(urlsTable.shortCode, givenShortCode));

    return result;
};