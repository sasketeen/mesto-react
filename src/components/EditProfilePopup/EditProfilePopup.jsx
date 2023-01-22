import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function({onUpdateUser, ...props}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleInputName = ({ target }) => {
    setName(target.value);
  };

  const handleInputDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const buttonText = props.isLoading ? "Сохранение" : "Сохранить";

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      buttonText={buttonText}
      {...props}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="usernameInput"
        name="username"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleInputName}
      />
      <span className="popup__error usernameInput-error"></span>
      <input
        type="text"
        className="popup__input"
        id="descriptionInput"
        name="description"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleInputDescription}
      />
      <span className="popup__error descriptionInput-error"></span>
    </PopupWithForm>
  );
}
