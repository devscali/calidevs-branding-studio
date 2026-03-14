import type { TemplateModule } from './types';

// Terminal templates
import * as insightPost from './terminal/insight-post';
import * as deployPost from './terminal/deploy-post';
import * as diffPost from './terminal/diff-post';
import * as cliCard from './terminal/cli-card';
import * as packageJson from './terminal/package-json';

// Social templates
import * as quote from './social/quote';
import * as service from './social/service';
import * as stat from './social/stat';
import * as milestone from './social/milestone';
import * as shippedThisWeek from './social/shipped-this-week';

// Dev templates
import * as gitLog from './dev/git-log';
import * as releaseNotes from './dev/release-notes';
import * as statusPage from './dev/status-page';
import * as codeReview from './dev/code-review';
import * as deployCard from './dev/deploy-card';

export const TEMPLATES: Record<string, TemplateModule> = {
  'terminal-insight': insightPost,
  'terminal-deploy': deployPost,
  'terminal-diff': diffPost,
  'terminal-cli-card': cliCard,
  'terminal-package': packageJson,
  'social-quote': quote,
  'social-service': service,
  'social-stat': stat,
  'social-milestone': milestone,
  'social-shipped': shippedThisWeek,
  'dev-git-log': gitLog,
  'dev-release': releaseNotes,
  'dev-status': statusPage,
  'dev-review': codeReview,
  'dev-deploy-card': deployCard,
};

export const TEMPLATE_LIST = Object.values(TEMPLATES).map((t) => t.config);

export const CATEGORIES = ['all', 'terminal', 'social', 'dev'] as const;
export type Category = (typeof CATEGORIES)[number];

export function getTemplatesByCategory(category: Category) {
  if (category === 'all') return TEMPLATE_LIST;
  return TEMPLATE_LIST.filter((t) => t.category === category);
}

export function getTemplate(id: string): TemplateModule | undefined {
  return TEMPLATES[id];
}
