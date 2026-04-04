import db from '../DB/index.js'
import { urlsTable } from '../Models/index.js';

export async function insertNewURL({finalShortCode, targetURL, userID}) {

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
}