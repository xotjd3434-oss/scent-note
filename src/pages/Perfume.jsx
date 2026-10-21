import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Heart, SlidersHorizontal } from "lucide-react";
import PerfumeCard from "../components/PerfumeCard";
import { perfumes, families } from "../data/perfumes";

function Perfume(props) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const family = families.includes(params.get("family"))
    ? params.get("family")
    : "All";
  const savedOnly = params.get("saved") === "1";
  const [order, setOrder] = useState("default");
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const results = perfumes
    .filter(
      (p) =>
        (family === "All" || p.family === family) &&
        (!savedOnly || props.favorites.includes(p.id)) &&
        `${p.brand} ${p.name} ${p.koreanName} ${p.family} ${p.description} ${p.notes.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) =>
      order === "name"
        ? a.name.localeCompare(b.name)
        : a.id.localeCompare(b.id),
    );
  const reset = () => {
    setQuery("");
    setOrder("default");
    setParams({});
  };
  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">THE SCENT COLLECTION</span>
        <h1>
          Find your <em>own note.</em>
        </h1>
        <p>마음에 닿는 향 하나. 나만의 취향을 발견하는 시간.</p>
      </section>
      <section className="section collection-section">
        <div className="collection-tools">
          <div className="search-field">
            <Search size={19} />
            <input
              aria-label="향수 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="향 이름, 향조 또는 노트를 검색해보세요"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="검색어 지우기">
                <X size={17} />
              </button>
            )}
          </div>
          <button
            className={`saved-filter ${savedOnly ? "active" : ""}`}
            aria-pressed={savedOnly}
            onClick={() => change("saved", savedOnly ? "" : "1")}
          >
            <Heart size={17} fill={savedOnly ? "currentColor" : "none"} /> 나의
            향 노트 ({props.favorites.length})
          </button>
        </div>
        <div className="filter-row">
          <div className="family-tabs" role="group" aria-label="향조 필터">
            {families.map((f) => (
              <button
                key={f}
                className={family === f ? "active" : ""}
                aria-pressed={family === f}
                onClick={() => change("family", f === "All" ? "" : f)}
              >
                {f === "All" ? "All scents" : f}
              </button>
            ))}
          </div>
          <label className="sort-label">
            <SlidersHorizontal size={15} />
            <span className="sr-only">향수 정렬</span>
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="default">컬렉션 순</option>
              <option value="name">이름 순 A–Z</option>
            </select>
          </label>
        </div>
        <div className="result-line" aria-live="polite">
          <span>
            {savedOnly ? "YOUR WISHLIST" : "EXPLORE THE COLLECTION"}{" "}
            <b>{results.length.toString().padStart(2, "0")}</b>
          </span>
          {(query || family !== "All" || savedOnly) && (
            <button onClick={reset}>
              전체 보기 <X size={13} />
            </button>
          )}
        </div>
        {results.length ? (
          <div className="card-grid">
            {results.map((item) => (
              <PerfumeCard key={item.id} item={item} {...props} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} strokeWidth={1} />
            <h2>
              {savedOnly && !props.favorites.length
                ? "아직 기록한 향이 없어요."
                : "조건에 맞는 향이 없어요."}
            </h2>
            <p>
              {savedOnly && !props.favorites.length
                ? "상품의 하트를 눌러 마음에 드는 향수를 모아보세요."
                : "다른 검색어를 입력하거나 필터를 초기화해보세요."}
            </p>
            <button className="button" onClick={reset}>
              전체 상품 보기
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Perfume;
