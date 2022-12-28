export default function (props) {
  const { card } = props;
  return (
    <li className="card">
      <button
        className="button card__buttonDelete"
        type="button"
        name="delete"
      ></button>
      <img src={card.link} alt={card.name} className="card__image" />
      <div className="card__description">
        <h2 className="card__subtitle">{card.name}</h2>
        <div className="card__likeContainer">
          <button
            className="button card__likeButton"
            type="button"
            name="like"
            aria-label="Like"
          ></button>
          <span className="card__likeCounter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
