import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={isHomePage ? "home-page" : ""}>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
