import { useCallback, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Navbar from "./components/Navbar";
import InteractionLayer from "./components/InteractionLayer";
import CartDrawer from "./components/CartDrawer";
import useShop from "./hooks/useShop";
import Home from "./pages/Home";
import Perfume from "./pages/Perfume";
import PerfumeDetail from "./pages/PerfumeDetail";
import Tips from "./pages/Tips";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import "./App.css";
import "./luxe.css";
import "./shop.css";
function App() {
  const shop = useShop();
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  const shared = {
    favorites: shop.favorites,
    toggleFavorite: shop.toggleFavorite,
    addCart: shop.addCart,
    openCart: () => setCartOpen(true),
  };
  return (
    <>
      <InteractionLayer />
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>
      <Navbar
        favorites={shop.favorites}
        cartCount={shop.cartCount}
        openCart={() => setCartOpen(true)}
      />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home {...shared} />} />
          <Route path="/perfumes" element={<Perfume {...shared} />} />
          <Route
            path="/perfumes/:id"
            element={<PerfumeDetail key={pathname} {...shared} />}
          />
          <Route path="/guide" element={<Tips />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout shop={shop} />} />
          <Route
            path="*"
            element={
              <div className="empty-state">
                <span className="eyebrow">404</span>
                <h1>페이지를 찾을 수 없어요.</h1>
                <Link className="button" to="/">
                  홈으로{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link to="/" className="footer-brand">
            SCENT NOTE<span>Find a scent. Make it yours.</span>
          </Link>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} SCENT NOTE</small>
          <small>
            포트폴리오 쇼핑 데모 · 표시 가격은 예시이며 실제 결제되지 않습니다.
          </small>
        </div>
      </footer>
      <div className="floating-shop-tools">
        <button
          className="floating-cart"
          onClick={() => setCartOpen(true)}
          aria-label={`장바구니 열기 ${shop.cartCount}개`}
        >
          <ShoppingBag size={22} />
          <span>장바구니</span>
          {shop.cartCount > 0 && (
            <b className="floating-count">{shop.cartCount}</b>
          )}
        </button>
        <button
          className="floating-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
          aria-label="페이지 맨 위로"
        >
          TOP
        </button>
      </div>
      {cartOpen && <CartDrawer shop={shop} onClose={closeCart} />}
      <div
        className={`shop-toast ${shop.notice ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {shop.notice?.text}
      </div>
    </>
  );
}
export default App;
