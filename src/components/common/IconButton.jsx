import Icon from '../../assets/icons/Icon';
import './IconButton.css';

export default function IconButton({ name, onClick, label, size = 44, className = '', ...rest }) {
  return (
    <button
      className={`icon-btn ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={label || name}
      {...rest}
    >
      <Icon name={name} size={size * 0.45} />
    </button>
  );
}
