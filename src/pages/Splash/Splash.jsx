import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import Button from '../../components/common/Button';
import splashLogo from '../../assets/icons/splash-logo.png';
import './Splash.css';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <main className="splash">
      <div className="splash__logo">
        <img className="splash__cart-icon" src={splashLogo} alt="SmartMart" />
      </div>

      <div className="splash__brand">
        <h1 className="splash__title">SmartMart</h1>
        <p className="splash__tagline">Your Smart Shopping Experience</p>
      </div>

      <div className="splash__cta">
        <Button
          variant="primary"
          onClick={() => navigate('/onboarding')}
          icon={<Icon name="chevronRight" size={18} />}
        >
          Start Shopping
        </Button>
      </div>
    </main>
  );
}
