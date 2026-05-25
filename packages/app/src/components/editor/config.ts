import { editor, json } from 'monaco-editor';
import { requestHeadersSchema } from './schemas/request-headers';
import { mockingbirdTheme } from './themes/mockingbird';
import './worker';

const THEME_NAME = 'mockingbird';

editor.defineTheme(THEME_NAME, mockingbirdTheme);

editor.setTheme(THEME_NAME);

// Stable file names used as the last segment of each editor model URI so that
// `fileMatch` patterns below can target a specific kind of editor.
export const EDITOR_PATHS = {
  headers: 'headers.json',
  body: 'body.json',
} as const;

json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: [
    {
      uri: 'mockingbird://schema/request-headers.json',
      fileMatch: [`**/${EDITOR_PATHS.headers}`],
      schema: requestHeadersSchema,
    },
    // Empty schema mapped to the body editor so monaco-json stops suggesting
    // `$schema` at the root of the document.
    {
      uri: 'mockingbird://schema/body.json',
      fileMatch: [`**/${EDITOR_PATHS.body}`],
      schema: {},
    },
  ],
});

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
