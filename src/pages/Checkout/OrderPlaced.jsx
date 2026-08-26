import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import { useCart } from '../../hooks/useCart';
import './OrderPlaced.css';

export default function OrderPlaced() {
  const navigate = useNavigate();
  const { lastOrderId } = useCart();

  return (
    <PageContainer withNav={false}>
      <div className="order-placed">
        <div className="order-placed__check">
          <Icon name="check" size={40} strokeWidth={2.6} />
        </div>

        <h1 className="order-placed__title">Order Placed!</h1>
        <p className="order-placed__subtitle">Your order has been confirmed</p>
        <p className="order-placed__id">Order #{lastOrderId || 'SM000000'}</p>

        <div className="order-placed__info">
          <Icon name="info" size={22} className="order-placed__info-icon" />
          <div>
            <h3>Delivery Information</h3>
            <p>Your order will be delivered to your selected address within 30-45 minutes.</p>
          </div>
        </div>

        <div className="order-placed__actions">
          <Button variant="primary" onClick={() => navigate('/home')}>
            Continue Shopping
          </Button>
          <Button variant="secondary" onClick={() => navigate('/orders')}>
            View Order History
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
