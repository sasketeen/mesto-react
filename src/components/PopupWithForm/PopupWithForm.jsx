export default function PopupWithForm(props) {
  const {name, title, children} = props;
  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
        ></button>
        <form
          method="post"
          className="popup__form"
          name={`${name}-form`}
          novalidate
        >
          {children}
          <button type="submit" className="button popup__saveButton">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
