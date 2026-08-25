/* ========================================
   Dharohar AI — API Client
   ========================================

   Central API client for all backend communication.
   Automatically attaches the development API key to requests.
   ======================================== */

import { API_BASE_URL, DEMO_API_KEY } from "@/constants";

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body } = options;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        // Attach development API key for backend connectivity
        ...(DEMO_API_KEY ? { "X-API-Key": DEMO_API_KEY } : {}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An unexpected error occurred",
      }));

      // Handle API key errors specifically
      if (response.status === 401) {
        throw new Error(
          error.error?.message ||
            "API key is invalid or missing. Check NEXT_PUBLIC_DEMO_API_KEY in your .env.local."
        );
      }

      throw new Error(error.error?.message || error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: "POST", body });
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: "PUT", body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiClient();
