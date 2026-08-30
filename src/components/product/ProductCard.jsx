import Icon from '../../assets/icons/Icon';
import Button from '../common/Button';
import QuantityStepper from '../common/QuantityStepper';
import { useCart } from '../../hooks/useCart';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { items, addItem, incrementItem, decrementItem, removeItem } = useCart();
  const cartItem = items.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        {product.image ? <img className="product-card__image" src={product.image} alt={product.name} /> : product.emoji}
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <div className="product-card__meta">
        <span className="product-card__price">${product.price.toFixed(2)}</span>
        <span className="product-card__rating">
          <Icon name="star" size={14} strokeWidth={0} fill="currentColor" className="product-card__star" />
          {product.rating}
        </span>
      </div>

      {cartItem ? (
        <div className="product-card__cart-controls">
          <QuantityStepper
            quantity={cartItem.quantity}
            onIncrement={() => incrementItem(product.id)}
            onDecrement={() => decrementItem(product.id)}
          />
          <button
            className="product-card__remove"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name} from cart`}
          >
            <Icon name="trash" size={15} />
          </button>
        </div>
      ) : (
        <Button variant="primary" onClick={() => addItem(product)}>
          Add to Cart
        </Button>
      )}
    </div>
  );
}
