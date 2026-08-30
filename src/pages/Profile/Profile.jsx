import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import IconButton from '../../components/common/IconButton';
import Icon from '../../assets/icons/Icon';
import Button from '../../components/common/Button';
import { displayNameFromEmail, getCurrentUser, setAuthenticated } from '../../utils/auth';
import { useCart } from '../../hooks/useCart';
import './Profile.css';

const menuItems = [
  { icon: 'card', title: 'Payment Methods', subtitle: 'Manage cards', route: '/checkout/payment' },
  { icon: 'location', title: 'Addresses', subtitle: 'Delivery locations', route: '/checkout/address' },
  { icon: 'settings', title: 'Settings', subtitle: 'App preferences', route: '/profile/settings' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { orders, switchUser } = useCart();
  const currentUser = getCurrentUser();
  const displayName = currentUser?.name || (currentUser?.email ? displayNameFromEmail(currentUser.email) : 'Guest');
  const email = currentUser?.email || 'Not signed in';

  return (
    <>
      <AppHeader title="Profile" right={<IconButton name="edit" label="Edit profile" onClick={() => navigate('/profile/edit')} />} />
      <PageContainer withNav={false}>
        <div className="profile__card">
          <div className="profile__avatar">
            <Icon name="person" size={36} />
          </div>
          <h2 className="profile__name">{displayName}</h2>
          <p className="profile__email">{email}</p>
          <span className="profile__membership">SmartMart Member</span>
        </div>

        <div className="profile__stats">
          <div className="profile__stat">
            <span className="profile__stat-value">{orders.length}</span>
            <button className="profile__stat-label" onClick={() => navigate('/orders')}>Orders</button>
          </div>
          <div className="profile__stat">
            <span className="profile__stat-value">0</span>
            <span className="profile__stat-label">Favorites</span>
          </div>
          <div className="profile__stat">
            <span className="profile__stat-value">0</span>
            <span className="profile__stat-label">Reviews</span>
          </div>
        </div>

        <div className="profile__menu">
          {menuItems.map((item) => (
            <button key={item.title} className="profile__menu-item" onClick={() => navigate(item.route)}>
              <span className="profile__menu-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="profile__menu-body">
                <span className="profile__menu-title">{item.title}</span>
                <span className="profile__menu-subtitle">{item.subtitle}</span>
              </span>
              <Icon name="chevronRight" size={18} />
            </button>
          ))}
        </div>

        <Button
          variant="danger"
          icon={<Icon name="logout" size={18} />}
          onClick={() => {
            setAuthenticated(false);
            switchUser(null);
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </PageContainer>
    </>
  );
}
