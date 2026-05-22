import { ShoppingCart, Clock } from "lucide-react";
import { useState } from "react";

interface StoreProductCardProps {
  product: {
    productId: string;
    productName: string;
    brand: string;
    imageUrl: string;
  };
  store: {
    name: string;
    price: number;
    lastUpdated?: string;
    isBestPrice?: boolean;
  };
  onAddToCart: (store: string, price: number, quantity: number) => void;
}

export function StoreProductCard({
  product,
  store,
  onAddToCart,
}: StoreProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const getStoreInitials = (storeName: string) => {
    return storeName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStoreColor = (storeName: string) => {
    const colors: Record<string, string> = {
      alkosto: "bg-blue-500",
      éxito: "bg-yellow-500",
      falabella: "bg-red-500",
      olímpica: "bg-pink-500",
      "mercado libre": "bg-purple-500",
    };
    return colors[storeName.toLowerCase()] || "bg-gray-500";
  };

  const handleAddToCart = () => {
    onAddToCart(store.name, store.price, quantity);
    setQuantity(1);
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "Recientemente";
    return timeStr;
  };

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 hover:border-primary/40 transition-all shadow-sm hover:shadow-md">
      <div className="flex items-start gap-4 mb-4">
        {/* Store Badge */}
        <div
          className={`w-14 h-14 rounded-lg ${getStoreColor(store.name)} flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {getStoreInitials(store.name)}
        </div>

        {/* Store Info */}
        <div className="flex-1">
          <h3 className="font-bold text-base text-foreground">{store.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3" />
            <span>{formatTime(store.lastUpdated)}</span>
          </div>
        </div>

        {/* Best Price Badge */}
        {store.isBestPrice && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-200/50">
            ¡la mejor oferta!
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="bg-muted/40 rounded-xl p-3 mb-4 space-y-1.5 text-xs border border-border/40">
        <div className="flex justify-between items-start">
          <span className="text-muted-foreground">Producto:</span>
          <span className="font-semibold text-foreground text-right line-clamp-1">
            {product.productName}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-muted-foreground">Marca:</span>
          <span className="font-semibold text-foreground">{product.brand}</span>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Precio
          </div>
          <div className="text-2xl font-extrabold text-foreground tracking-tight">
            ${store.price.toLocaleString("es-CO")}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border/60 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              −
            </button>
            <span className="px-2 text-xs font-semibold text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
