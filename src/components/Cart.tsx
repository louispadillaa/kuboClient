import { Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "../../config/useApi";
import type { CartItem } from "../../hooks/useCart";

interface CartProps {
  items: CartItem[];
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onClear: () => void;
  getTotalPrice: () => number;
  userId?: string;
  userPlan?: string;
}

interface StartPurchaseRequest {
  items: Array<{
    productId: string;
    store: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

interface PurchaseInitiated {
  purchaseId: string;
  status: string;
  createdAt: string;
  items: Array<{
    productId: string;
    store: string;
    quantity: number;
  }>;
  totalAmount: number;
  estimatedDelivery?: string;
}

export function Cart({
  items,
  onRemove,
  onUpdateQuantity,
  onClear,
  getTotalPrice,
  userId,
  userPlan,
}: CartProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<PurchaseInitiated | null>(null);

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const request: StartPurchaseRequest = {
        items: items.map((item) => ({
          productId: item.productId,
          store: item.store,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPrice,
      };

      const headers: Record<string, string> = {};
      if (userId) {
        headers["X-User-Id"] = userId;
      }
      if (userPlan) {
        headers["X-User-Plan"] = userPlan;
      }

      const response = await apiFetch<PurchaseInitiated>(
        "/purchase/start",
        {
          method: "POST",
          body: JSON.stringify(request),
          headers,
        }
      );

      setSuccess(response);
      onClear();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`No se pudo procesar la compra: ${message}`);
      console.error("Error en checkout:", message);
    } finally {
      setLoading(false);
    }
  };

  // Estado de éxito
  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-lg font-bold text-emerald-900 mb-2">
          ¡Compra Exitosa!
        </h3>
        <p className="text-sm text-emerald-700 mb-4">
          ID de compra: <span className="font-mono font-bold">{success.purchaseId}</span>
        </p>
        <p className="text-xs text-emerald-600 mb-6">
          Total pagado: ${success.totalAmount.toLocaleString("es-CO")}
        </p>
        {success.estimatedDelivery && (
          <p className="text-xs text-emerald-600 mb-6">
            Entrega estimada: {success.estimatedDelivery}
          </p>
        )}
        <button
          onClick={() => setSuccess(null)}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-all"
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <div className="bg-muted/40 border border-dashed border-border/80 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground/60 mb-4" />
        <h3 className="font-bold text-foreground mb-1">Carrito vacío</h3>
        <p className="text-sm text-muted-foreground">
          Añade productos de diferentes stores para empezar
        </p>
      </div>
    );
  }

  // Carrito con items
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Resumen del Carrito ({items.length} items)
        </h2>
      </div>

      {/* Items List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-muted/40 rounded-lg border border-border/40 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-12 h-12 rounded-lg object-cover bg-background"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground line-clamp-1">
                  {item.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.store} • ${item.price.toLocaleString("es-CO")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-border/60 rounded-lg">
                <button
                  onClick={() =>
                    onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="px-1.5 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  −
                </button>
                <span className="px-2 text-xs font-semibold text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-1.5 py-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-right min-w-20">
                <p className="font-bold text-sm text-foreground">
                  ${(item.price * item.quantity).toLocaleString("es-CO")}
                </p>
              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="p-1.5 text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Eliminar del carrito"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-200 text-red-600 rounded-lg p-3 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Total and CTA */}
      <div className="border-t border-border/60 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-semibold">
            Total:
          </span>
          <span className="text-2xl font-extrabold text-foreground">
            ${totalPrice.toLocaleString("es-CO")}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 bg-muted text-foreground px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-muted/80 transition-all"
          >
            Limpiar
          </button>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Comprar Ahora
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
