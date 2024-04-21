import { defineBlockSchema, type SchemaToModel } from '@blocksuite/store';
import type { BundledLanguage, Highlighter, PlainTextLanguage } from 'shiki';

import { FALLBACK_LANG } from './utils/consts.js';

export const SnippetBlockSchema = defineBlockSchema({
  flavour: 'affine:snippet',
  props: internal => ({
    text: internal.Text(),
    language: FALLBACK_LANG,
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: ['affine:note', 'affine:paragraph', 'affine:list'],
    children: [],
  },
});

export type SnippetBlockModel = SchemaToModel<typeof SnippetBlockSchema>;

export type SnippetHighlightOptionsGetter = () => {
  lang: BundledLanguage | PlainTextLanguage;
  highlighter: Highlighter | null;
};
