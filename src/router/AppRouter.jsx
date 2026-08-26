import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './RootLayout';

import Splash from '../pages/Splash/Splash';
import Onboarding from '../pages/Onboarding/Onboarding';
import Login from '../pages/Login/Login';
import Signup from '../pages/Login/Signup';
import Home from '../pages/Home/Home';
import ScanProduct from '../pages/Scan/ScanProduct';
import ProductFound from '../pages/Scan/ProductFound';
import ShoppingCart from '../pages/Cart/ShoppingCart';
import DeliveryAddress from '../pages/Checkout/DeliveryAddress';
import NewAddress from '../pages/Checkout/NewAddress';
import Payment from '../pages/Checkout/Payment';
import OrderPlaced from '../pages/Checkout/OrderPlaced';
import OrderHistory from '../pages/Orders/OrderHistory';
import OrderDetails from '../pages/Orders/OrderDetails';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Profile/Settings';
import EditProfile from '../pages/Profile/EditProfile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/scan/result" element={<ProductFound />} />
          <Route path="/cart" element={<ShoppingCart />} />

          <Route path="/checkout/address" element={<DeliveryAddress />} />
          <Route path="/checkout/address/new" element={<NewAddress />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route path="/checkout/success" element={<OrderPlaced />} />

          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
