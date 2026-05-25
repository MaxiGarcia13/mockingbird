import { editor } from 'monaco-editor';
import { mockingbirdTheme } from './themes/mockingbird';

import './worker?worker';

const THEME_NAME = 'mockingbird';

editor.defineTheme(THEME_NAME, mockingbirdTheme);

editor.setTheme(THEME_NAME);

export const EDITOR_CONSTRUCTION_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  theme: THEME_NAME,
  language: 'json',
  fontFamily: 'Fira Code, monospace',
  fontLigatures: true,
  fontSize: 16,

  tabSize: 2,

  minimap: {
    enabled: false,
  },

  lineNumbers: 'off',
  glyphMargin: false,
  renderWhitespace: 'all',
  bracketPairColorization: {
    enabled: true,
  },

  wordWrap: 'on',
  cursorBlinking: 'expand',

  formatOnPaste: true,

  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,

  padding: {
    top: 16,
  },
};
