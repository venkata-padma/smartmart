import Icon from '../../assets/icons/Icon';
import './PaymentMethodCard.css';

export default function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <button
      className={`payment-card ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(method.id)}
    >
      <span className={`payment-card__radio ${selected ? 'is-selected' : ''}`} />
      <span className="payment-card__icon">
        <Icon name={method.icon === 'paypal' ? 'card' : method.icon} size={20} />
      </span>
      <span className="payment-card__body">
        <span className="payment-card__label">{method.label}</span>
        <span className="payment-card__subtitle">{method.subtitle}</span>
      </span>
    </button>
  );
}
