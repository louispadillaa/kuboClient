// src/components/dashboard/ProductCard.tsx
import { motion } from 'framer-motion';
import { ExternalLink, TrendingDown, TrendingUp, Minus, Bell } from "lucide-react";

interface ProductProps {
  product: {
    id: string;
    nameNormalized: string; // Adaptado a tu JSON real
    brand: string | null;
    category: string | null;
    imageUrl: string;      // Reemplazado por tu URL de imagen real
    storeCount: number;    // Adaptado a tu JSON real
    referencePrice: number; // Tu precio base real
    highestPrice: number;
    trend: "down" | "up" | "stable";
    bestStore: string;
  };
}

export function ProductCard({ product }: ProductProps) {
  // Manejo defensivo por si la categoría o tendencia vienen nulos desde el backend
  const productCategory = product.category || "General";
  const productTrend = product.trend || "stable";

  const trendConfig = {
    down: { label: "A la baja", styles: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
    up: { label: "Al alza", styles: "bg-red-500/10 text-red-600 border-red-200" },
    stable: { label: "Estable", styles: "bg-blue-500/10 text-blue-600 border-blue-200" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group relative overflow-hidden"
    >
      <div>
        {/* Header de la Tarjeta */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-2.5 py-1 rounded-md">
            {productCategory}
          </span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${trendConfig[productTrend].styles}`}>
            {productTrend === "down" && <TrendingDown className="w-3 h-3 inline mr-1" />}
            {productTrend === "up" && <TrendingUp className="w-3 h-3 inline mr-1" />}
            {productTrend === "stable" && <Minus className="w-3 h-3 inline mr-1" />}
            {trendConfig[productTrend].label}
          </span>
        </div>

        {/* Info Principal */}
        <div className="flex gap-4 items-start mb-6">
          <div className="w-16 h-16 rounded-xl bg-background border border-border/60 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-sm">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.nameNormalized}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
              />
            ) : (
              <span className="text-2xl">📦</span>
            )}
          </div>
          <div className="space-y-0.5">
            {/* Imprime la marca real traída desde FastAPI/Spring */}
            <span className="text-[10px] font-bold text-primary tracking-wide uppercase">
              {product.brand}
            </span>
            <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight capitalize">
              {product.nameNormalized}
            </h3>
            <p className="text-xs text-muted-foreground">
              Disponible en <span className="font-semibold text-foreground">{product.storeCount} canales</span>
            </p>
          </div>
        </div>

        {/* Mapeo del Market Share de Precios */}
        <div className="bg-muted/40 rounded-xl p-3 mb-6 space-y-2 text-xs border border-border/40">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mejor opción:</span>
            <span className="font-bold text-foreground">{product.bestStore}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Precio Máximo histórico:</span>
            <span className="font-medium text-muted-foreground line-through">${product.highestPrice.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>

      {/* Footer de Costos y Acciones */}
      <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mejor Precio</div>
          <div className="text-xl font-extrabold text-foreground tracking-tight">
            ${product.referencePrice.toLocaleString("es-CO")}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            title="Monitorear precio"
            className="p-2.5 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors border border-transparent hover:border-primary/20"
          >
            <Bell className="w-4 h-4" />
          </button>
          <a
            href={`/product/${product.id}`}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
          >
            Analizar <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}