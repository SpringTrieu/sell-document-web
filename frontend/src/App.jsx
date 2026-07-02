import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Forum from "./pages/forum/Forum";

import MyAccount from "./pages/accounts/MyAccount";
import VerifyEmail from "./pages/accounts/VerifyEmail";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const hideLayoutRoutes = ["/verify-email"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  const hideFooterRoutes = ["/login", "/register", "/my-account", "/verify-email"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className={isHomePage ? "home-page" : ""}>
      {!hideLayout && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forum" element={<Forum />} />


          <Route element={<ProtectedRoute />}>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>


        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;