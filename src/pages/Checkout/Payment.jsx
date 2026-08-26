import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import PaymentMethodCard from '../../components/checkout/PaymentMethodCard';
import OrderSummary from '../../components/common/OrderSummary';
import Button from '../../components/common/Button';
import { paymentMethods } from '../../data/placeholderData';
import { useCart } from '../../hooks/useCart';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { itemCount, summary, selectedPaymentId, setSelectedPaymentId, placeOrder } = useCart();

  const handlePlaceOrder = () => {
    placeOrder();
    navigate('/checkout/success');
  };

  return (
    <>
      <AppHeader title="Payment" steps={2} activeStep={1} />
      <PageContainer withNav={false}>
        <div className="payment__section-heading">
          <Icon name="card" size={20} />
          <h2>Select Payment Method</h2>
        </div>

        <div className="payment__list">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={selectedPaymentId === method.id}
              onSelect={setSelectedPaymentId}
            />
          ))}
        </div>

        <div className="payment__summary">
          <OrderSummary
            subtotal={summary.subtotal}
            tax={summary.tax}
            deliveryFee={summary.deliveryFee}
            total={summary.total}
            subtotalLabel={`Subtotal (${itemCount} items)`}
          />
        </div>

        <Button variant="primary" onClick={handlePlaceOrder}>
          Place Order • ${summary.total.toFixed(2)}
        </Button>
      </PageContainer>
    </>
  );
}
