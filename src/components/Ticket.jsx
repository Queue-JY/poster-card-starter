import Reactions from "./Reactions";

export default function Ticket({ card }) {
  return (
    <article className="ticket">
      <header className="ticket__head">
        <span className="ticket__brand">POSTER CARD</span>
        <span className="ticket__no">
          NO.{String(card.number || 0).padStart(2, "0")}
        </span>
      </header>

      <div className="ticket__poster">
        <img src={card.image} alt={card.title || "포스터"} />
      </div>

      <div className="ticket__body">
        <h1 className="ticket__title">{card.title || "제목을 입력하세요"}</h1>
        <p className="ticket__desc">
          {card.description || "한줄 소개를 입력하세요"}
        </p>
      </div>

      <Reactions cardId={card.id} cardNumber={card.number} />
    </article>
  );
}
