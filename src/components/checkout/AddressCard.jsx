import Icon from '../../assets/icons/Icon';
import './AddressCard.css';

export default function AddressCard({ address, selected, onSelect }) {
  return (
    <button
      className={`address-card ${selected ? 'is-selected' : ''}`}
      onClick={() => onSelect(address.id)}
    >
      <span className={`address-card__icon ${selected ? 'is-selected' : ''}`}>
        <Icon name={address.icon} size={22} />
      </span>
      <span className="address-card__body">
        <span className="address-card__label">{address.label}</span>
        <span className="address-card__line">{address.line1}</span>
        <span className="address-card__line">{address.line2}</span>
      </span>
      <span className={`address-card__radio ${selected ? 'is-selected' : ''}`} />
    </button>
  );
}
