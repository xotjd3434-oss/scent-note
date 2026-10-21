import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Heart, Trash2 } from "lucide-react";
import ProductImage from "./ProductImage";
import QuantityControl from "./QuantityControl";
import { won } from "../data/perfumes";
function CartDrawer({ shop, onClose }) {
  const panel = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const handler = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = panel.current.querySelectorAll(
        'button:not(:disabled), a[href], [tabindex="0"]',
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !panel.current.contains(document.activeElement) ||
          document.activeElement === panel.current)
      ) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handler);
      if (opener?.isConnected) opener.focus();
    };
  }, [onClose]);
  return (
    <div
      className="cart-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        ref={panel}
      >
        <div className="cart-drawer-heading">
          <div>
            <span className="eyebrow">YOUR SHOPPING BAG</span>
            <h2 id="cart-title">
              장바구니 <span>{shop.cartCount}</span>
            </h2>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="장바구니 닫기"
          >
            <X size={24} />
          </button>
        </div>
        {shop.cartItems.length ? (
          <>
            <div className="cart-list">
              <button className="clear-cart" onClick={shop.clearCart}>
                전체 삭제
              </button>
              {shop.cartItems.map(({ id, quantity, product }) => (
                <article className="cart-row" key={id}>
                  <Link
                    className="cart-product-image"
                    to={`/perfumes/${id}`}
                    onClick={onClose}
                  >
                    <ProductImage item={product} />
                  </Link>
                  <div className="cart-row-info">
                    <span className="cart-brand">{product.brand}</span>
                    <Link to={`/perfumes/${id}`} onClick={onClose}>
                      <h3>{product.name}</h3>
                    </Link>
                    <p>
                      {product.volume} / {product.concentration}
                    </p>
                    <strong>{won(product.price * quantity)}</strong>
                    <QuantityControl
                      value={quantity}
                      onChange={(value) => shop.updateQuantity(id, value)}
                      label={product.name}
                    />
                    <div className="cart-row-actions">
                      <button
                        aria-pressed={shop.favorites.includes(id)}
                        onClick={() => shop.toggleFavorite(id)}
                      >
                        <Heart
                          size={14}
                          fill={
                            shop.favorites.includes(id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                        {shop.favorites.includes(id) ? "찜 해제" : "찜하기"}
                      </button>
                      <button
                        onClick={() => shop.removeCart(id)}
                        aria-label={`${product.name} 장바구니 삭제`}
                      >
                        <Trash2 size={14} />
                        삭제
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>상품 금액</span>
                <span>{won(shop.subtotal)}</span>
              </div>
              <div>
                <span>배송비</span>
                <span>{shop.shipping ? won(shop.shipping) : "무료"}</span>
              </div>
              <div className="cart-total">
                <strong>총 주문 금액</strong>
                <strong>{won(shop.total)}</strong>
              </div>
              <p className="price-demo-label">
                표시 가격은 포트폴리오 데모용 예시입니다.
              </p>
              <Link className="button" to="/checkout" onClick={onClose}>
                주문서 확인{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <button className="continue-shopping" onClick={onClose}>
                계속 쇼핑하기
              </button>
            </div>
          </>
        ) : (
          <div className="cart-empty">
            <ShoppingBag size={38} strokeWidth={1} />
            <h3>장바구니가 비어 있어요.</h3>
            <p>마음에 드는 향수를 담아보세요.</p>
            <Link className="button" to="/perfumes" onClick={onClose}>
              향수 보러 가기{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
export default CartDrawer;
