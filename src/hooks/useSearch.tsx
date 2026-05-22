// src/hooks/useKuboSearch.ts
import { useState } from "react";
import { apiFetch, ApiError } from "../config/useApi";

export interface ScrapedProductSuggestion {
  id: string;
  nameNormalized: string;
  brand: string | null;
  category: string | null;
  imageUrl: string;
  storeCount: number;    // Sincronizado con Postman
  referencePrice: number; // Sincronizado con Postman
}

export function useSearch() {
  const [suggestions, setSuggestions] = useState<ScrapedProductSuggestion[]>([]);
  const [searchResults, setSearchResults] = useState<ScrapedProductSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Sugerencias en tiempo real (Typeahead)
  const fetchSuggestions = async (query: string) => {
    if (!query.trim() || query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      // Ruta real de sugerencias válida para el Gateway
      const data = await apiFetch<ScrapedProductSuggestion[]>(`/search/suggest?q=${encodeURIComponent(query)}`);
      setSuggestions(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Error en sugerencias:", message);
      setError(`No se pudo obtener sugerencias: ${message}`);
      setSuggestions([]);
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeSearch = async (query: string) => {
    if (!query.trim() || query.trim().length < 3) return;
    
    setLoading(true);
    setError(null);

    const performSearch = async () => {
      return apiFetch<ScrapedProductSuggestion[]>(`/search?q=${encodeURIComponent(query)}`);
    };

    try {
      let data: ScrapedProductSuggestion[];
      try {
        data = await performSearch();
      } catch (err: unknown) {
        if (err instanceof ApiError && err.status === 404) {
          // Retry once for a warm-up / scraping-on-demand scenario
          await delay(900);
          data = await performSearch();
        } else {
          throw err;
        }
      }
      setSearchResults(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Error ejecutando búsqueda:", message);
      const isWarmup = err instanceof ApiError && err.status === 404;
      setError(isWarmup
        ? "El Gateway está inicializando la consulta o realizando scraping. Intenta de nuevo en unos segundos."
        : `No se pudo conectar al servidor de búsqueda: ${message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    suggestions,
    searchResults,
    loading,
    error,
    fetchSuggestions,
    executeSearch,
    clearSuggestions: () => setSuggestions([])
  };
}