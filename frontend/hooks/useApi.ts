"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/services/api";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  /** Whether to fetch immediately on mount/endpoint change. Default: true */
  immediate?: boolean;
}

/**
 * Generic hook for fetching data from the backend API.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi<Location[]>("/locations");
 *   const { data } = useApi<SearchResult[]>("/search?q=patan", { immediate: false });
 *   // later: refetch()
 */
export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = { immediate: true }
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Track whether we've already fetched for the current endpoint
  const lastEndpointRef = useRef<string | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await api.get<{ success: boolean; data: T }>(endpoint);
      setState({ data: response.data, loading: false, error: null });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred",
      });
    }
  }, [endpoint]);

  useEffect(() => {
    // Only auto-fetch if immediate is true OR the endpoint has changed
    if (options.immediate || lastEndpointRef.current !== endpoint) {
      lastEndpointRef.current = endpoint;
      if (options.immediate || hasFetchedRef.current) {
        fetchData();
      }
      hasFetchedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, options.immediate]);

  return { ...state, refetch: fetchData };
}
