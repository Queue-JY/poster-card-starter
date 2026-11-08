import { useEffect, useState } from "react";
import { fetchOtherCards } from "../lib/api";

export default function OtherCards({ myId }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!myId) return;
    let alive = true;

    const load = () =>
      fetchOtherCards(myId).then((c) => {
        if (alive && c.length > 0) setCards(c);
      });

    load(); 
    const timer = setInterval(load, 20000);
    window.addEventListener("focus", load);

    return () => {
      alive = false;
      clearInterval(timer);
      window.removeEventListener("focus", load);
    };
  }, [myId]);

  if (cards.length === 0) return null;

  return (
    <section className="others">
      <div className="others__head">
        <span className="others__label">Other Tickets</span>
        <span className="others__count">{cards.length} / 13</span>
      </div>

      <p className="others__hint">미션 카드에 적힌 번호를 찾아 눌러보세요</p>

      <div className="others__list">
        {cards.map((c) => (
          <a
            key={c.id}
            className="stubcard"
            href={c.url}
            target="_blank"
            rel="noreferrer"
          >
            <span className="stubcard__no">
              <small>NO.</small>
              <b>{String(c.number).padStart(2, "0")}</b>
            </span>
            <span className="stubcard__body">
              <span className="stubcard__title">{c.title}</span>
              <span className="stubcard__desc">{c.description}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}