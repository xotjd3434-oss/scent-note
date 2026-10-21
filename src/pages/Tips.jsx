import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

const guides = [
  {
    family: "Clean",
    title: "맑고 가벼운 시작",
    text: "깨끗한 셔츠, 햇살이 드는 방. 산뜻하고 편안한 분위기를 좋아한다면 클린 계열을 만나보세요.",
    keywords: "COTTON · MUSK · MARINE",
    color: "#e6e9e2",
    no: "01",
  },
  {
    family: "Green",
    title: "초록 속의 작은 쉼",
    text: "촉촉한 잎사귀와 나무 그늘. 자연 속을 걷듯 차분한 분위기를 떠올리는 향입니다.",
    keywords: "LEAVES · FIG · MOSS",
    color: "#e0e5d9",
    no: "02",
  },
  {
    family: "Floral",
    title: "부드럽게 피는 설렘",
    text: "갓 피어난 꽃의 화사함부터 차분한 파우더리함까지. 꽃마다 다른 표정을 발견해보세요.",
    keywords: "ROSE · VIOLET · IRIS",
    color: "#eee1df",
    no: "03",
  },
  {
    family: "Woody",
    title: "따뜻하고 깊은 여운",
    text: "나무의 결처럼 차분하고 깊게. 따뜻한 분위기와 오래 남는 잔향을 표현한 계열입니다.",
    keywords: "CEDAR · SANDALWOOD · AMBER",
    color: "#e8dfd3",
    no: "04",
  },
  {
    family: "Citrus",
    title: "밝게 열리는 하루",
    text: "과일 껍질을 톡 터뜨린 듯한 상큼함. 경쾌하고 산뜻한 분위기가 필요한 날에 어울려요.",
    keywords: "LIME · MANDARIN · BERGAMOT",
    color: "#eeead5",
    no: "05",
  },
];
const questions = [
  [
    "향수는 어떻게 시향하면 좋을까요?",
    "처음에는 시향지로 전체적인 분위기를 살펴보고, 마음에 드는 향을 피부에 소량 뿌려보세요. 바로 맡은 향뿐 아니라 시간이 지난 뒤의 향도 비교해보면 취향을 찾는 데 도움이 됩니다.",
  ],
  [
    "탑·하트·베이스 노트는 무엇인가요?",
    "향이 전개되는 과정을 표현하는 방식이에요. 탑은 첫인상, 하트는 중심 분위기, 베이스는 오래 남는 여운을 뜻합니다. 실제 변화는 조합과 피부, 환경에 따라 다르게 느껴질 수 있어요.",
  ],
  [
    "찜한 상품는 어디에 저장되나요?",
    "하트로 저장한 컬렉션은 현재 브라우저에 보관돼요. 같은 기기와 브라우저에서는 다시 볼 수 있지만, 브라우저 데이터를 지우거나 다른 기기를 사용하면 공유되지 않습니다.",
  ],
  [
    "사이트의 향수를 구매할 수 있나요?",
    "상품 담기와 주문서 확인까지 가능한 포트폴리오용 쇼핑 데모입니다. 표시 가격은 예시이며 실제 결제·주문 접수·배송은 진행하지 않습니다. 실제 제품 정보는 상세 화면의 공식 링크에서 확인할 수 있어요.",
  ],
];

function Tips() {
  const [opened, setOpened] = useState(null);
  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">A GUIDE TO YOUR FEELING</span>
        <h1>
          A mood. <em>A matching scent.</em>
        </h1>
        <p>지금의 기분에 이름을 붙이면, 어울리는 향이 보여요.</p>
      </section>
      <section className="section guide-section">
        <div className="guide-grid">
          {guides.map((g) => (
            <article
              className="guide-card"
              key={g.family}
              style={{ "--guide-color": g.color }}
            >
              <div className="guide-card-top">
                <span className="eyebrow">
                  {g.no} / {g.family.toUpperCase()}
                </span>
                <span className="guide-symbol">
                  {["✧", "❧", "✳", "◒", "☼"][Number(g.no) - 1]}
                </span>
              </div>
              <h2>{g.title}</h2>
              <p>{g.text}</p>
              <span className="guide-keywords">{g.keywords}</span>
              <Link className="text-link" to={`/perfumes?family=${g.family}`}>
                {g.family} 컬렉션{" "}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section faq-section">
        <div>
          <span className="eyebrow">A FEW LITTLE NOTES</span>
          <h2>
            향을 알아가는
            <br />
            작은 질문들.
          </h2>
          <p>처음 만나는 향이 조금 더 편안하도록.</p>
        </div>
        <div className="faq-list">
          {questions.map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <h3>
                <button
                  aria-expanded={opened === i}
                  aria-controls={`answer-${i}`}
                  onClick={() => setOpened(opened === i ? null : i)}
                >
                  {q}
                  {opened === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div id={`answer-${i}`} hidden={opened !== i}>
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Tips;
