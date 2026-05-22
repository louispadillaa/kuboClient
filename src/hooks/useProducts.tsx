// src/hooks/useKuboProducts.ts
import { useState } from "react";
import { apiFetch } from "../config/useApi";

export interface ProductSnapshot {
  id: number; // ID numérico relacional de PostgreSQL
  price: number;
  storeName: string;
  scrapedAt: string;
}

export interface DetailedProduct {
  id: string;
  name: string;
  category: string;
  lowestPrice: number;
  highestPrice: number;
  bestStore: string;
  snapshots: ProductSnapshot[];
}

export function useProducts() {
  const [currentProduct, setCurrentProduct] = useState<DetailedProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProductDetail = async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<DetailedProduct>(`/products/${productId}`);
      setCurrentProduct(data);
    } catch (err: any) {
      setError(err.message || "No se pudo recuperar el análisis del producto.");
    } finally {
      setLoading(false);
    }
  };

  return { currentProduct, loading, error, getProductDetail };
}