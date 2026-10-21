import { Link } from "react-router-dom";
import { Sprout, Flower2, Wind, Sun } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import ScentLab from "../components/ScentLab";
import PerfumeCard from "../components/PerfumeCard";
import { perfumes } from "../data/perfumes";
import ProductImage from "../components/ProductImage";

const moods = [
  {
    title: "가볍게 시작하는 날",
    en: "A FRESH START",
    icon: Wind,
    family: "Clean",
    text: "맑은 공기처럼 산뜻하게",
    color: "#e8e9e2",
  },
  {
    title: "나만의 쉼이 필요할 때",
    en: "SLOW & GREEN",
    icon: Sprout,
    family: "Green",
    text: "고요한 초록 속으로",
    color: "#e0e4d9",
  },
  {
    title: "설렘을 간직하고 싶을 때",
    en: "A LITTLE ROMANCE",
    icon: Flower2,
    family: "Floral",
    text: "꽃처럼 부드러운 순간",
    color: "#eee1dd",
  },
  {
    title: "오래 남고 싶은 저녁",
    en: "WARM AFTERGLOW",
    icon: Sun,
    family: "Woody",
    text: "따뜻하고 깊은 여운",
    color: "#e9dfd0",
  },
];

function Home(props) {
  return (
    <>
      <HeroSlider />
      <div className="brand-ribbon" aria-label="Your scent. Your rules.">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <div
              className="marquee-group"
              key={n}
              aria-hidden={n === 1 ? "true" : undefined}
            >
              <span>A SELECT FRAGRANCE STORE</span>
              <i>✳</i>
              <span className="outline-text">SELECTED FOR YOUR EVERYDAY</span>
              <i>✳</i>
              <span>SCENT NOTE</span>
              <i>✳</i>
            </div>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE CURATED SELECTION</span>
            <h2>지금 눈여겨볼 향수</h2>
            <p>취향에 맞는 향수를 골라 장바구니에 담아보세요.</p>
          </div>
          <Link className="text-link" to="/perfumes">
            전체 상품 보기{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="card-grid">
          {perfumes
            .filter((p) => p.recommended)
            .map((item) => (
              <PerfumeCard key={item.id} item={item} {...props} />
            ))}
        </div>
      </section>
      <section className="mood-section section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE MOOD EDIT</span>
            <h2>마음이 머무는 분위기</h2>
            <p>지금의 기분과 어울리는 향의 계열을 만나보세요.</p>
          </div>
          <Link className="text-link" to="/guide">
            무드 가이드{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="mood-grid">
          {moods.map(({ title, en, icon: Icon, family, text, color }) => (
            <Link
              key={family}
              to={`/perfumes?family=${family}`}
              className="mood-card"
              style={{ background: color }}
            >
              <div>
                <span className="eyebrow">{en}</span>
                <Icon size={43} strokeWidth={1} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="mood-arrow">
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ScentLab />
      <section className="story-block">
        <div className="story-art">
          <span className="story-circle" />
          <ProductImage item={perfumes[2]} />
          <span className="story-art-label">A NOTE TO REMEMBER.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">THE SCENT EDIT</span>
          <h2>
            보이지 않는 향,
            <br />
            <em>선명하게 남는 기억.</em>
          </h2>
          <p>
            어떤 날의 공기, 좋아하는 사람의 온기.
            <br />
            향은 일상의 작은 장면들을 오래 기억하게 합니다.
          </p>
          <p>
            SCENT NOTE는 일상에 어울리는 향수를 고르는
            <br />
            즐거움을 제안하는 프래그런스 편집숍입니다.
          </p>
          <Link className="text-link" to="/about">
            SCENT NOTE의 이야기{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
      <section className="note-banner">
        <span className="eyebrow">FIND YOUR SIGNATURE</span>
        <h2>
          좋아하는 향을 모으면,
          <br />
          취향은 더 깊어집니다.
        </h2>
        <Link className="button outline" to="/perfumes?saved=1">
          찜한 상품 열기{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </>
  );
}

export default Home;
