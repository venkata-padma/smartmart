import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import { products } from '../../data/placeholderData';
import { useCart } from '../../hooks/useCart';
import './OrderCard.css';

export default function OrderCard({ order }) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleReorder = () => {
    order.items.forEach((item) => {
      const product = products.find((candidate) => candidate.id === item.id);
      if (product) {
        Array.from({ length: item.quantity }).forEach(() => addItem(product));
      }
    });
    navigate('/cart');
  };

  return (
    <div className="order-card">
      <div className="order-card__header">
        <div>
          <h3 className="order-card__id">Order #{order.id}</h3>
          <p className="order-card__date">
            {order.date} • {order.time}
          </p>
        </div>
        <StatusBadge>{order.status}</StatusBadge>
      </div>

      <ul className="order-card__items">
        {order.items.map((item) => (
          <li key={item.id} className="order-card__item">
            <span className="order-card__item-name">
              <span aria-hidden="true">{item.emoji}</span> {item.name}
              <span className="order-card__item-qty">Qty: {item.quantity}</span>
            </span>
            <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {order.moreItemsCount > 0 && (
        <p className="order-card__more">+{order.moreItemsCount} more items</p>
      )}

      <div className="order-card__divider" />

      <div className="order-card__total">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </div>

      <div className="order-card__actions">
        <Button variant="primary" onClick={() => navigate(`/orders/${order.id}`)}>
          View Details
        </Button>
        <Button variant="secondary" onClick={handleReorder}>Reorder</Button>
      </div>
    </div>
  );
}
