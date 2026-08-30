export const categories = [
  { id: 'fruits', label: 'Fruits', icon: '🍎', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=240&q=80' },
  { id: 'vegetables', label: 'Vegetables', icon: '🥦', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=240&q=80' },
  { id: 'dairy', label: 'Dairy', icon: '🥛', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=240&q=80' },
  { id: 'bakery', label: 'Bakery', icon: '🍞', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=240&q=80' },
];

export const products = [
  { id: 'p1', name: 'Fresh Apples', price: 2.99, rating: 4.5, emoji: '🍎', category: 'fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=85' },
  { id: 'p2', name: 'Organic Milk', price: 4.49, rating: 4.8, emoji: '🥛', category: 'dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=85' },
  { id: 'p3', name: 'Whole Wheat Bread', price: 3.29, rating: 4.6, emoji: '🍞', category: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=85' },
  { id: 'p4', name: 'Greek Yogurt', price: 5.99, rating: 4.7, emoji: '🥣', category: 'dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=85' },
  { id: 'p5', name: 'Garden Tomatoes', price: 3.49, rating: 4.8, emoji: '🍅', category: 'vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=85' },
  { id: 'p6', name: 'Crisp Broccoli', price: 2.79, rating: 4.7, emoji: '🥦', category: 'vegetables', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=85' },
  { id: 'p7', name: 'Baby Spinach', price: 3.99, rating: 4.6, emoji: '🥬', category: 'vegetables', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=85' },
  { id: 'p8', name: 'Crunchy Carrots', price: 2.49, rating: 4.5, emoji: '🥕', category: 'vegetables', image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=500&q=85' },
];

export const scannedProduct = {
  id: 'p1',
  name: 'Fresh Organic Apples',
  price: 2.99,
  rating: 4.5,
  emoji: '🍎',
  image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=85',
  tags: ['Organic', 'Fresh', 'Premium Quality'],
};

export const addresses = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    line1: '123 Main Street, Apt 4B',
    line2: 'New York, NY 10001',
  },
  {
    id: 'office',
    label: 'Office',
    icon: 'briefcase',
    line1: '456 Business Ave, Suite 200',
    line2: 'New York, NY 10022',
  },
];

export const paymentMethods = [
  { id: 'credit_card', label: 'Credit Card', subtitle: '•••• 4242', icon: 'card' },
  { id: 'paypal', label: 'PayPal', subtitle: 'user@email.com', icon: 'paypal' },
  { id: 'cod', label: 'Cash on Delivery', subtitle: 'Pay when you receive', icon: 'cash' },
];

export const TAX_RATE = 0.08;

export function calcSummary(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = 0;
  const total = subtotal + tax + deliveryFee;
  return { subtotal, tax, deliveryFee, total };
}
