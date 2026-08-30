import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import IconButton from '../../components/common/IconButton';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/common/EmptyState';
import { useCart } from '../../hooks/useCart';
import './OrderHistory.css';

export default function OrderHistory() {
  const navigate = useNavigate();
  const { orders } = useCart();

  return (
    <>
      <AppHeader
        title="Order History"
        right={(
          <IconButton
            name="person"
            label="Profile"
            className="icon-btn--profile"
            onClick={() => navigate('/profile')}
          />
        )}
      />
      <PageContainer withNav={false}>
        {orders.length === 0 ? (
          <EmptyState icon="bag" title="No orders yet" subtitle="Your past orders will show up here" />
        ) : (
          <div className="order-history__list">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
}
