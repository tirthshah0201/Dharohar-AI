/* ========================================
   Astrova Backend — Types
   ======================================== */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthResponse {
  success: boolean;
  service: string;
  version: string;
  timestamp: string;
}
