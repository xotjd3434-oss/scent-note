import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function InteractionLayer() {
  const bar = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const elements = document.querySelectorAll(
      ".section-heading, .perfume-card, .mood-card, .story-copy, .guide-card, .values-grid article, .notes-grid > div, .note-banner > *, .lab-section",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    if (!reduced)
      elements.forEach((el, index) => {
        el.classList.add("reveal-item");
        el.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
        observer.observe(el);
      });
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? scrollY / max : 0})`,
      );
      if (!reduced) {
        const hero = document.querySelector(".hero-slide");
        hero?.style.setProperty(
          "--scroll-shift",
          `${Math.min(scrollY * 0.16, 110)}px`,
        );
        document.querySelectorAll(".story-art").forEach((el) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty(
            "--story-shift",
            `${Math.max(-55, Math.min(55, (innerHeight / 2 - rect.top - rect.height / 2) * 0.14))}px`,
          );
        });
      }
      document.documentElement.classList.toggle("has-scrolled", scrollY > 30);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const move = (event) => {
      if (reduced || !fine) return;
      const card = event.target.closest(
        ".card-image, .mood-card, .lab-section",
      );
      if (card) {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width;
        const y = (event.clientY - r.top) / r.height;
        card.style.setProperty("--rx", `${(y - 0.5) * -3}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
        card.style.setProperty("--spot-x", `${x * 100}%`);
        card.style.setProperty("--spot-y", `${y * 100}%`);
      }
      const magnetic = event.target.closest(".button, .hero-switch");
      if (magnetic) {
        const r = magnetic.getBoundingClientRect();
        magnetic.style.setProperty(
          "--mx",
          `${(event.clientX - r.left - r.width / 2) * 0.09}px`,
        );
        magnetic.style.setProperty(
          "--my",
          `${(event.clientY - r.top - r.height / 2) * 0.14}px`,
        );
      }
    };
    const leave = (event) => {
      const target = event.target.closest(
        ".card-image, .mood-card, .lab-section, .button, .hero-switch",
      );
      if (target && !target.contains(event.relatedTarget)) {
        ["--rx", "--ry", "--mx", "--my"].forEach((name) =>
          target.style.removeProperty(name),
        );
      }
    };
    const animations = new Set();
    const flights = new Set();
    const animate = (element, frames, options) => {
      const animation = element.animate(frames, options);
      animations.add(animation);
      animation.finished
        .catch(() => {})
        .finally(() => animations.delete(animation));
      return animation;
    };
    const click = (event) => {
      if (reduced || !(event.target instanceof Element)) return;
      const control = event.target.closest(".card-actions button");
      if (!control) return;
      animate(
        control,
        [
          { transform: "scale(1)" },
          { transform: "scale(.83)" },
          { transform: "scale(1.16)" },
          { transform: "scale(1)" },
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
      if (!control.hasAttribute("data-cart-add")) return;
      const destination = document.querySelector(".floating-cart");
      if (!destination) return;
      const from = control.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const dot = document.createElement("span");
      dot.className = "cart-flight";
      dot.setAttribute("aria-hidden", "true");
      dot.style.left = `${from.left + from.width / 2}px`;
      dot.style.top = `${from.top + from.height / 2}px`;
      document.body.append(dot);
      flights.add(dot);
      const dx = to.left + to.width / 2 - from.left - from.width / 2;
      const dy = to.top + to.height / 2 - from.top - from.height / 2;
      animate(
        dot,
        [
          { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.4 - 60}px)) scale(.8)`,
            opacity: 0.85,
            offset: 0.5,
          },
          {
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.3)`,
            opacity: 0,
          },
        ],
        { duration: 650, easing: "cubic-bezier(.3,.1,.3,1)" },
      )
        .finished.then(() => {
          animate(
            destination,
            [{ scale: "1" }, { scale: "1.12" }, { scale: "1" }],
            { duration: 300 },
          );
        })
        .catch(() => {})
        .finally(() => {
          dot.remove();
          flights.delete(dot);
        });
    };
    document.addEventListener("click", click);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    return () => {
      observer.disconnect();
      document.removeEventListener("click", click);
      animations.forEach((animation) => animation.cancel());
      flights.forEach((dot) => dot.remove());
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      cancelAnimationFrame(frame);
      elements.forEach((el) =>
        el.classList.remove("reveal-item", "is-revealed"),
      );
    };
  }, [pathname]);
  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={bar} />
    </div>
  );
}

export default InteractionLayer;
