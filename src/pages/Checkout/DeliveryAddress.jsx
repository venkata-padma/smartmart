import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import AddressCard from '../../components/checkout/AddressCard';
import Button from '../../components/common/Button';
import { useCart } from '../../hooks/useCart';
import './DeliveryAddress.css';

export default function DeliveryAddress() {
  const navigate = useNavigate();
  const { summary, selectedAddressId, setSelectedAddressId, addresses } = useCart();

  return (
    <>
      <AppHeader title="Delivery Address" steps={2} activeStep={0} />
      <PageContainer withNav={false}>
        <div className="delivery-address__intro">
          <div className="delivery-address__pin">
            <Icon name="location" size={40} strokeWidth={1.4} />
          </div>
          <h2 className="delivery-address__title">Select Delivery Address</h2>
          <p className="delivery-address__subtitle">Choose where you want your order delivered</p>
        </div>

        <div className="delivery-address__list">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={selectedAddressId === address.id}
              onSelect={setSelectedAddressId}
            />
          ))}

          <button className="delivery-address__add" onClick={() => navigate('/checkout/address/new')}>
            <Icon name="plus" size={18} />
            Add New Address
          </button>
        </div>

        <div className="delivery-address__footer">
          <div className="delivery-address__total">
            <span>Total Amount</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
          <Button variant="primary" onClick={() => navigate('/checkout/payment')}>
            Continue to Payment
          </Button>
        </div>
      </PageContainer>
    </>
  );
}
