import { useState } from 'react';
import AppHeader from '../../components/layout/AppHeader';
import PageContainer from '../../components/layout/PageContainer';
import Icon from '../../assets/icons/Icon';
import './Settings.css';

const initialSettings = [
  { id: 'notifications', label: 'Push notifications', detail: 'Order updates and offers', enabled: true },
  { id: 'location', label: 'Location access', detail: 'Faster delivery estimates', enabled: true },
  { id: 'offers', label: 'Personalized offers', detail: 'Recommendations based on your cart', enabled: false },
];

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (id) => {
    setSettings((current) => current.map((setting) => (
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    )));
  };

  return (
    <>
      <AppHeader title="Settings" />
      <PageContainer withNav={false}>
        <p className="settings__intro">Tune your SmartMart experience.</p>
        <div className="settings__list">
          {settings.map((setting) => (
            <div className="settings__row" key={setting.id}>
              <span className="settings__icon"><Icon name={setting.id === 'location' ? 'location' : 'settings'} size={20} /></span>
              <span className="settings__copy">
                <strong>{setting.label}</strong>
                <small>{setting.detail}</small>
              </span>
              <button
                className={`settings__toggle ${setting.enabled ? 'is-on' : ''}`}
                type="button"
                aria-pressed={setting.enabled}
                aria-label={`Toggle ${setting.label}`}
                onClick={() => toggleSetting(setting.id)}
              >
                <span />
              </button>
            </div>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
