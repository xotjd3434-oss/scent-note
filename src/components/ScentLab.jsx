import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles } from "lucide-react";

const questions = [
  {
    title: "오늘은 어떤 공간에 머물고 싶나요?",
    choices: [
      ["Clean", "아무 약속 없는 내 방", "01 / JUST ME"],
      ["Green", "사람 없는 초록 숲", "02 / OFFLINE"],
      ["Floral", "햇살 가득한 꽃시장", "03 / IN BLOOM"],
      ["Woody", "조명이 낮은 재즈 바", "04 / AFTER DARK"],
    ],
  },
  {
    title: "지금 마음에 닿는 문장은 무엇인가요?",
    choices: [
      ["Clean", "복잡하게 생각하지 마", "TAKE IT EASY"],
      ["Green", "네 속도로 가도 돼", "SLOW DOWN"],
      ["Floral", "오늘 좀 멋진데?", "LOOK AT YOU"],
      ["Woody", "넌 여운이 있는 사람이야", "STAY A LITTLE"],
    ],
  },
  {
    title: "어떤 분위기로 기억되고 싶나요?",
    choices: [
      ["Clean", "꾸밈없이 맑은", "EFFORTLESS"],
      ["Green", "자유롭고 담백한", "FREE SPIRIT"],
      ["Floral", "다정하지만 확실한", "SOFT POWER"],
      ["Woody", "조용하지만 강한", "QUIET IMPACT"],
    ],
  },
];
const descriptions = {
  Clean: [
    "A CLEAN IMPRESSION",
    "맑고 편안하게 머무는 향.",
    "맑은 머스크와 포근한 코튼. 편안한 하루에 닮은 향.",
  ],
  Green: [
    "A GREEN MOMENT",
    "싱그러운 자연의 여유.",
    "촉촉한 잎사귀와 나무의 결. 초록으로 돌아오는 시간.",
  ],
  Floral: [
    "A FLORAL MEMORY",
    "부드러움 속에 담긴 선명한 개성.",
    "로즈와 바이올렛. 다정한 인상 속 선명한 존재감.",
  ],
  Woody: [
    "A WOODY AFTERGLOW",
    "오래도록 기억에 남는 여운.",
    "우드와 앰버. 조용히 스며드는 따뜻한 여운.",
  ],
};

function ScentLab() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState([]);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const close = () => setOpen(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = trigger.current;
    const el = dialog.current;
    el?.focus();
    const handle = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const targets = el.querySelectorAll(
        'button:not(:disabled), a[href], [tabindex="0"]',
      );
      const first = targets[0],
        last = targets[targets.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === el)
      ) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handle);
      opener?.focus();
    };
  }, [open]);
  const step = answers.length;
  const score = answers.reduce((a, v) => ({ ...a, [v]: (a[v] || 0) + 1 }), {});
  const family =
    Object.keys(score).sort(
      (a, b) => score[b] - score[a] || answers.indexOf(a) - answers.indexOf(b),
    )[0] || "Clean";
  return (
    <>
      <section className="lab-section">
        <div className="lab-graphic" aria-hidden="true">
          <span>?</span>
          <span className="lab-orbit" />
          <Sparkles size={32} />
        </div>
        <div className="lab-copy">
          <span className="eyebrow">A PERSONAL SCENT DISCOVERY</span>
          <h2>
            당신의 취향에,
            <br />
            <em>한 걸음 더 가까이.</em>
          </h2>
          <p>
            세 가지 질문으로 살펴보는 오늘의 기분.
            <br />
            마음이 향하는 답을 골라보세요.
          </p>
          <button
            ref={trigger}
            className="button"
            onClick={() => {
              setAnswers([]);
              setOpen(true);
            }}
          >
            나의 향 타입 찾기{" "}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <span className="lab-disclaimer">
            세 가지 질문으로 만나는 오늘의 향조.
          </span>
        </div>
        <span className="lab-index" aria-hidden="true">
          EXPERIMENT
          <br />
          NO. 001
        </span>
      </section>
      {open && (
        <div
          className="lab-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="lab-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lab-title"
            tabIndex={-1}
            ref={dialog}
          >
            <button
              className="lab-close"
              onClick={close}
              aria-label="향 테스트 닫기"
            >
              <X size={23} />
            </button>
            <div className="lab-dialog-meta">
              <span className="eyebrow">SCENT NOTE / PERSONALITY LAB</span>
              <span>
                {Math.min(step + 1, 3)
                  .toString()
                  .padStart(2, "0")}{" "}
                / 03
              </span>
            </div>
            <div className="lab-progress">
              <span style={{ width: `${(step / 3) * 100}%` }} />
            </div>
            {step < 3 ? (
              <div className="lab-question" key={step}>
                <span className="eyebrow">FOLLOW YOUR FEELING</span>
                <h2 id="lab-title">{questions[step].title}</h2>
                <div className="lab-options">
                  {questions[step].choices.map(([f, text, label]) => (
                    <button key={f} onClick={() => setAnswers([...answers, f])}>
                      <small>{label}</small>
                      <span>{text}</span>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    className="lab-back"
                    onClick={() => setAnswers(answers.slice(0, -1))}
                  >
                    <span className="arrow" aria-hidden="true">
                      →
                    </span>{" "}
                    이전 질문
                  </button>
                )}
              </div>
            ) : (
              <div className={`lab-result family-${family}`}>
                <span className="result-symbol" aria-hidden="true">
                  ✳
                </span>
                <span className="eyebrow">
                  YOUR MOOD TODAY / {family.toUpperCase()}
                </span>
                <h2 id="lab-title">{descriptions[family][0]}</h2>
                <h3>{descriptions[family][1]}</h3>
                <p>{descriptions[family][2]}</p>
                <Link
                  className="button"
                  to={`/perfumes?family=${family}`}
                  onClick={close}
                >
                  어울리는 컬렉션 만나기{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <button className="lab-retry" onClick={() => setAnswers([])}>
                  다시 알아보기
                </button>
                <small>오늘의 선택을 바탕으로 한 큐레이션 제안입니다.</small>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ScentLab;
