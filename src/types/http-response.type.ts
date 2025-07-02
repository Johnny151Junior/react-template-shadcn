export interface IHttpResponse<T> {
  data: T | null;
  status: number;
  message: string;
  total?: number;
}
export interface IHttpPayload {
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export interface IHttpErrorResponse {
  message: string;
  code: number;
}
