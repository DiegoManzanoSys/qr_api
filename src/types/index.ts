export interface Codigo {
  id: string;
  data: string;
  type: string;
}

export interface CodigoInput {
  id?: string;
  data: string;
  type?: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}