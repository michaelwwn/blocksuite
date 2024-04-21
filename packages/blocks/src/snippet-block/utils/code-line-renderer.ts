import type { AttributeRenderer } from '@blocksuite/inline';
import { html } from 'lit';

import type { SnippetHighlightOptionsGetter } from '../snippet-model.js';

export const getCodeLineRenderer: (
  highlightOptionsGetter: SnippetHighlightOptionsGetter
) => AttributeRenderer = highlightOptionsGetter => delta => {
  return html`<affine-code-line
    .delta=${delta}
    .highlightOptionsGetter=${highlightOptionsGetter}
  ></affine-code-line>`;
};
