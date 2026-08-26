import './CategoryCard.css';

export default function CategoryCard({ category, onClick }) {
  return (
    <button className="category-card" onClick={() => onClick?.(category)}>
      <span className="category-card__image-wrap">
        {category.image ? <img className="category-card__image" src={category.image} alt="" /> : category.icon}
      </span>
      <span className="category-card__label">{category.label}</span>
    </button>
  );
}
