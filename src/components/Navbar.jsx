import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X, ShoppingBag } from "lucide-react";
import logoImg from "../assets/logo.png";

function Navbar({ favorites, cartCount, openCart }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const links = [
    ["/", "HOME"],
    ["/perfumes", "FRAGRANCE"],
    ["/guide", "MOOD GUIDE"],
    ["/about", "SCENT NOTE"],
  ];
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logoImg} alt="" />
          <span>
            SCENT NOTE<small>FRAGRANCE SELECT SHOP</small>
          </span>
        </Link>
        <nav
          id="site-navigation"
          className={`gnb ${open ? "is-open" : ""}`}
          aria-label="메인 메뉴"
        >
          {links.map(([url, label]) => (
            <NavLink
              key={url}
              to={url}
              end={url === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            to="/perfumes?saved=1"
            className="favorite-link"
            aria-label={`저장한 향 ${favorites.length}개`}
            onClick={() => setOpen(false)}
          >
            <Heart size={19} />
            <span>{favorites.length.toString().padStart(2, "0")}</span>
          </Link>
          <button
            className="header-cart"
            aria-label={`장바구니 ${cartCount}개`}
            onClick={() => {
              setOpen(false);
              openCart();
            }}
          >
            <ShoppingBag size={20} />
            <span>{cartCount}</span>
          </button>
          <button
            className="menu-button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen(!open)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <button
          className="menu-backdrop"
          key={pathname}
          aria-label="메뉴 닫기"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
