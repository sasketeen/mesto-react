export default function ImagePopup() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__image-container">
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
          aria-label="Закрыть"
        ></button>
        <figure className="popup__figure">
          <img src="#" alt="" className="popup__image" />
          <figcaption className="popup__subtitle"></figcaption>
        </figure>
      </div>
    </div>
  );
}
