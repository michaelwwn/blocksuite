import { type BlockModel, Slice } from '@blocksuite/store';
import { html, nothing } from 'lit';
import { ref, type RefOrCallback } from 'lit/directives/ref.js';

import { toast } from '../../_common/components/toast.js';
import {
  CopyIcon,
  DeleteIcon,
  RunIcon,
  StopIcon,
} from '../../_common/icons/index.js';
import type { SnippetBlockComponent } from '../snippet-block.js';

export function SnippetOptionTemplate({
  ref: containerRef,
  model,
  execute,
  onClickExecute,
  anchor,
}: {
  ref?: RefOrCallback;
  anchor: SnippetBlockComponent;
  model: BlockModel;
  execute: boolean;
  abortController: AbortController;
  onClickExecute: () => void;
}) {
  const page = model.doc;
  const readonly = page.readonly;

  return html`
    <style>
      :host {
        z-index: 1;
      }
      .affine-codeblock-option {
        box-shadow: var(--affine-shadow-2);
        padding: 8px;
        border-radius: 8px;
        z-index: var(--affine-z-index-popover);
        background: var(--affine-background-overlay-panel-color);
      }
      .delete-code-button:hover {
        background: var(--affine-background-error-color);
        color: var(--affine-error-color);
      }
      .delete-code-button:hover > svg {
        color: var(--affine-error-color);
      }
    </style>

    <div ${ref(containerRef)} class="affine-codeblock-option">
      <icon-button
        size="32px"
        data-testid="copy-button"
        @click=${() => {
          const slice = Slice.fromModels(model.doc, [model]);
          anchor.std.clipboard
            .copySlice(slice)
            .then(() => {
              toast(anchor.host, 'Copied to clipboard');
            })
            .catch(e => {
              toast(anchor.host, 'Copied failed, something went wrong');
              console.error(e);
            });
        }}
      >
        ${CopyIcon}
        <affine-tooltip tip-position="right" .offset=${12}
          >Copy to Clipboard</affine-tooltip
        >
      </icon-button>
      <icon-button
        size="32px"
        data-testid="execute-button"
        ?active=${execute}
        @click=${onClickExecute}
      >
        ${execute ? StopIcon : RunIcon}
        <affine-tooltip tip-position="right" .offset=${12}
          >${execute ? 'Stop Execution' : 'Run Code'}</affine-tooltip
        >
      </icon-button>
      ${readonly
        ? nothing
        : html`<icon-button
            size="32px"
            data-testid="delete-button"
            class="delete-code-button"
            @click=${() => {
              if (readonly) return;
              model.doc.deleteBlock(model);
            }}
          >
            ${DeleteIcon}
            <affine-tooltip tip-position="right" .offset=${12}
              >Delete</affine-tooltip
            >
          </icon-button>`}
    </div>
  `;
}
