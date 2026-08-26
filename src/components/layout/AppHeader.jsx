import { useNavigate } from 'react-router-dom';
import IconButton from '../common/IconButton';
import './AppHeader.css';

/**
 * Shared header used across nearly every screen.
 * `right` accepts any node: a profile icon, edit icon, kebab menu,
 * or a step-progress indicator (see `steps`/`activeStep`).
 */
export default function AppHeader({ title, onBack, right = null, steps, activeStep }) {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <IconButton name="back" label="Go back" onClick={onBack || (() => navigate(-1))} />
      <h1 className="app-header__title">{title}</h1>
      <div className="app-header__right">
        {steps ? (
          <div className="app-header__steps">
            {Array.from({ length: steps }).map((_, i) => (
              <span
                key={i}
                className={`app-header__dot ${i === activeStep ? 'is-active' : ''}`}
              />
            ))}
          </div>
        ) : (
          right
        )}
      </div>
    </header>
  );
}
