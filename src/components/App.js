import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import Footer from "./Footer/Footer";
import Header from "./Header/header";
import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

import defaultAvatar from "../images/Anonymous_emblem.svg";
import { CardsContext } from "../contexts/CardsContext";

function App() {
  //стейты
  const [currentUser, setCurrentUser] = useState({
    name: "Anonimus",
    description: "Anonimus descriprion",
    avatar: defaultAvatar,
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  //инициализация начальных данных при монтировании
  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  //обработчики кликов

  /**
   * функция обработчик клика по кнопке редактирования профиля
   */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    addListeners();
  };

  /**
   * функция обработчик клика по кнопке добавления карточки
   */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    addListeners();
  };

  /**
   * функция обработчик клика по кнопке редактирования аватара
   */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    addListeners();
  };

  /**
   * функция обработчик клика по фото
   * @param {object} card - объект выбранной карточки
   */
  const handleClickImage = (card) => {
    setSelectedCard(card);
    addListeners();
  };

  /**
   * функция обработчик лайка карточки
   * @param {object} card - объект лайкнутой карточки
   */
  const handleLikeCard = (targetCard) => {
    const isLiked = targetCard.likes.some(
      (user) => user._id === currentUser._id
    );

    Api.changeLike(targetCard._id, isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((card) => (card._id === targetCard._id ? newCard : card))
      );
    });
  };

  const handleDeleteCard = (targetCard) => {
    Api.deleteCard(targetCard._id).then(() => {
      setCards((cards) => cards.filter((card) => card._id !== targetCard._id));
    });
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
    removeListeners();
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
  const addListeners = () => {
    document.addEventListener("keydown", handleEscPress);
  };
  const removeListeners = () => {
    document.removeEventListener("keydown", handleEscPress);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onClickImage={handleClickImage}
            onClickLike={handleLikeCard}
            onClickDelete={handleDeleteCard}
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
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
