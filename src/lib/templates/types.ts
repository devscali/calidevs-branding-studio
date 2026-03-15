import type { ReactElement } from 'react';

export type FieldType = 'text' | 'textarea' | 'select' | 'color' | 'image';

export interface ImageConstraints {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
}

export interface TemplateField {
  name: string;
  label: string;
  type: FieldType;
  default: string;
  options?: string[]; // for select type
  placeholder?: string;
  accept?: string; // for image type, e.g. '.png,.jpg,.psd'
  imageConstraints?: ImageConstraints;
}

export type TemplateCategory = 'terminal' | 'social' | 'dev' | 'campaign' | 'custom' | 'presentation' | 'motion';

export interface TemplateConfig {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  fields: TemplateField[];
  defaultSize: string; // ExportSize key from constants
  pages?: TemplateField[][]; // for multi-page (presentation) templates
}

export type TemplateValues = Record<string, string>;

export interface TemplateModule {
  config: TemplateConfig;
  SatoriTemplate: (props: { values: TemplateValues; width: number; height: number }) => ReactElement;
  PreviewTemplate: (props: { values: TemplateValues }) => ReactElement;
}
