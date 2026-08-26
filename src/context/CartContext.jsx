import { createContext, useCallback, useMemo, useState } from 'react';
import { calcSummary } from '../data/placeholderData';
import { addresses as initialAddresses } from '../data/placeholderData';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('home');
  const [selectedPaymentId, setSelectedPaymentId] = useState('cod');
  const [lastOrderId, setLastOrderId] = useState(null);
  const [addresses, setAddresses] = useState(initialAddresses);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const incrementItem = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  const decrementItem = useCallback((id) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const addAddress = useCallback((address) => {
    setAddresses((current) => [...current, address]);
    setSelectedAddressId(address.id);
  }, []);

  const placeOrder = useCallback(() => {
    const newOrderId = `SM${Math.floor(100000 + Math.random() * 899999)}`;
    setLastOrderId(newOrderId);
    clearCart();
    return newOrderId;
  }, [clearCart]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const summary = useMemo(() => calcSummary(items), [items]);

  const value = {
    items,
    itemCount,
    summary,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    selectedAddressId,
    setSelectedAddressId,
    selectedPaymentId,
    setSelectedPaymentId,
    placeOrder,
    lastOrderId,
    addresses,
    addAddress,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
