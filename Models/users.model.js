import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    firstname: varchar("first_name", { length: 155 }).notNull(),
    lastname: varchar("last_name", { length: 155 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),

    password: text("password").notNull(),
    salt: text("salt").notNull(),

    createdAt: timestamp("created_At").notNull().defaultNow(),
    updatedAt: timestamp("updated_At").$onUpdate(() => new Date()).notNull().defaultNow()
});