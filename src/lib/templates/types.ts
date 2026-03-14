import type { ReactElement } from 'react';

export type FieldType = 'text' | 'textarea' | 'select' | 'color';

export interface TemplateField {
  name: string;
  label: string;
  type: FieldType;
  default: string;
  options?: string[]; // for select type
  placeholder?: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  category: 'terminal' | 'social' | 'dev';
  description: string;
  fields: TemplateField[];
  defaultSize: 'ig-square' | 'ig-story';
}

export type TemplateValues = Record<string, string>;

export interface TemplateModule {
  config: TemplateConfig;
  SatoriTemplate: (props: { values: TemplateValues; width: number; height: number }) => ReactElement;
  PreviewTemplate: (props: { values: TemplateValues }) => ReactElement;
}
