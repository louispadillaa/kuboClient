import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  store: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brand: string;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((item: Omit<CartItem, "id">) => {
    setItems((prevItems) => {
      // Si el producto del mismo store ya existe, incrementa cantidad
      const existingIndex = prevItems.findIndex(
        (i) => i.productId === item.productId && i.store === item.store
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }

      // Si no existe, lo añade
      return [
        ...prevItems,
        {
          ...item,
          id: `${item.productId}-${item.store}-${Date.now()}`,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, [removeFromCart]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
    itemCount: items.length,
  };
}
