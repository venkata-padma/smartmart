import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import StatusBadge from '../../components/common/StatusBadge';
import OrderSummary from '../../components/common/OrderSummary';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../assets/icons/Icon';
import { products } from '../../data/placeholderData';
import './OrderDetails.css';
import { useCart } from '../../hooks/useCart';

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, addItem } = useCart();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <>
        <AppHeader title="Order Details" />
        <PageContainer withNav={false}>
          <EmptyState icon="bag" title="Order not found" subtitle="This order doesn't exist in your history" />
        </PageContainer>
      </>
    );
  }

  const handleOrderAgain = () => {
    order.items.forEach((item) => {
      const product = products.find((candidate) => candidate.id === item.id);
      if (product) Array.from({ length: item.quantity }).forEach(() => addItem(product));
    });
    navigate('/cart');
  };

  return (
    <>
      <AppHeader title="Order Details" />
      <PageContainer withNav={false}>
        <div className="order-details__card">
          <div className="order-details__header">
            <div>
              <p className="order-details__label">Order ID</p>
              <h2 className="order-details__id">#{order.id}</h2>
            </div>
            <StatusBadge>{order.status}</StatusBadge>
          </div>

          <div className="order-details__meta">
            <p>
              <Icon name="calendar" size={16} /> Ordered on {order.orderedAt}
            </p>
            <p>
              <Icon name="check" size={16} /> Delivered on {order.deliveredAt}
            </p>
          </div>
        </div>

        <div className="order-details__card">
          <h3 className="order-details__items-title">
            <Icon name="bag" size={18} /> Items ({order.items.length})
          </h3>
          <ul className="order-details__items">
            {order.items.map((item, i) => (
              <li key={item.id} className={i > 0 ? 'has-divider' : ''}>
                <div className="order-details__item-emoji">{item.emoji}</div>
                <div className="order-details__item-body">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="order-details__item-unit">${item.unitPrice.toFixed(2)} each</p>
                </div>
                <span className="order-details__item-total">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <OrderSummary
          title="Payment Summary"
          subtotal={order.subtotal}
          tax={order.tax}
          deliveryFee={order.deliveryFee}
          total={order.total}
          taxRateLabel="Tax (8%)"
          showTotal={false}
        />
        <p className="order-details__total-paid">
          <span>Total Paid</span>
          <span>${order.total.toFixed(2)}</span>
        </p>

        <Button variant="primary" onClick={handleOrderAgain}>
          Order Again
        </Button>
      </PageContainer>
    </>
  );
}
