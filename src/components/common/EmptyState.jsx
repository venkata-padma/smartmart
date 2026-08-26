import Icon from '../../assets/icons/Icon';
import './EmptyState.css';

export default function EmptyState({ icon = 'cart', title, subtitle, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon-ring">
        <Icon name={icon} size={44} strokeWidth={1.4} />
      </div>
      <h2 className="empty-state__title">{title}</h2>
      {subtitle && <p className="empty-state__subtitle">{subtitle}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
