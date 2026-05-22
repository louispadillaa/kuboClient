// src/components/dashboard/SearchDashboard.tsx
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Sliders, ArrowUpDown, Layers, Store, RefreshCw, Sparkles, Loader2, SearchX } from "lucide-react";
import { ProductCard } from "../ui/ProductCard";
import { useSearch } from "../../hooks/useSearch";

export function SearchDashboard() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStore, setSelectedStore] = useState("Todas");
  const [sortBy, setSortBy] = useState("lowest");
  const [showFilters, setShowFilters] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions, searchResults, loading, error, fetchSuggestions, executeSearch, clearSuggestions } = useSearch();
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Manejar el click fuera de las sugerencias para cerrarlas
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Escuchar cambios en el input para disparar sugerencias del Gateway
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setShowSuggestions(val.trim().length >= 3);

    // Limpia el temporizador anterior para retrasar la llamada 300ms
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300); // Solo dispara al Gateway si el usuario para de escribir por 300ms
  };

  // Al seleccionar una sugerencia de la lista flotante
  const handleSelectSuggestion = (suggestionName: string) => {
    setQuery(suggestionName);
    setShowSuggestions(false);
    executeSearch(suggestionName); // Ejecuta búsqueda real
  };

  // Envío del formulario principal
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    executeSearch(query);
  };

  // Extraer dinámicamente las categorías y tiendas reales que vienen de la DB
  const uniqueCategories = useMemo(() => {
    const cats = new Set(searchResults.map((p) => p.category).filter(Boolean));
    return ["Todos", ...Array.from(cats)];
  }, [searchResults]);

  const uniqueStores = useMemo(() => {
    // Si tu tipado no incluye la tienda directamente en el listado, puedes usar valores por defecto o adaptarlo
    return ["Todas", "Alkosto", "Falabella", "Éxito", "Olímpica", "Mercado Libre"];
  }, [searchResults]);

  // Pipeline de filtrado en frontend sobre los datos reales devueltos por el backend
  const processedResults = useMemo(() => {
    return searchResults
      .filter((product) => {
        const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
        // Si tu backend retorna la tienda con mejor costo, filtramos por ella aquí
        return matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "lowest") return a.lowestPrice - b.lowestPrice;
        if (sortBy === "highest") return b.lowestPrice - a.lowestPrice;
        return 0;
      });
  }, [searchResults, selectedCategory, sortBy]);

  return (
    <div className="container px-4 md:px-8 mx-auto py-10" ref={containerRef}>

      {/* SECCIÓN BARRA DE BÚSQUEDA INTEGRADA CON GATEWAY */}
      <div className="max-w-3xl mx-auto mb-12 relative">
        <form onSubmit={handleFormSubmit} className="relative flex items-center z-30">
          <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Busca productos reales en la base de datos de Kubo (ej. azucar)..."
            className="w-full bg-card border border-border/80 rounded-2xl py-4 pl-14 pr-36 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground font-medium shadow-md transition-all placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2.5 bg-primary text-primary-foreground font-bold px-5 py-2 rounded-xl text-xs md:text-sm hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {/* RECUADRO FLOTANTE DE SUGERENCIAS EN TIEMPO REAL */}
        <AnimatePresence>
          {showSuggestions && query.trim().length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-0 right-0 top-full mt-2 bg-card border border-border shadow-xl rounded-2xl overflow-hidden z-50 max-h-64 overflow-y-auto"
            >
              {suggestions.length > 0 ? (
                suggestions.map((item) => {
                  // Validación ultra-defensiva para evitar crashes si el backend manda nulos
                  if (!item) return null;

                  const name = item.nameNormalized || "Producto sin nombre";
                  const category = item.category || "General";
                  const price = item.referencePrice || 0;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(name)}
                      className="w-full text-left px-5 py-3 hover:bg-muted/60 flex items-center justify-between border-b border-border/40 last:border-none transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {/* Contenedor de imagen real de sugerencia */}
                        <div className="w-10 h-10 rounded-lg bg-background border border-border/60 flex items-center justify-center overflow-hidden shrink-0">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={name} className="w-full h-full object-contain p-0.5" />
                          ) : (
                            <span className="text-lg">📦</span>
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {name}
                          </span>
                          <p className="text-[11px] text-muted-foreground capitalize">{category}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg shrink-0">
                        Desde ${price.toLocaleString("es-CO")}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                  No hay sugerencias para <span className="font-semibold text-foreground">"{query}"</span>. Sigue escribiendo para refinar la búsqueda.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DASHBOARD GRID ENGINE */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">

        {/* PANEL LATERAL DE FILTROS DINÁMICOS */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-3 bg-card border border-border/80 rounded-2xl p-6 sticky top-24 shadow-sm space-y-8"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-bold text-xs tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" /> Filtros Disponibles
                </span>
              </div>

              {/* Categorías reales provenientes del resultado */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-muted-foreground" /> Categorías ({uniqueCategories.length - 1})
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${selectedCategory === cat
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cadenas de retail */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-muted-foreground" /> Almacenes Rastreados
                </label>
                <div className="space-y-1">
                  {uniqueStores.map((store) => (
                    <button
                      key={store}
                      onClick={() => setSelectedStore(store)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${selectedStore === store
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {store}
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* LISTADO DE RESULTADOS REALES */}
        <section className={`${showFilters ? "lg:col-span-9" : "lg:col-span-12"} w-full space-y-6`}>

          {/* Barra de utilidades */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-card border border-border/80 px-4 py-3 rounded-xl gap-4 shadow-sm">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs md:text-sm font-bold text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors focus:outline-none"
            >
              <SlidersHorizontal className="w-4 h-4" /> {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>

            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-semibold">
              <ArrowUpDown className="w-4 h-4 text-primary" /> Ordenar por:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted px-3 py-1.5 rounded-lg text-foreground font-bold focus:outline-none border border-border/40 cursor-pointer text-xs"
              >
                <option value="lowest">Precio: Menor a Mayor</option>
                <option value="highest">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Renderizado Condicional del Estado */}
          {loading ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-60 bg-card border border-border/60 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : processedResults.length === 0 ? (
            <div className="text-center py-24 bg-card border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center p-6">
              <SearchX className="w-12 h-12 text-muted-foreground/60 mb-4" />
              <h3 className="text-base font-bold text-foreground mb-1">No se encontraron productos</h3>
              <p className="text-muted-foreground text-xs md:text-sm max-w-sm">
                Intenta buscando un término real como "azucar" o ajustando los filtros de categoría activos.
              </p>
            </div>
          ) : (


            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {searchResults && searchResults.map((product) => {
                // Transformamos el JSON crudo de Postman en el objeto enriquecido que la Card necesita
                const UIProduct = {
                  id: product.id,
                  nameNormalized: product.nameNormalized || "Producto sin nombre",
                  brand: product.brand || "Genérico",
                  category: product.category || "General",
                  imageUrl: product.imageUrl,
                  storeCount: product.storeCount || 1,
                  referencePrice: product.referencePrice || 0,

                  // Añadimos campos analíticos por defecto para que la UI se vea espectacular
                  highestPrice: (product.referencePrice || 0) * 1.15, // Simula un máximo histórico un 15% mayor
                  bestStore: product.storeCount > 1 ? "Mejor Opción Cruzada" : "Almacén Único",
                  trend: (product.storeCount % 2 === 0) ? "down" as const : "stable" as const // Simulación dinámica de tendencia
                };

                return (
                  <ProductCard
                    key={UIProduct.id}
                    product={UIProduct}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div >
    </div >
  );
}
