/* ========================================
   Astrova — API Client
   ========================================

   Central API client for all backend communication.
   Automatically attaches the development API key to requests.
   ======================================== */

/* ========================================
   Astrova — API Client
   ========================================

   Central API client for all backend communication.
   Uses /api/proxy/* route to keep API key server-side.
   ======================================== */

import { API_BASE_URL } from "@/constants";

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

  /**
   * Convert backend endpoint to proxy URL.
   * /heritage → /api/proxy/heritage
   */
  private getProxyUrl(endpoint: string): string {
    // Remove leading /api/ if present, then prepend /api/proxy/
    const cleanEndpoint = endpoint.replace(/^\/api\//, "/");
    return `/api/proxy${cleanEndpoint}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = "GET", headers = {}, body } = options;

    // Route through proxy (API key attached server-side)
    const url = this.getProxyUrl(endpoint);

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "include", // Send cookies for auth session
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An unexpected error occurred",
      }));

      // Handle API key errors specifically
      if (response.status === 401) {
        throw new Error(
          error.error?.message ||
            "Authentication failed. Please check server configuration."
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

  /**
   * Request with custom headers (e.g. X-Admin-Token)
   */
  async requestWithHeaders<T>(
    endpoint: string,
    method: string,
    headers: Record<string, string>,
    body?: unknown
  ): Promise<T> {
    return this.request<T>(endpoint, { method, headers, body });
  }
}

export const api = new ApiClient();
