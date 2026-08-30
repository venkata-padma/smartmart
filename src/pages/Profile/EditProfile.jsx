import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Icon from '../../assets/icons/Icon';
import { displayNameFromEmail, getCurrentUser, setCurrentUser } from '../../utils/auth';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [form, setForm] = useState({
    name: currentUser?.name || (currentUser?.email ? displayNameFromEmail(currentUser.email) : ''),
    email: currentUser?.email || '',
  });
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentUser({ name: form.name, email: form.email });
    navigate('/profile');
  };

  return (
    <>
      <AppHeader title="Edit Profile" />
      <PageContainer withNav={false}>
        <form className="edit-profile" onSubmit={handleSubmit}>
          <div className="edit-profile__avatar"><Icon name="person" size={34} /></div>
          <label>Full name<input name="name" value={form.name} onChange={update} required /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} required /></label>
          <Button variant="primary" type="submit">Save Changes</Button>
        </form>
      </PageContainer>
    </>
  );
}
