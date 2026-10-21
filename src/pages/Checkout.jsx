import { Link } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import { won } from "../data/perfumes";
function Checkout({ shop }) {
  if (!shop.cartItems.length)
    return (
      <div className="empty-state">
        <h1>주문할 상품이 없어요.</h1>
        <p>먼저 장바구니에 향수를 담아주세요.</p>
        <Link className="button" to="/perfumes">
          향수 보러 가기{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    );
  return (
    <section className="checkout-page section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ORDER REVIEW</span>
          <h1>주문서 확인</h1>
          <p>장바구니에 담은 상품과 금액을 확인해주세요.</p>
        </div>
      </div>
      <div className="checkout-layout">
        <div className="checkout-products">
          {shop.cartItems.map(({ product, quantity }) => (
            <div className="checkout-product" key={product.id}>
              <div className="checkout-image">
                <ProductImage item={product} />
              </div>
              <div>
                <span className="eyebrow">{product.brand}</span>
                <h2>{product.name}</h2>
                <p>
                  {product.volume} · 수량 {quantity}개
                </p>
                <strong>{won(product.price * quantity)}</strong>
              </div>
            </div>
          ))}
        </div>
        <aside className="checkout-summary">
          <h2>주문 금액</h2>
          <dl>
            <div>
              <dt>상품 금액</dt>
              <dd>{won(shop.subtotal)}</dd>
            </div>
            <div>
              <dt>배송비</dt>
              <dd>{shop.shipping ? won(shop.shipping) : "무료"}</dd>
            </div>
            <div className="checkout-total">
              <dt>합계</dt>
              <dd>{won(shop.total)}</dd>
            </div>
          </dl>
          <div className="checkout-demo">
            <strong>쇼핑 데모 안내</strong>
            <p>
              표시 가격은 예시이며 실제 결제나 주문 접수는 진행되지 않습니다.
              개인정보와 결제 정보도 입력받지 않습니다.
            </p>
          </div>
          <Link className="button" to="/perfumes">
            계속 쇼핑하기{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
export default Checkout;
