import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { perfumes, won } from "../data/perfumes";
import { productDetails } from "../data/productDetails";
import QuantityControl from "../components/QuantityControl";
import ProductImage from "../components/ProductImage";
import PerfumeCard from "../components/PerfumeCard";

function PerfumeDetail(props) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const perfume = perfumes.find((item) => item.id === id);
  if (!perfume)
    return (
      <div className="empty-state">
        <h1>이 향을 찾을 수 없어요.</h1>
        <Link className="button" to="/perfumes">
          컬렉션으로 돌아가기
        </Link>
      </div>
    );
  const details = productDetails[id];
  const saved = props.favorites.includes(id);
  const related = perfumes
    .filter((p) => p.id !== id)
    .sort(
      (a, b) =>
        Number(b.family === perfume.family) -
        Number(a.family === perfume.family),
    )
    .slice(0, 4);
  return (
    <>
      <div className="detail-breadcrumb">
        <Link to="/perfumes">
          <span className="arrow" aria-hidden="true">
            →
          </span>{" "}
          컬렉션으로
        </Link>
        <span>{perfume.brand}</span>
      </div>
      <section className="detail-layout">
        <div
          className="detail-image"
          style={{ background: perfume.background }}
        >
          <span className="detail-image-label">
            SCENT NOTE — THE COLLECTION
          </span>
          <ProductImage item={perfume} loading="eager" />
          <span className="detail-image-bottom">
            {perfume.family.toUpperCase()}
          </span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {perfume.brand} · {perfume.family.toUpperCase()} ·{" "}
            {perfume.concentration.toUpperCase()}
          </span>
          <h1>{perfume.name}</h1>
          <p className="korean-name">{perfume.koreanName}</p>
          <div className="detail-price">
            <strong>{won(perfume.price)}</strong>
            <span>
              {perfume.volume} · {perfume.concentration}
            </span>
          </div>
          <p className="detail-description">{perfume.description}</p>
          <dl className="perfume-spec">
            <div>
              <dt>FAMILY</dt>
              <dd>{perfume.family}</dd>
            </div>
            <div>
              <dt>MOOD</dt>
              <dd>{perfume.mood}</dd>
            </div>
            <div>
              <dt>SEASON</dt>
              <dd>{perfume.season}</dd>
            </div>
            <div>
              <dt>VOLUME</dt>
              <dd>{perfume.volume}</dd>
            </div>
          </dl>
          <div className="purchase-quantity">
            <span>수량 선택</span>
            <QuantityControl
              value={quantity}
              onChange={setQuantity}
              label={perfume.name}
            />
          </div>
          <div className="purchase-total">
            <span>총 상품 금액</span>
            <strong>{won(perfume.price * quantity)}</strong>
          </div>
          <div className="purchase-actions">
            <button
              className="button buy-now"
              onClick={() => {
                props.addCart(id, quantity);
                props.openCart();
              }}
            >
              바로 구매하기{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </button>

            <button
              className="detail-cart-button"
              aria-label="장바구니 담기"
              title="장바구니 담기"
              onClick={() => props.addCart(id, quantity)}
            >
              <ShoppingCart size={21} />
            </button>
            <button
              className={`detail-wishlist ${saved ? "is-saved" : ""}`}
              aria-label={saved ? "찜 해제" : "찜하기"}
              aria-pressed={saved}
              onClick={() => props.toggleFavorite(id)}
            >
              <Heart size={21} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="delivery-info">
            <p>10만원 이상 무료배송 · 배송비 예시 기준</p>
            <p>표시 가격은 포트폴리오 데모용 예시입니다.</p>
          </div>
          <a
            className="official-link text-link"
            href={perfume.source}
            target="_blank"
            rel="noreferrer"
          >
            브랜드 공식 제품 정보{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <p className="concept-label">
            제품 정보는 브랜드 공식 설명을 참고했습니다. 무드·계절·향조 필터는
            SCENT NOTE의 큐레이션 기준입니다.
          </p>
        </div>
      </section>
      <nav className="product-detail-nav" aria-label="상품 상세 정보">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("product-story")
              ?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
                block: "start",
              })
          }
        >
          상품 설명
        </button>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("product-notes")
              ?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
                block: "start",
              })
          }
        >
          향의 노트
        </button>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("product-information")
              ?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
                block: "start",
              })
          }
        >
          상품 정보
        </button>
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("product-care")
              ?.scrollIntoView({
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
                block: "start",
              })
          }
        >
          사용 안내
        </button>
      </nav>
      <section className="section product-story" id="product-story">
        <div className="product-story-title">
          <span className="eyebrow">THE FRAGRANCE, IN DETAIL</span>
          <h2>{details.headline}</h2>
          <div className="scent-tags">
            {details.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="product-story-body">
          <p>{details.story}</p>
          <h3>이런 분위기에 추천해요</h3>
          <p>{details.pairing}</p>
          <small>
            스타일과 분위기 제안은 SCENT NOTE의 큐레이션입니다. 향의 느낌과 지속
            정도는 개인에 따라 다를 수 있습니다.
          </small>
        </div>
      </section>
      <section className="section notes-section" id="product-notes">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE OLFACTORY COMPOSITION</span>
            <h2>향을 이루는 주요 노트</h2>
            <p>브랜드가 소개하는 향의 재료와 어코드.</p>
          </div>
        </div>
        <div className="notes-grid">
          {perfume.notes.map((note, i) => (
            <div key={note}>
              <span className="eyebrow">{perfume.noteLabels[i]}</span>
              <h3>{note}</h3>
              <p>{details.notes[i]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section product-information" id="product-information">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PRODUCT INFORMATION</span>
            <h2>구매 전 확인하세요</h2>
          </div>
        </div>
        <dl className="product-facts">
          <div>
            <dt>상품명</dt>
            <dd>
              {perfume.name} / {perfume.koreanName}
            </dd>
          </div>
          <div>
            <dt>브랜드</dt>
            <dd>{perfume.brand}</dd>
          </div>
          <div>
            <dt>제품 유형 · 용량</dt>
            <dd>
              {perfume.concentration} · {perfume.volume}
            </dd>
          </div>
          <div>
            <dt>주요 향의 재료</dt>
            <dd>{perfume.notes.join(" / ")}</dd>
          </div>
          <div>
            <dt>구성</dt>
            <dd>
              선택한 향수 단품. 선물 포장과 추가 증정품은 포함하지 않습니다.
            </dd>
          </div>
          <div>
            <dt>성분 · 제조 정보</dt>
            <dd>
              구매 시 제품 포장과 브랜드 공식 페이지의 최신 표시사항을 확인해
              주세요.
            </dd>
          </div>
        </dl>
      </section>
      <section className="section product-care" id="product-care">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HOW TO ENJOY</span>
            <h2>향을 즐기는 방법</h2>
          </div>
        </div>
        <div className="product-accordions">
          <details open>
            <summary>
              사용 방법 <span>+</span>
            </summary>
            <p>
              제품에 표시된 사용법에 따라 손목이나 목 등 원하는 부위에 적당량
              분사해 주세요. 처음에는 소량으로 향의 느낌을 확인하고 취향에 맞게
              조절해 보세요.
            </p>
          </details>
          <details>
            <summary>
              보관 방법 <span>+</span>
            </summary>
            <p>
              직사광선과 고온을 피해 보관하고, 사용 후에는 뚜껑을 닫아 주세요.
              자세한 보관 조건은 제품 포장의 표시사항을 따릅니다.
            </p>
          </details>
          <details>
            <summary>
              용량과 향의 느낌 <span>+</span>
            </summary>
            <p>
              현재 선택한 제품은 {perfume.volume} {perfume.concentration}입니다.
              같은 제품명이라도 농도나 버전에 따라 향 구성이 다를 수 있으니 제품
              유형을 확인해 주세요.
            </p>
          </details>
          <details>
            <summary>
              배송 · 주문 안내 <span>+</span>
            </summary>
            <p>
              이 사이트는 포트폴리오 쇼핑 데모입니다. 장바구니와 주문 금액
              확인을 체험할 수 있으며 실제 결제와 배송은 진행되지 않습니다.
              표시된 가격과 배송비는 시연용 예시입니다.
            </p>
          </details>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ANOTHER NOTE</span>
            <h2>이런 향도 만나보세요</h2>
          </div>
          <Link className="text-link" to="/perfumes">
            전체 컬렉션{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="card-grid">
          {related.map((item) => (
            <PerfumeCard key={item.id} item={item} {...props} />
          ))}
        </div>
      </section>
    </>
  );
}

export default PerfumeDetail;
