import { editor, json } from 'monaco-editor';
import { getColorScheme } from '../../utils/color-scheme';
import { requestHeadersSchema } from './schemas/request-headers';
import { mockingbirdDarkTheme, mockingbirdLightTheme } from './themes/mockingbird';
import './worker';

export const EDITOR_THEME_NAMES = {
  light: 'mockingbird-light',
  dark: 'mockingbird-dark',
} as const;

editor.defineTheme(EDITOR_THEME_NAMES.light, mockingbirdLightTheme);
editor.defineTheme(EDITOR_THEME_NAMES.dark, mockingbirdDarkTheme);

export function getEditorThemeName(scheme = getColorScheme()) {
  return scheme === 'dark' ? EDITOR_THEME_NAMES.dark : EDITOR_THEME_NAMES.light;
}

editor.setTheme(getEditorThemeName());

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
