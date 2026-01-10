export enum OperationConcurrency {
  EXCLUSIVE = 'EXCLUSIVE', // блокирует другие
  PARALLEL = 'PARALLEL', // допускает параллельность
}
