import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Pause, Play } from "lucide-react";
import { perfumes } from "../data/perfumes";
import ProductImage from "./ProductImage";
const slides = [
  {
    perfume: perfumes[2],
    title: ["Your next", "signature scent."],
    text: "시간이 흘러도 기억에 남는 향.",
    edition: "THE ICONIC EDIT",
    caption: "A study in elegance",
  },
  {
    perfume: perfumes[1],
    title: ["Less ordinary,", "more you."],
    text: "나만의 속도로 머무는 초록의 여유.",
    edition: "THE GREEN EDIT",
    caption: "In the shade of a fig tree",
  },
  {
    perfume: perfumes[3],
    title: ["A lasting", "impression."],
    text: "해가 저문 자리에 남는 깊고 따뜻한 여운.",
    edition: "THE EVENING EDIT",
    caption: "The beauty of contrast",
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const stage = useRef(null);
  const start = useRef(null);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    if (paused || focused || hidden) return;
    const timer = setTimeout(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => clearTimeout(timer);
  }, [paused, focused, hidden, index]);
  const shift = (dir) =>
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  const slide = slides[index];
  const move = (e) => {
    if (
      e.pointerType === "touch" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty(
      "--hero-x",
      `${((e.clientX - rect.left) / rect.width - 0.5) * 12}px`,
    );
    stage.current?.style.setProperty(
      "--hero-y",
      `${((e.clientY - rect.top) / rect.height - 0.5) * 10}px`,
    );
  };
  return (
    <section
      className={`hero-slide luxe-hero ${paused || focused || hidden ? "is-paused" : "is-playing"}`}
      aria-label="추천 컬렉션"
      aria-roledescription="carousel"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="hero-timer" aria-hidden="true">
        <span key={`${index}-${paused}-${focused}-${hidden}`} />
      </div>
      <div className="hero-meta">
        <span>SCENT NOTE — A SELECT FRAGRANCE STORE</span>
        <span>SELECTED FOR YOUR EVERYDAY</span>
      </div>
      <div className="hero-copy" key={`copy-${index}`}>
        <span className="eyebrow hero-edition">
          <i />
          {slide.edition}
        </span>
        <h1>
          {slide.title[0]}
          <br />
          <em>{slide.title[1]}</em>
        </h1>
        <p className="hero-description">
          {slide.text}
          <br />
          매일의 분위기를 바꾸는 향수를 만나보세요.
        </p>
        <Link className="button" to="/perfumes">
          향수 쇼핑하기
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <div className="hero-featured">
          <span className="eyebrow">IN FOCUS / {slide.perfume.brand}</span>
          <Link to={`/perfumes/${slide.perfume.id}`}>
            {slide.perfume.name}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <span>{slide.perfume.concentration}</span>
        </div>
      </div>
      <div
        className="hero-art"
        ref={stage}
        onPointerMove={move}
        onPointerLeave={() => {
          stage.current?.style.setProperty("--hero-x", "0px");
          stage.current?.style.setProperty("--hero-y", "0px");
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (
            start.current !== null &&
            Math.abs(e.clientX - start.current) > 45
          )
            shift(e.clientX < start.current ? 1 : -1);
          start.current = null;
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        <div className="hero-photo-arch">
          <div className="hero-product" key={slide.perfume.id}>
            <ProductImage
              item={slide.perfume}
              loading="eager"
              draggable="false"
            />
          </div>
        </div>
        <span className="hero-vertical">{slide.caption}</span>
        <div className="hero-photo-caption">
          <span>{slide.perfume.brand}</span>
          <span>0{index + 1} / 03</span>
        </div>
      </div>
      <div className="hero-controls">
        <span className="hero-scroll-hint">
          <span className="arrow" aria-hidden="true">
            →
          </span>
          DISCOVER YOUR SCENT
        </span>
        <div className="hero-control-middle">
          <button
            className="hero-switch"
            onClick={() => shift(-1)}
            aria-label="이전 슬라이드"
          >
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <div className="slide-dots">
            {slides.map((s, i) => (
              <button
                key={s.perfume.id}
                className={i === index ? "on" : ""}
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}번째 슬라이드`}
                aria-current={i === index ? "true" : undefined}
              >
                <span>0{i + 1}</span>
              </button>
            ))}
          </div>
          <button
            className="hero-switch"
            onClick={() => shift(1)}
            aria-label="다음 슬라이드"
          >
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <button
            className="hero-pause"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "자동 슬라이드 재생" : "자동 슬라이드 정지"}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <span className="hero-end-note">THE FRAGRANCE EDIT</span>
      </div>
    </section>
  );
}

export default HeroSlider;
