import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/icons/Icon';
import Button from '../../components/common/Button';
import { setAuthenticated } from '../../utils/auth';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthenticated(true);
    navigate('/home');
  };

  return (
    <main className="page page--no-nav login">
      <div className="login__icon">
        <Icon name="cart" size={64} strokeWidth={1.2} />
        <span className="login__icon-badge">
          <Icon name="check" size={16} strokeWidth={2.4} />
        </span>
      </div>

      <h1 className="login__title">Welcome Back</h1>
      <p className="login__subtitle">Sign in to continue shopping</p>

      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__field">
          <span>Email</span>
          <input type="email" placeholder="Enter your email" required />
        </label>

        <label className="login__field">
          <span>Password</span>
          <input type="password" placeholder="Enter your password" required />
        </label>

        <button type="button" className="login__forgot">
          Forgot Password?
        </button>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </form>

      <div className="login__divider">
        <span>Or continue with</span>
      </div>

      <div className="login__social">
        <button className="login__social-btn">
          <span className="login__social-icon login__social-icon--google">G</span>
          Google
        </button>
        <button className="login__social-btn">
          <span className="login__social-icon login__social-icon--facebook">f</span>
          Facebook
        </button>
      </div>

      <p className="login__signup">
        Don&apos;t have an account? <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
      </p>
    </main>
  );
}
