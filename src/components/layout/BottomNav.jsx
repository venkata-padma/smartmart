import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import { useCart } from '../../hooks/useCart';
import './BottomNav.css';

const navItems = [
  { to: '/scan', icon: 'scan', label: 'Scan', key: 'scan' },
  { to: '/home', icon: 'home', label: 'Home', key: 'home' },
  { to: '/cart', icon: 'cart', label: 'Cart', key: 'cart' },
];

const CENTER_SLOT = 1;

export default function BottomNav() {
  const { itemCount } = useCart();
  const location = useLocation();
  const activeKey = navItems.find((item) => location.pathname.startsWith(item.to))?.key;

  // order[slot] = which tab currently sits in that visual slot (0 = left, 1 = center, 2 = right).
  // Clicking a tab swaps it with whatever is in the center slot only — the third,
  // uninvolved tab keeps its slot and never moves.
  const [order, setOrder] = useState(navItems.map((item) => item.key));

  useEffect(() => {
    if (!activeKey) return;
    setOrder((prev) => {
      if (prev[CENTER_SLOT] === activeKey) return prev;
      const activeSlot = prev.indexOf(activeKey);
      if (activeSlot === -1) return prev;
      const next = [...prev];
      [next[CENTER_SLOT], next[activeSlot]] = [next[activeSlot], next[CENTER_SLOT]];
      return next;
    });
  }, [activeKey]);

  return (
    <nav className="bottom-nav">
      {navItems.map((item, domIndex) => {
        const slot = order.indexOf(item.key);
        const isActive = item.key === activeKey;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`bottom-nav__item ${isActive ? 'is-active' : ''}`}
            style={{ '--shift': slot - domIndex }}
          >
            <span className="bottom-nav__icon-wrap">
              <Icon name={item.icon} size={22} />
              {item.label === 'Cart' && itemCount > 0 && <span className="bottom-nav__badge">{itemCount}</span>}
            </span>
            <span className="bottom-nav__label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
