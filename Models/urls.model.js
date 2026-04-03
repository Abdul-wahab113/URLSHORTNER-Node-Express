import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './index.js';

export const urlsTable = pgTable("urls", {

    id: uuid("id").primaryKey().defaultRandom(),

    shortCode: varchar("short_code", { length: 155 }).notNull().unique(),

    targetUrl: text("target_url").notNull(),

    userId: uuid("user_id").notNull().references(() => usersTable.id),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
});