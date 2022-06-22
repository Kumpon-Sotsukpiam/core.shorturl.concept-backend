export interface SerializedException {
  message: string;
  code: string;
  stack?: string;
  metadata?: unknown;
}
