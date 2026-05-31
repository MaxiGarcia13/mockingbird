import { cn, debounce } from '@maxigarcia/js-utils';
import { editor as monacoEditor, Uri } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { subscribeToColorScheme } from '../../utils/color-scheme';
import { EDITOR_CONSTRUCTION_OPTIONS, getEditorThemeName } from './config';

interface EditorProps {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  path?: string;
}

export function Editor({
  className,
  value,
  onChange,
  readOnly,
  path,
}: EditorProps) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monacoEditor.IStandaloneCodeEditor>(null);
  const modelRef = useRef<monacoEditor.ITextModel>(null);

  const focusEditor = () => {
    if (window === window.parent) {
      editorInstanceRef.current?.focus();
    }
  };

  useEffect(() => {
    if (editorContainerRef.current) {
      const modelUri = path
        ? Uri.parse(`mockingbird://editor/${crypto.randomUUID()}/${path}`)
        : undefined;

      modelRef.current = monacoEditor.createModel(value, 'json', modelUri);

      editorInstanceRef.current = monacoEditor.create(
        editorContainerRef.current,
        {
          ...EDITOR_CONSTRUCTION_OPTIONS,
          theme: getEditorThemeName(),
          contextmenu: false,
          readOnly,
          model: modelRef.current,
        },
      );

      const debouncedOnChange = onChange ? debounce(onChange, 100) : undefined;

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current?.getValue?.();
        if (value) {
          debouncedOnChange?.(value);
        }
      });

      return () => {
        editorInstanceRef.current?.dispose();
        modelRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    return subscribeToColorScheme(() => {
      monacoEditor.setTheme(getEditorThemeName());
    });
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current?.getValue?.()) {
      editorInstanceRef.current.setValue(value);
      focusEditor();
    }
  }, [value]);

  return (
    <div
      ref={editorContainerRef}
      className={cn('h-full w-full', className)}
    />
  );
}
