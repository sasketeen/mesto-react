import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

/**
 *
 * @param {object} props - пропсы:
 * - onAddPlace - функция добавления карточки
 * - onClose - функция обработчик клика по крестику
 * - onOverlayClick - функция обработчик клика по оверлею
 * - isOpen - флаг открытия попапа
 * - isLoading - флаг процесса отправки данных
 */
export default function AddPlacePopup({ onAddPlace, ...props }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  const handleInputName = ({ target }) => {
    setName(target.value);
  };
  const handleInputLink = ({ target }) => {
    setLink(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPlace({ name, link });
  };

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      buttonText={buttonText}
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="nameInput"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleInputName}
      />
      <span className="popup__error nameInput-error"></span>
      <input
        type="url"
        className="popup__input"
        id="linkInput"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleInputLink}
      />
      <span className="popup__error linkInput-error"></span>
    </PopupWithForm>
  );
}
