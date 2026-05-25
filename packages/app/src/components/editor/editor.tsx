import { cn, debounce } from '@maxigarcia/js-utils';
import { editor, Uri } from 'monaco-editor';
import { useEffect, useRef } from 'react';
import { EDITOR_CONSTRUCTION_OPTIONS } from './config';

interface EditorProps {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  /**
   * Last segment of the model URI (e.g. `headers.json`). Drives JSON-schema
   * suggestions registered in `config.ts` via `fileMatch`.
   */
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
  const editorInstanceRef = useRef<editor.IStandaloneCodeEditor>(null);
  const modelRef = useRef<editor.ITextModel>(null);

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

      modelRef.current = editor.createModel(value, 'json', modelUri);

      editorInstanceRef.current = editor.create(
        editorContainerRef.current,
        {
          ...EDITOR_CONSTRUCTION_OPTIONS,
          contextmenu: false,
          readOnly,
          model: modelRef.current,
        },
      );

      const debouncedOnChange = onChange ? debounce(onChange, 100) : undefined;

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current.getValue();
        debouncedOnChange?.(value);
      });

      return () => {
        editorInstanceRef.current?.dispose();
        modelRef.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getValue()) {
      editorInstanceRef.current.setValue(value);
      focusEditor();
    }
  }, [value]);

  return (
    <div ref={editorContainerRef} className={cn('h-full w-full', className)} />
  );
}
