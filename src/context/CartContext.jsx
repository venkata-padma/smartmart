import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { calcSummary } from '../data/placeholderData';
import { addresses as initialAddresses } from '../data/placeholderData';
import { getCurrentUser } from '../utils/auth';

export const CartContext = createContext(null);

// Cart contents and order history are namespaced per signed-in email, so
// switching accounts (log out, log back in as someone else) never shows one
// person's cart or past orders to another. A guest bucket covers the brief
// window before any account is known.
const GUEST_NAMESPACE = '__guest__';
const cartKey = (email) => `smartmart_cart_${email || GUEST_NAMESPACE}`;
const ordersKey = (email) => `smartmart_orders_${email || GUEST_NAMESPACE}`;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full/unavailable — cart still works for the session, just won't persist.
  }
}

function buildOrderRecord(items, summary) {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return {
    id: `SM${Math.floor(100000 + Math.random() * 899999)}`,
    status: 'Delivered',
    orderedAt: `${date} at ${time}`,
    deliveredAt: `${date} at ${time}`,
    date,
    time,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      quantity: item.quantity,
      unitPrice: item.price,
    })),
    moreItemsCount: 0,
    subtotal: summary.subtotal,
    tax: summary.tax,
    deliveryFee: summary.deliveryFee,
    total: summary.total,
  };
}

export function CartProvider({ children }) {
  const [currentEmail, setCurrentEmail] = useState(() => getCurrentUser()?.email || null);
  const [items, setItems] = useState(() => loadJSON(cartKey(currentEmail), []));
  const [orders, setOrders] = useState(() => loadJSON(ordersKey(currentEmail), []));
  const [selectedAddressId, setSelectedAddressId] = useState('home');
  const [selectedPaymentId, setSelectedPaymentId] = useState('cod');
  const [lastOrderId, setLastOrderId] = useState(null);
  const [addresses, setAddresses] = useState(initialAddresses);

  useEffect(() => saveJSON(cartKey(currentEmail), items), [items, currentEmail]);
  useEffect(() => saveJSON(ordersKey(currentEmail), orders), [orders, currentEmail]);

  // Called right after a successful login/signup (with the account's email)
  // or on logout (with null) so the cart/orders in view always belong to
  // whoever is actually signed in right now.
  const switchUser = useCallback((email) => {
    setCurrentEmail(email);
    setItems(loadJSON(cartKey(email), []));
    setOrders(loadJSON(ordersKey(email), []));
    setSelectedAddressId('home');
    setSelectedPaymentId('cod');
    setLastOrderId(null);
  }, []);

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

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const summary = useMemo(() => calcSummary(items), [items]);

  const placeOrder = useCallback(() => {
    if (items.length === 0) return null;
    const order = buildOrderRecord(items, summary);
    setOrders((prev) => [order, ...prev]);
    setLastOrderId(order.id);
    clearCart();
    return order.id;
  }, [items, summary, clearCart]);

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
    orders,
    switchUser,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
