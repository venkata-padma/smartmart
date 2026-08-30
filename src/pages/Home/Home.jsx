import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import IconButton from '../../components/common/IconButton';
import PageContainer from '../../components/layout/PageContainer';
import CategoryCard from '../../components/product/CategoryCard';
import ProductCard from '../../components/product/ProductCard';
import EmptyState from '../../components/common/EmptyState';
import { categories, products } from '../../data/placeholderData';
import { useCart } from '../../hooks/useCart';
import { displayNameFromEmail, getCurrentUser } from '../../utils/auth';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const currentUser = getCurrentUser();
  const firstName = (currentUser?.name || (currentUser?.email ? displayNameFromEmail(currentUser.email) : '')).split(' ')[0];
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = useMemo(() => products.filter((product) => {
    const category = categories.find((candidate) => candidate.id === product.category);
    const matchesQuery = !normalizedQuery || [product.name, product.category, category?.label]
      .some((value) => value?.toLowerCase().includes(normalizedQuery));
    return matchesQuery && (!selectedCategory || product.category === selectedCategory);
  }), [normalizedQuery, selectedCategory]);

  return (
    <PageContainer className="home-page">
      <div className="home__topbar">
        <div>
          <p className="home__welcome">{firstName ? `Welcome back, ${firstName}` : 'Welcome back'}</p>
          <h1 className="home__brand">SmartMart</h1>
        </div>
        <IconButton
          name="person"
          label="Profile"
          className="icon-btn--profile"
          onClick={() => navigate('/profile')}
        />
      </div>

      <div className="home__search">
        <Icon name="search" size={18} />
        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." />
      </div>

      <h2 className="section-title">Categories</h2>
      <div className="home__categories">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)} />
        ))}
      </div>

      <h2 className="section-title">{selectedCategory ? categories.find((category) => category.id === selectedCategory)?.label : normalizedQuery ? 'Search Results' : 'Featured Products'}</h2>
      {visibleProducts.length ? (
        <div className="home__products">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addItem} />
          ))}
        </div>
      ) : (
        <EmptyState icon="search" title="No products found" subtitle="Try another search or category" />
      )}
    </PageContainer>
  );
}
