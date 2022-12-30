import { useState } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/header";
import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function App() {
  //стейты
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  //обработчики кликов
  /**
   * функция обработчик клика по кнопке редактирования профиля
   */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    document.addEventListener("keydown", handleEscPress);
  };
  /**
   * функция обработчик клика по кнопке добавления карточки
   */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    document.addEventListener("keydown", handleEscPress);
  };
  /**
   * функция обработчик клика по кнопке редактирования аватара
   */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener("keydown", handleEscPress);
  };
  /**
   * функция обработчик клика по фото
   */
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //обработчики закрытия попапов
  /**
   * функция закрытия попапов
   */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    document.removeEventListener("keydown", handleEscPress);
  };
  /**
   * функция обработчик клика по оверлею
   */
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeAllPopups();
  };
  /**
   * функция обработчик нажатия на esc
   */
  const handleEscPress = ({ key }) => {
    if (key === "Escape") closeAllPopups();
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onClickImage={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="editAvatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        isOpen={isEditAvatarPopupOpen}
      >
        <input
          type="url"
          className="popup__input"
          id="avatarInput"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error avatarInput-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="editProfile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        isOpen={isEditProfilePopupOpen}
      >
        <input
          type="text"
          className="popup__input"
          id="usernameInput"
          name="username"
          minLength="2"
          maxLength="40"
          required
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
        />
        <span className="popup__error descriptionInput-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="addCard"
        title="Новое место"
        buttonText="Создать"
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
        isOpen={isAddPlacePopupOpen}
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
        />
        <span className="popup__error nameInput-error"></span>
        <input
          type="url"
          className="popup__input"
          id="linkInput"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error linkInput-error"></span>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOverlayClick={handleOverlayClick}
      ></ImagePopup>
    </div>
  );
}

export default App;
