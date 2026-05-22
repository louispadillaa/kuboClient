// src/hooks/useApi.ts
const BASE_URL = "/api";

export class ApiError extends Error {
  status: number;
  body: string;

  constructor(status: number, statusText: string, body: string) {
    super(`Error en API de Kubo [${status}]: ${statusText}${body ? ` - ${body}` : ""}`);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Solo colocamos Content-Type en peticiones con body para evitar preflight CORS innecesario en GET
  const defaultHeaders: Record<string, string> = {};
  if (options?.method && options.method !== "GET" && options.method !== "HEAD") {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    mode: "cors",
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new ApiError(response.status, response.statusText, bodyText);
  }

  return response.json() as Promise<T>;
}