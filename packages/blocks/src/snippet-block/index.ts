import type { SnippetBlockModel } from './snippet-model.js';

export * from './snippet-block.js';
export * from './snippet-model.js';
//export * from './components/index.js';

declare global {
  namespace BlockSuite {
    interface BlockModels {
      'affine:snippet': SnippetBlockModel;
    }
  }
}
