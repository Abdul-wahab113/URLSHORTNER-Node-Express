import { createHmac, randomBytes } from "node:crypto";

export function hashPassword(password, existingSalt = null) {
    const salt = existingSalt ?? randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    return {
        hashedPassword,
        salt
    };
}