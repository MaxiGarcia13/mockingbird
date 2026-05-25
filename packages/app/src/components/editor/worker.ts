import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

type MonacoWorkerFactory = (workerId: string, label: string) => Worker;

interface MonacoEnvironment {
  getWorker: MonacoWorkerFactory;
}

declare global {
  interface Window {
    MonacoEnvironment?: MonacoEnvironment;
  }
}

window.MonacoEnvironment = {
  getWorker(_workerId, label) {
    if (label === 'json') {
      return new JsonWorker();
    }
    return new EditorWorker();
  },
};
