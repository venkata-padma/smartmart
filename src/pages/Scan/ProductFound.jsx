import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import { scannedProduct } from '../../data/placeholderData';
import { useCart } from '../../hooks/useCart';
import './ProductFound.css';

export default function ProductFound() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: scannedProduct.id,
      name: scannedProduct.name,
      price: scannedProduct.price,
      emoji: scannedProduct.emoji,
      image: scannedProduct.image,
    });
    navigate('/cart');
  };

  return (
    <>
      <AppHeader title="Product Found" />
      <PageContainer>
        <div className="product-found">
          <div className="product-found__check">
            <Icon name="check" size={36} strokeWidth={2.4} />
          </div>
          <h2 className="product-found__heading">Product Found!</h2>

          <div className="product-found__card">
            <div className="product-found__emoji">
              <img src={scannedProduct.image} alt={scannedProduct.name} />
            </div>
            <h3 className="product-found__name">{scannedProduct.name}</h3>
            <p className="product-found__price">${scannedProduct.price.toFixed(2)}</p>
            <p className="product-found__rating">
              <Icon name="star" size={16} fill="currentColor" strokeWidth={0} />
              {scannedProduct.rating}
            </p>
            <p className="product-found__tags">{scannedProduct.tags.join(' • ')}</p>
          </div>

          <Button variant="primary" onClick={handleAdd}>
            Add to Cart
          </Button>
          <Button variant="secondary" onClick={() => navigate('/scan')}>
            Scan Another Product
          </Button>
        </div>
      </PageContainer>
    </>
  );
}
