import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

export const db = drizzle({
    url: process.env.DATABASE_URL
});