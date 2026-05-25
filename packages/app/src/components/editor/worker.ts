import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

type MonacoWorkerFactory = (workerId: string, label: string) => Worker;

interface MonacoEnvironment {
  getWorker: MonacoWorkerFactory;
}

declare global {
  interface WorkerGlobalScope {
    MonacoEnvironment?: MonacoEnvironment;
  }
}

const workerGlobalScope = globalThis as WorkerGlobalScope;

workerGlobalScope.MonacoEnvironment = {
  getWorker() {
    return new JsonWorker();
  },
};
