/**
 *
 * @param {object} props - пропсы
 * - name - значение модификатора формы
 * - title - заголовок формы
 * - isOpen - флаг открытия попапа
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - children - внутренняя разметка формы
 */

export default function PopupWithForm(props) {
  const { name, title, isOpen, onClose, onOverlayClick, children } = props;
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="button popup__closeButton"
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <form
          method="post"
          className="popup__form"
          name={`${name}-form`}
          noValidate
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
