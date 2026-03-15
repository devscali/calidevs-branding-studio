import { pgTable, text, serial, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core';

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

export const assets = pgTable('assets', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  originalFilename: text('original_filename').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),
  blobUrl: text('blob_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  width: integer('width'),
  height: integer('height'),
  sourceFormat: text('source_format').notNull(), // psd|ai|indd|aep|png|svg|jpeg|lottie|idml
  layerCount: integer('layer_count'),
  metadata: jsonb('metadata'),
  tags: text('tags').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('idx_assets_format').on(table.sourceFormat),
  index('idx_assets_created').on(table.createdAt),
]);

export const generatedTemplates = pgTable('generated_templates', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  sourceAssetId: integer('source_asset_id').references(() => assets.id),
  config: jsonb('config').notNull(),
  layers: jsonb('layers').notNull(),
  canvasWidth: integer('canvas_width').notNull(),
  canvasHeight: integer('canvas_height').notNull(),
  category: text('category').notNull().default('custom'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('idx_gen_templates_asset').on(table.sourceAssetId),
]);
