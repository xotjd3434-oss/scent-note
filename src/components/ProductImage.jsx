import { useState } from "react";
import { imagePath } from "../data/perfumes";

function ProductImage({ item, className = "", loading = "lazy", ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className={`product-unavailable ${className}`}
        role="img"
        aria-label={`${item.brand} ${item.name} 제품 사진 로드 실패`}
      >
        <span>{item.brand}</span>
        <strong>{item.name}</strong>
        <small>
          이미지를 불러오지 못했어요.
          <br />
          이미지 연결을 확인해주세요.
        </small>
      </div>
    );
  return (
    <img
      src={imagePath(item.image)}
      alt={`${item.brand} ${item.name} 제품 사진`}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

export default ProductImage;
