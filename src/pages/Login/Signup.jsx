import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Icon from '../../assets/icons/Icon';
import { setAuthenticated, setCurrentUser } from '../../utils/auth';
import { useCart } from '../../hooks/useCart';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const { switchUser } = useCart();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setCurrentUser({ name: form.name, email: form.email });
    setAuthenticated(true);
    switchUser(form.email);
    navigate('/home');
  };

  return (
    <main className="page page--no-nav signup">
      <button className="signup__back" type="button" onClick={() => navigate('/login')}>
        <Icon name="back" size={20} /> Back to sign in
      </button>
      <div className="signup__mark"><Icon name="person" size={30} /></div>
      <h1 className="signup__title">Create Account</h1>
      <p className="signup__subtitle">Join SmartMart and start shopping smarter</p>
      <form className="signup__form" onSubmit={handleSubmit}>
        <label className="signup__field"><span>Full name</span><input name="name" value={form.name} onChange={update} placeholder="Enter your name" autoComplete="name" required /></label>
        <label className="signup__field"><span>Email</span><input name="email" type="email" value={form.email} onChange={update} placeholder="Enter your email" autoComplete="email" required /></label>
        <label className="signup__field"><span>Password</span><input name="password" type="password" value={form.password} onChange={update} placeholder="Create a password" autoComplete="new-password" minLength="8" required /></label>
        <label className="signup__field"><span>Confirm password</span><input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} placeholder="Repeat your password" autoComplete="new-password" minLength="8" required /></label>
        {error && <p className="signup__error" role="alert">{error}</p>}
        <Button type="submit" variant="primary">Create Account</Button>
      </form>
      <p className="signup__signin">Already have an account? <button type="button" onClick={() => navigate('/login')}>Sign In</button></p>
    </main>
  );
}
