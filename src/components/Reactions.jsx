import { useEffect, useState } from "react";
import { addReaction, fetchReactionCounts, fetchSecretDigit } from "../lib/api";

const EMOJIS = [
  { key: "love", label: "좋아요" },
  { key: "fire", label: "멋져요" },
  { key: "eyes", label: "궁금" },
  { key: "fun", label: "웃김" },
];

export default function Reactions({ cardId, cardNumber }) {
  const [counts, setCounts] = useState({});
  const [digit, setDigit] = useState(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const storageKey = `reacted:${cardId}`;

  useEffect(() => {
    if (!cardId) return;
    let alive = true;

    fetchReactionCounts(cardId).then((c) => alive && setCounts(c));

    let already = false;
    try {
      already = !!localStorage.getItem(storageKey);
    } catch {
      /* 시크릿 모드 등에서 접근 불가 — 무시 */
    }
    if (already) {
      setDone(true);
      fetchSecretDigit(cardNumber).then((d) => alive && setDigit(d));
    }
    return () => {
      alive = false;
    };
  }, [cardId, cardNumber]);

  async function handleReact(emoji) {
    if (done || busy || !cardId) return;
    setBusy(true);
    setDone(true); // 먼저 뒤집기 시작

    await addReaction(cardId, emoji);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      /* 저장 못 해도 진행 */
    }

    setCounts((c) => ({ ...c, [emoji]: (c[emoji] || 0) + 1 }));
    const d = await fetchSecretDigit(cardNumber);
    setDigit(d);
    setBusy(false);
  }

  return (
    <>
      <div className="reactions">
        {EMOJIS.map((e) => (
          <button
            key={e.key}
            className="reactions__btn"
            onClick={() => handleReact(e.key)}
            disabled={done}
          >
            <span>{e.label}</span>
            <strong>{counts[e.key] || 0}</strong>
          </button>
        ))}
      </div>

      <div className={`stub ${done ? "stub--flipped" : ""}`}>
        <div className="stub__inner">
          <div className="stub__face stub__front">
            <span className="stub__circle" />
            <span>반응을 남기면 숫자가 나옵니다</span>
          </div>
          <div className="stub__face stub__back">
            <span className="stub__label">MISSION</span>
            <strong className="stub__digit">{digit ?? "·"}</strong>
          </div>
        </div>
      </div>
    </>
  );
}
