import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function({onUpdateAvatar, ...props}) {
  const urlInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: urlInputRef.current.value,
    });
  };
  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      // buttonText="Сохранить"
      // onClose={closeAllPopups}
      // onOverlayClick={handleOverlayClick}
      // isOpen={isEditAvatarPopupOpen}
      buttonText={buttonText}
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input"
        id="avatarInput"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={urlInputRef}
      />
      <span className="popup__error avatarInput-error"></span>
    </PopupWithForm>
  );
}
