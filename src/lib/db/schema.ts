import { pgTable, text, serial, jsonb, timestamp, index } from 'drizzle-orm/pg-core';

export const templates = pgTable('templates', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  defaultSize: text('default_size').notNull().default('ig-square'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const creations = pgTable('creations', {
  id: serial('id').primaryKey(),
  templateId: text('template_id').notNull().references(() => templates.id),
  valuesJson: jsonb('values_json').notNull(),
  exportSize: text('export_size').notNull(),
  exportFormat: text('export_format').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('idx_creations_template').on(table.templateId),
  index('idx_creations_created').on(table.createdAt),
]);
