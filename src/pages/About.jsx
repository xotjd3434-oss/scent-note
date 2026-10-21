import { Link } from "react-router-dom";
import { perfumes } from "../data/perfumes";
import ProductImage from "../components/ProductImage";

function About() {
  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">THE STORY OF SCENT NOTE</span>
        <h1>
          Invisible scent.
          <br />
          <em>Unforgettable moments.</em>
        </h1>
        <p>보이지 않는 향으로, 잊히지 않는 순간을 기록합니다.</p>
      </section>
      <section className="story-block about-story">
        <div className="story-art">
          <span className="story-circle" />
          <ProductImage item={perfumes[1]} />
          <span className="story-art-label">YOUR STORY, IN A SCENT.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">OUR BEGINNING</span>
          <h2>
            평범한 하루에도
            <br />
            <em>기억할 향이 있어요.</em>
          </h2>
          <p>
            좋아하는 책의 첫 장, 비가 그친 뒤의 산책,
            <br />
            오랜만에 마주 앉은 사람과의 대화.
          </p>
          <p>
            SCENT NOTE는 향을 통해 일상의 장면을 기록하는
            <br />
            여러 브랜드의 향수를 소개하는 포트폴리오 편집숍입니다. 향을
            <br />
            비교하고 취향에 맞는 상품을 고르는 경험을 제안합니다.
          </p>
          <Link className="text-link" to="/perfumes">
            당신의 향을 발견해보세요{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
      <section className="section values-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WHAT WE BELIEVE</span>
            <h2>우리의 세 가지 노트</h2>
          </div>
        </div>
        <div className="values-grid">
          {[
            [
              "01",
              "Personal",
              "취향에는 정답이 없으니까",
              "유명한 이름보다 내가 좋아하는 느낌. 나에게 자연스럽게 어울리는 향을 찾는 경험을 생각합니다.",
            ],
            [
              "02",
              "Everyday",
              "가장 가까운 순간을 위해",
              "특별한 날뿐 아니라 평범한 하루에도. 일상에 가볍게 스며드는 작은 즐거움을 제안합니다.",
            ],
            [
              "03",
              "Memory",
              "향이 남긴 장면을 기록하다",
              "좋아하는 향을 하나씩 모아 나만의 노트를 만드세요. 그 안에서 당신의 취향을 발견할 수 있어요.",
            ],
          ].map(([n, en, title, text]) => (
            <article key={n}>
              <span className="eyebrow">{n} / OUR VALUE</span>
              <h3>{en}</h3>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="note-banner">
        <span className="eyebrow">PORTFOLIO PROJECT</span>
        <h2>
          당신의 하루에,
          <br />향 한 줄.
        </h2>
        <p>
          SCENT NOTE는 포트폴리오용 향수 쇼핑몰 데모입니다.
          <br />
          제품명과 사진의 권리는 각 브랜드와 이미지 제공처에 있습니다.
        </p>
        <Link className="button outline" to="/perfumes">
          향수 쇼핑하기{" "}
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </>
  );
}

export default About;
