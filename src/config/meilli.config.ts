// src/config/meilli.config.ts
import { MelliConfig } from '@/modules/meilisearch/types';

export const meilli = (): MelliConfig => [
  {
    name: 'default',
    host: 'http://localhost:7700',
  },
];
