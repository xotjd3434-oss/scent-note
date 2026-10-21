import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import ProductImage from "./ProductImage";
import { won } from "../data/perfumes";

function PerfumeCard({ item, favorites, toggleFavorite, addCart }) {
  const saved = favorites.includes(item.id);
  return (
    <article className="perfume-card">
      <div className="card-image" style={{ "--card-bg": item.background }}>
        <Link to={`/perfumes/${item.id}`} aria-label={`${item.name} 상세 보기`}>
          <ProductImage item={item} />
        </Link>
        <div className="card-actions">
          <button
            className={`save-button ${saved ? "saved" : ""}`}
            aria-label={`${item.name} ${saved ? "찜 해제" : "찜하기"}`}
            title={saved ? "찜 해제" : "찜하기"}
            aria-pressed={saved}
            onClick={() => toggleFavorite(item.id)}
          >
            <Heart size={19} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            className="card-cart-button"
            aria-label={`${item.name} 장바구니 담기`}
            title="장바구니 담기"
            data-cart-add
            onClick={() => addCart(item.id)}
          >
            <ShoppingCart size={19} />
          </button>
        </div>
        <span className="card-family">{item.family}</span>
      </div>
      <Link className="card-info" to={`/perfumes/${item.id}`}>
        <div>
          <span className="eyebrow">
            {item.brand} · {item.concentration.toUpperCase()}
          </span>
          <h3>{item.name}</h3>
          <p>{item.short}</p>
          <strong className="card-price">{won(item.price)}</strong>
        </div>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  );
}

export default PerfumeCard;
