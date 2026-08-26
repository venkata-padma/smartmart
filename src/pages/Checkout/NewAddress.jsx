import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Icon from '../../assets/icons/Icon';
import { useCart } from '../../hooks/useCart';
import './NewAddress.css';

export default function NewAddress() {
  const navigate = useNavigate();
  const { addAddress } = useCart();
  const [form, setForm] = useState({ label: 'Home', line1: '', city: '', state: '', zip: '', phone: '' });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    addAddress({
      id: `address-${Date.now()}`,
      label: form.label,
      line1: form.line1,
      line2: `${form.city}, ${form.state} ${form.zip}`,
      icon: form.label.toLowerCase() === 'office' ? 'briefcase' : 'home',
    });
    navigate('/checkout/address');
  };

  return (
    <>
      <AppHeader title="New Address" />
      <PageContainer withNav={false}>
        <form className="new-address" onSubmit={handleSubmit}>
          <div className="new-address__hero"><Icon name="location" size={30} /></div>
          <label>Address label<select name="label" value={form.label} onChange={update} required><option>Home</option><option>Office</option><option>Other</option></select></label>
          <label>Street address<input name="line1" value={form.line1} onChange={update} placeholder="123 Main Street, Apt 4B" required /></label>
          <div className="new-address__row">
            <label>City<input name="city" value={form.city} onChange={update} placeholder="New York" required /></label>
            <label>State<input name="state" value={form.state} onChange={update} placeholder="NY" required /></label>
          </div>
          <div className="new-address__row">
            <label>ZIP code<input name="zip" value={form.zip} onChange={update} inputMode="numeric" placeholder="10001" required /></label>
            <label>Phone number<input name="phone" value={form.phone} onChange={update} type="tel" placeholder="(555) 123-4567" required /></label>
          </div>
          <Button variant="primary" type="submit">Save Address</Button>
        </form>
      </PageContainer>
    </>
  );
}
