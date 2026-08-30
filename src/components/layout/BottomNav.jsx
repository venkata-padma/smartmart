import { NavLink } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import { useCart } from '../../hooks/useCart';
import './BottomNav.css';

// Fixed left-to-right order — Home stays left, Cart stays right, always.
// Tabs never swap position; only the active tab's own icon pops in place.
const navItems = [
  { to: '/home', icon: 'home', label: 'Home' },
  { to: '/scan', icon: 'scan', label: 'Scan' },
  { to: '/cart', icon: 'cart', label: 'Cart' },
];

export default function BottomNav() {
  const { itemCount } = useCart();

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__lift">
            <span className="bottom-nav__icon-wrap">
              <Icon name={icon} size={22} />
              {label === 'Cart' && itemCount > 0 && <span className="bottom-nav__badge">{itemCount}</span>}
            </span>
            <span className="bottom-nav__label">{label}</span>
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
