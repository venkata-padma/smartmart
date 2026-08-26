import Icon from '../../assets/icons/Icon';
import './QuantityStepper.css';

export default function QuantityStepper({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="stepper">
      <button className="stepper__btn" onClick={onDecrement} aria-label="Decrease quantity">
        <Icon name="minus" size={16} />
      </button>
      <span className="stepper__value">{quantity}</span>
      <button className="stepper__btn" onClick={onIncrement} aria-label="Increase quantity">
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
