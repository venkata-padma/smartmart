import Icon from '../../assets/icons/Icon';
import QuantityStepper from '../common/QuantityStepper';
import './CartItemCard.css';

export default function CartItemCard({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item__emoji" aria-hidden="true">
        {item.image ? <img src={item.image} alt="" /> : item.emoji}
      </div>
      <div className="cart-item__body">
        <h3 className="cart-item__name">{item.name}</h3>
        <span className="cart-item__price">${item.price.toFixed(2)}</span>
      </div>
      <QuantityStepper
        quantity={item.quantity}
        onIncrement={() => onIncrement(item.id)}
        onDecrement={() => onDecrement(item.id)}
      />
      <button
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name}`}
      >
        <Icon name="trash" size={18} />
      </button>
    </div>
  );
}
