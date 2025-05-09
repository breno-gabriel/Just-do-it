import { relations } from 'drizzle-orm';
import { AnyMySqlColumn, boolean, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const tasksTable = mysqlTable('tasks_table', {
  id: int().primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  priority: varchar({ length: 255 }).notNull(),
  finished: boolean().notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  finishedAt: timestamp('finished_at').notNull().defaultNow().onUpdateNow(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  tasks: many(tasksTable),
}));

export const taskRelations = relations(tasksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id],
  }),
}));
