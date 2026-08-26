import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import StatusBadge from '../../components/common/StatusBadge';
import CartItemCard from '../../components/cart/CartItemCard';
import OrderSummary from '../../components/common/OrderSummary';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Icon from '../../assets/icons/Icon';
import { useCart } from '../../hooks/useCart';
import './ShoppingCart.css';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { items, itemCount, summary, incrementItem, decrementItem, removeItem } = useCart();

  const isEmpty = items.length === 0;

  return (
    <>
      <AppHeader
        title="Shopping Cart"
        right={!isEmpty && <StatusBadge tone="accent">{itemCount} items</StatusBadge>}
      />

      {isEmpty ? (
        <PageContainer>
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            subtitle="Add some products to get started"
            action={
              <Button variant="primary" onClick={() => navigate('/home')}>
                Start Shopping
              </Button>
            }
          />
        </PageContainer>
      ) : (
        <PageContainer>
          <div className="shopping-cart__items">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={summary.subtotal}
            tax={summary.tax}
            deliveryFee={summary.deliveryFee}
            total={summary.total}
          />

          <div className="shopping-cart__promo">
            <span className="shopping-cart__promo-icon">
              <Icon name="gift" size={20} />
            </span>
            <span className="shopping-cart__promo-body">
              <span className="shopping-cart__promo-title">Have a promo code?</span>
              <span className="shopping-cart__promo-subtitle">Apply it at checkout</span>
            </span>
            <button className="shopping-cart__promo-apply">Apply</button>
          </div>

          <Button variant="primary" onClick={() => navigate('/checkout/address')}>
            Proceed to Checkout
          </Button>
        </PageContainer>
      )}
    </>
  );
}
