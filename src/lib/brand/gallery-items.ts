import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Presentation,
  Mail,
  Terminal,
  Flame,
  Target,
  PenTool,
  Hexagon,
} from 'lucide-react';

export interface GalleryItem {
  slug: string;
  title: string;
  description: string;
  file: string;
  category: 'brand' | 'logo' | 'collateral';
  icon: LucideIcon;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: 'brand-guidelines',
    title: 'Brand Guidelines',
    description: 'Complete brand identity system — colors, typography, logo usage, and philosophy.',
    file: 'calidevs-brand-guidelines.html',
    category: 'brand',
    icon: BookOpen,
  },
  {
    slug: 'sales-deck',
    title: 'Sales Deck',
    description: '18-slide presentation — services, process, case studies, pricing tiers.',
    file: 'calidevs-sales-deck.html',
    category: 'collateral',
    icon: Presentation,
  },
  {
    slug: 'stationery',
    title: 'Stationery',
    description: 'Business cards, letterhead, envelope, invoice, email signature, social, merch.',
    file: 'calidevs-stationery.html',
    category: 'collateral',
    icon: Mail,
  },
  {
    slug: 'dev-applications',
    title: 'Dev Applications',
    description: 'Terminal posts, CLI card, git log, deploy notifications, 404 page, wallpapers.',
    file: 'calidevs-dev-applications.html',
    category: 'collateral',
    icon: Terminal,
  },
  {
    slug: 'flame-proposals',
    title: 'Flame Proposals',
    description: '10 flame icon proposals — exploration of shapes, layers, and expressions.',
    file: 'calidevs-flame-proposals.html',
    category: 'logo',
    icon: Flame,
  },
  {
    slug: 'flame-iconic',
    title: 'Flame Iconic',
    description: '6 refined flame concepts (A-F) — final selection round.',
    file: 'calidevs-flame-iconic.html',
    category: 'logo',
    icon: Target,
  },
  {
    slug: 'logo-concepts',
    title: 'Logo Concepts v1',
    description: 'Initial wordmark explorations and logo concepts.',
    file: 'logo-calidevs-2026.html',
    category: 'logo',
    icon: PenTool,
  },
  {
    slug: 'logo-fire',
    title: 'Logo FIRE',
    description: 'Fire-themed logo iterations and final flame integration.',
    file: 'logo-calidevs-FIRE.html',
    category: 'logo',
    icon: Hexagon,
  },
];
