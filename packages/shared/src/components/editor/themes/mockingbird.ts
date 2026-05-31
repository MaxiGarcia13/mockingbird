import type { editor } from 'monaco-editor';
import type { ColorScheme } from '../../../utils/color-scheme';

interface MockingbirdPalette {
  background: string;
  backgroundAlpha: string;
  currentLine: string;
  selection: string;
  foreground: string;
  mutedForeground: string;
  comment: string;
  invisibles: string;
  accent: string;
  delimiter: string;
  lavender: string;
  lilac: string;
  rose: string;
  blue: string;
  teal: string;
  green: string;
  yellow: string;
  orange: string;
  red: string;
}

const LIGHT_PALETTE: MockingbirdPalette = {
  background: 'ffffff',
  backgroundAlpha: 'f0',
  currentLine: 'e8e3f4',
  selection: 'cfc6e6',
  foreground: '100e18',
  mutedForeground: '3f3655',
  comment: '5c5470',
  invisibles: '9d93b8',
  accent: 'b794ff',
  delimiter: '64748b',
  lavender: '4a1d96',
  lilac: '5b21b6',
  rose: '7e22ce',
  blue: '1d4ed8',
  teal: '0f766e',
  green: '166534',
  yellow: '854d0e',
  orange: '9a3412',
  red: '991b1b',
};

const DARK_PALETTE: MockingbirdPalette = {
  background: '181426',
  backgroundAlpha: 'd1',
  currentLine: '1a1628',
  selection: '3d3260',
  foreground: 'f5f1ff',
  mutedForeground: 'b8b0d0',
  comment: '8a82a8',
  invisibles: '3d3558',
  accent: 'b794ff',
  delimiter: '9690a8',
  lavender: 'cbbaff',
  lilac: 'd8b4fe',
  rose: 'f0abfc',
  blue: '93c5fd',
  teal: '5eead4',
  green: '86efac',
  yellow: 'fde68a',
  orange: 'fdba74',
  red: 'fb7185',
};

function createRules(palette: MockingbirdPalette): editor.ITokenThemeRule[] {
  return [
    {
      background: palette.background,
      token: '',
    },
    {
      foreground: palette.comment,
      fontStyle: 'italic',
      token: 'comment',
    },
    {
      foreground: palette.lavender,
      token: 'number',
    },
    {
      foreground: palette.lavender,
      token: 'string',
    },
    {
      foreground: palette.lavender,
      token: 'constant.numeric',
    },
    {
      foreground: palette.lavender,
      token: 'constant.language',
    },
    {
      foreground: palette.lavender,
      token: 'constant.character',
    },
    {
      foreground: palette.lavender,
      token: 'constant.other',
    },
    {
      foreground: palette.rose,
      token: 'constant.character.escaped',
    },
    {
      foreground: palette.rose,
      token: 'constant.character.escape',
    },
    {
      foreground: palette.rose,
      token: 'string source',
    },
    {
      foreground: palette.rose,
      token: 'string source.ruby',
    },
    {
      foreground: palette.accent,
      token: 'keyword',
    },
    {
      foreground: palette.accent,
      token: 'storage',
    },
    {
      foreground: palette.lavender,
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: palette.blue,
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: palette.blue,
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: palette.blue,
      token: 'type.class',
    },
    {
      foreground: palette.lavender,
      token: 'type.class.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'type.class.declaration.readonly',
    },
    {
      foreground: palette.teal,
      token: 'type.interface',
    },
    {
      foreground: palette.lavender,
      token: 'type.interface.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'type.interface.declaration.readonly',
    },
    {
      foreground: palette.teal,
      token: 'type.namespace',
    },
    {
      foreground: palette.teal,
      token: 'type',
    },
    {
      foreground: palette.lavender,
      token: 'type.enum',
    },
    {
      foreground: palette.lilac,
      token: 'entity.name.function',
    },
    {
      foreground: palette.lilac,
      token: 'variable.function',
    },
    {
      foreground: palette.lilac,
      token: 'variable.function.declaration',
    },
    {
      foreground: palette.lilac,
      token: 'variable.function.defaultLibrary',
    },
    {
      foreground: palette.lilac,
      token: 'member',
    },
    {
      foreground: palette.lilac,
      token: 'member.declaration',
    },
    {
      foreground: palette.lilac,
      token: 'member.defaultLibrary',
    },
    {
      foreground: palette.lilac,
      token: 'support.function',
    },
    {
      foreground: palette.orange,
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: palette.orange,
      token: 'type.parameters',
    },
    {
      foreground: palette.lavender,
      token: 'variable.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'variable.declaration.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'variable.declaration.readonly.defaultLibrary',
    },
    {
      foreground: palette.lavender,
      token: 'type.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'type.declaration.readonly',
    },
    {
      foreground: palette.lavender,
      token: 'variable.enummember',
    },
    {
      foreground: palette.lavender,
      token: 'property.readonly',
    },
    {
      foreground: palette.accent,
      token: 'entity.name.tag',
    },
    {
      foreground: palette.lavender,
      token: 'support.constant',
    },
    {
      foreground: palette.teal,
      fontStyle: 'italic',
      token: 'support.type',
    },
    {
      foreground: palette.blue,
      fontStyle: 'italic',
      token: 'support.class',
    },
    {
      foreground: palette.foreground,
      background: palette.red,
      token: 'invalid',
    },
    {
      foreground: palette.foreground,
      background: palette.accent,
      token: 'invalid.deprecated',
    },
    {
      foreground: palette.comment,
      token: 'meta.diff',
    },
    {
      foreground: palette.comment,
      token: 'meta.diff.header',
    },
    {
      foreground: palette.red,
      token: 'markup.deleted',
    },
    {
      foreground: palette.green,
      token: 'markup.inserted',
    },
    {
      foreground: palette.yellow,
      token: 'markup.changed',
    },
    {
      foreground: palette.lavender,
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: palette.yellow,
      token: 'entity.name.filename',
    },
    {
      foreground: palette.red,
      token: 'message.error',
    },
    {
      foreground: palette.rose,
      token: 'string.key.json',
    },
    {
      foreground: palette.lavender,
      token: 'string.value.json',
    },
    {
      foreground: palette.lilac,
      token: 'number.json',
    },
    {
      foreground: palette.accent,
      token: 'keyword.json',
    },
    {
      foreground: palette.delimiter,
      token: 'delimiter.bracket.json',
    },
    {
      foreground: palette.delimiter,
      token: 'delimiter.array.json',
    },
    {
      foreground: palette.delimiter,
      token: 'delimiter.colon.json',
    },
    {
      foreground: palette.delimiter,
      token: 'delimiter.comma.json',
    },
  ];
}

function createColors(palette: MockingbirdPalette): editor.IColors {
  return {
    'editor.foreground': `#${palette.foreground}`,
    'editor.background': `#${palette.background}${palette.backgroundAlpha}`,
    'editor.selectionBackground': `#${palette.selection}`,
    'editor.inactiveSelectionBackground': `#${palette.selection}99`,
    'editor.lineHighlightBackground': `#${palette.currentLine}`,
    'editor.lineHighlightBorder': '#00000000',
    'editorCursor.foreground': `#${palette.accent}`,
    'editorWhitespace.foreground': `#${palette.invisibles}`,
    'editorIndentGuide.background': `#${palette.invisibles}`,
    'editorIndentGuide.activeBackground': `#${palette.accent}66`,
    'editor.selectionHighlightBackground': `#${palette.accent}30`,
    'editor.selectionHighlightBorder': '#00000000',
    'editor.wordHighlightBackground': `#${palette.accent}28`,
    'editor.wordHighlightStrongBackground': `#${palette.accent}38`,
    'editor.findMatchBackground': `#${palette.accent}48`,
    'editor.findMatchHighlightBackground': `#${palette.accent}30`,
    'editorBracketMatch.background': `#${palette.accent}38`,
    'editorBracketMatch.border': `#${palette.accent}99`,
    'editorLineNumber.foreground': `#${palette.comment}`,
    'editorLineNumber.activeForeground': `#${palette.accent}`,
    'editorGutter.background': `#${palette.background}${palette.backgroundAlpha}`,
    'scrollbarSlider.background': `#${palette.invisibles}cc`,
    'scrollbarSlider.hoverBackground': `#${palette.selection}`,
    'scrollbarSlider.activeBackground': `#${palette.accent}99`,
    'editorWidget.background': `#${palette.currentLine}`,
    'editorWidget.border': `#${palette.selection}`,
    'editorSuggestWidget.background': `#${palette.currentLine}`,
    'editorSuggestWidget.border': `#${palette.selection}`,
    'editorSuggestWidget.selectedBackground': `#${palette.accent}38`,
    'editorHoverWidget.background': `#${palette.currentLine}`,
    'editorHoverWidget.border': `#${palette.selection}`,
  };
}

function createMockingbirdTheme(
  mode: ColorScheme,
  palette: MockingbirdPalette,
): editor.IStandaloneThemeData {
  return {
    base: mode === 'dark' ? 'vs-dark' : 'vs',
    inherit: true,
    rules: createRules(palette),
    colors: createColors(palette),
  };
}

export const mockingbirdLightTheme = createMockingbirdTheme('light', LIGHT_PALETTE);
export const mockingbirdDarkTheme = createMockingbirdTheme('dark', DARK_PALETTE);
