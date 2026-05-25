import type { editor } from 'monaco-editor';

const THEME = {
  background: '161224',
  backgroundAlpha: 'a6',
  currentLine: '241e3a',
  selection: '332b4d',
  foreground: 'f0ecff',
  mutedForeground: '9d94b8',
  comment: '6d6485',
  invisibles: '2a2440',

  accent: 'a78bfa',
  lavender: 'c4b5fd',
  lilac: 'd8b4fe',
  rose: 'f0abfc',

  blue: '93c5fd',
  teal: '5eead4',
  green: '86efac',
  yellow: 'fde68a',
  orange: 'fdba74',
  red: 'fca5a5',
} as const;

export const mockingbirdTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: THEME.background,
      token: '',
    },
    {
      foreground: THEME.comment,
      fontStyle: 'italic',
      token: 'comment',
    },
    {
      foreground: THEME.lavender,
      token: 'number',
    },
    {
      foreground: THEME.lavender,
      token: 'string',
    },
    {
      foreground: THEME.lavender,
      token: 'constant.numeric',
    },
    {
      foreground: THEME.lavender,
      token: 'constant.language',
    },
    {
      foreground: THEME.lavender,
      token: 'constant.character',
    },
    {
      foreground: THEME.lavender,
      token: 'constant.other',
    },
    {
      foreground: THEME.rose,
      token: 'constant.character.escaped',
    },
    {
      foreground: THEME.rose,
      token: 'constant.character.escape',
    },
    {
      foreground: THEME.rose,
      token: 'string source',
    },
    {
      foreground: THEME.rose,
      token: 'string source.ruby',
    },
    {
      foreground: THEME.accent,
      token: 'keyword',
    },
    {
      foreground: THEME.accent,
      token: 'storage',
    },
    {
      foreground: THEME.lavender,
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: THEME.blue,
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: THEME.blue,
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: THEME.blue,
      token: 'type.class',
    },
    {
      foreground: THEME.lavender,
      token: 'type.class.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'type.class.declaration.readonly',
    },
    {
      foreground: THEME.teal,
      token: 'type.interface',
    },
    {
      foreground: THEME.lavender,
      token: 'type.interface.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'type.interface.declaration.readonly',
    },
    {
      foreground: THEME.teal,
      token: 'type.namespace',
    },
    {
      foreground: THEME.teal,
      token: 'type',
    },
    {
      foreground: THEME.lavender,
      token: 'type.enum',
    },
    {
      foreground: THEME.lilac,
      token: 'entity.name.function',
    },
    {
      foreground: THEME.lilac,
      token: 'variable.function',
    },
    {
      foreground: THEME.lilac,
      token: 'variable.function.declaration',
    },
    {
      foreground: THEME.lilac,
      token: 'variable.function.defaultLibrary',
    },
    {
      foreground: THEME.lilac,
      token: 'member',
    },
    {
      foreground: THEME.lilac,
      token: 'member.declaration',
    },
    {
      foreground: THEME.lilac,
      token: 'member.defaultLibrary',
    },
    {
      foreground: THEME.lilac,
      token: 'support.function',
    },
    {
      foreground: THEME.orange,
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: THEME.orange,
      token: 'type.parameters',
    },
    {
      foreground: THEME.lavender,
      token: 'variable.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'variable.declaration.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'variable.declaration.readonly.defaultLibrary',
    },
    {
      foreground: THEME.lavender,
      token: 'type.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'type.declaration.readonly',
    },
    {
      foreground: THEME.lavender,
      token: 'variable.enummember',
    },
    {
      foreground: THEME.lavender,
      token: 'property.readonly',
    },
    {
      foreground: THEME.accent,
      token: 'entity.name.tag',
    },
    {
      foreground: THEME.lavender,
      token: 'support.constant',
    },
    {
      foreground: THEME.teal,
      fontStyle: 'italic',
      token: 'support.type',
    },
    {
      foreground: THEME.blue,
      fontStyle: 'italic',
      token: 'support.class',
    },
    {
      foreground: THEME.foreground,
      background: THEME.red,
      token: 'invalid',
    },
    {
      foreground: THEME.foreground,
      background: THEME.accent,
      token: 'invalid.deprecated',
    },
    {
      foreground: THEME.comment,
      token: 'meta.diff',
    },
    {
      foreground: THEME.comment,
      token: 'meta.diff.header',
    },
    {
      foreground: THEME.red,
      token: 'markup.deleted',
    },
    {
      foreground: THEME.green,
      token: 'markup.inserted',
    },
    {
      foreground: THEME.yellow,
      token: 'markup.changed',
    },
    {
      foreground: THEME.lavender,
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: THEME.yellow,
      token: 'entity.name.filename',
    },
    {
      foreground: THEME.red,
      token: 'message.error',
    },
    {
      foreground: THEME.rose,
      token: 'string.key.json',
    },
    {
      foreground: THEME.lavender,
      token: 'string.value.json',
    },
    {
      foreground: THEME.lilac,
      token: 'number.json',
    },
    {
      foreground: THEME.accent,
      token: 'keyword.json',
    },
    {
      foreground: THEME.mutedForeground,
      token: 'delimiter.bracket.json',
    },
    {
      foreground: THEME.mutedForeground,
      token: 'delimiter.array.json',
    },
    {
      foreground: THEME.mutedForeground,
      token: 'delimiter.colon.json',
    },
    {
      foreground: THEME.mutedForeground,
      token: 'delimiter.comma.json',
    },
  ],
  colors: {
    'editor.foreground': `#${THEME.foreground}`,
    'editor.background': `#${THEME.background}${THEME.backgroundAlpha}`,
    'editor.selectionBackground': `#${THEME.selection}`,
    'editor.lineHighlightBackground': `#${THEME.currentLine}`,
    'editor.lineHighlightBorder': '#00000000',
    'editorCursor.foreground': `#${THEME.accent}`,
    'editorWhitespace.foreground': `#${THEME.invisibles}`,
    'editorIndentGuide.background': `#${THEME.invisibles}`,
    'editorIndentGuide.activeBackground': `#${THEME.accent}55`,
    'editor.selectionHighlightBackground': `#${THEME.accent}25`,
    'editor.selectionHighlightBorder': '#00000000',
    'editor.wordHighlightBackground': `#${THEME.accent}20`,
    'editor.wordHighlightStrongBackground': `#${THEME.accent}30`,
    'editor.findMatchBackground': `#${THEME.accent}40`,
    'editor.findMatchHighlightBackground': `#${THEME.accent}25`,
    'editorBracketMatch.background': `#${THEME.accent}30`,
    'editorBracketMatch.border': `#${THEME.accent}80`,
    'editorLineNumber.foreground': `#${THEME.comment}`,
    'editorLineNumber.activeForeground': `#${THEME.accent}`,
    'editorGutter.background': `#${THEME.background}${THEME.backgroundAlpha}`,
    'scrollbarSlider.background': `#${THEME.currentLine}aa`,
    'scrollbarSlider.hoverBackground': `#${THEME.selection}cc`,
    'scrollbarSlider.activeBackground': `#${THEME.accent}80`,
    'editorWidget.background': `#${THEME.currentLine}`,
    'editorWidget.border': `#${THEME.selection}`,
    'editorSuggestWidget.background': `#${THEME.currentLine}`,
    'editorSuggestWidget.border': `#${THEME.selection}`,
    'editorSuggestWidget.selectedBackground': `#${THEME.accent}30`,
    'editorHoverWidget.background': `#${THEME.currentLine}`,
    'editorHoverWidget.border': `#${THEME.selection}`,
  },
};
