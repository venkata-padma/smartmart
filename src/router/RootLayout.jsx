import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import { isAuthenticated } from '../utils/auth';

const TAB_ROUTES = ['/home', '/scan', '/cart'];
const PRE_AUTH_ROUTES = ['/', '/onboarding', '/login', '/signup'];

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const showNav = TAB_ROUTES.includes(location.pathname);

  // Runs once per full page load (RootLayout stays mounted across client-side
  // navigation), so a fresh load or hard refresh always re-enters through the
  // splash flow when signed out, instead of trusting whatever URL happened to
  // be in the address bar.
  useEffect(() => {
    const loggedIn = isAuthenticated();
    if (!loggedIn && location.pathname !== '/') {
      navigate('/', { replace: true });
    } else if (loggedIn && PRE_AUTH_ROUTES.includes(location.pathname)) {
      navigate('/home', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anim = location.state?.anim;

  return (
    <div className="app-shell">
      <div className="page-viewport">
        <div key={location.key} className={anim ? `page-anim page-anim--${anim}` : 'page-anim'}>
          <Outlet />
        </div>
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
